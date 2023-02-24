import gulp from 'gulp';
import { deleteAsync } from 'del';
import Graceful from 'node-graceful';
import {
  cliArgs,
  createGithubRelease,
  createLabelInJiraIssues,
  createReleaseNotesFromCurrentTag,
  ensureIsValidSemverTag,
  esbuild,
  eslint,
  vitest,
  less,
  MaildevContainer,
  mergeYamlFilesToJson,
  MinioContainer,
  MongoContainer,
  NodeProcess
} from '@educandu/dev-tools';

let currentApp = null;
let isInWatchMode = false;
let currentCdnProxy = null;
let currentAppBuildContext = null;

const testAppEnv = {
  TEST_APP_PORT: '3000',
  TEST_APP_WEB_CONNECTION_STRING: 'mongodb://root:rootpw@localhost:27017/dev-educandu-db?replicaSet=educandurs&authSource=admin',
  TEST_APP_SKIP_MAINTENANCE: 'false',
  TEST_APP_CDN_ENDPOINT: 'http://localhost:9000',
  TEST_APP_CDN_REGION: 'eu-central-1',
  TEST_APP_CDN_ACCESS_KEY: 'UVDXF41PYEAX0PXD8826',
  TEST_APP_CDN_SECRET_KEY: 'SXtajmM3uahrQ1ALECh3Z3iKT76s2s5GBJlbQMZx',
  TEST_APP_CDN_BUCKET_NAME: 'dev-educandu-cdn',
  TEST_APP_CDN_ROOT_URL: 'http://localhost:9000/dev-educandu-cdn',
  TEST_APP_SESSION_SECRET: 'd4340515fa834498b3ab1aba1e4d9013',
  TEST_APP_SESSION_COOKIE_DOMAIN: 'localhost',
  TEST_APP_SESSION_COOKIE_NAME: 'SESSION_ID_TEST_APP',
  TEST_APP_CONSENT_COOKIE_NAME_PREFIX: 'CONSENT_TEST_APP',
  TEST_APP_UPLOAD_LIABILITY_COOKIE_NAME: 'UPLOAD_LIABILITY_TEST_APP',
  TEST_APP_ANNOUNCEMENT_COOKIE_NAME_PREFIX: 'ANNOUNCEMENT_TEST_APP',
  TEST_APP_X_FRAME_OPTIONS: 'SAMEORIGIN',
  TEST_APP_X_ROOMS_AUTH_SECRET: '5do47sdh37',
  TEST_APP_ADMIN_EMAIL_ADDRESS: 'educandu-test-admin@test.com',
  TEST_APP_EMAIL_SENDER_ADDRESS: 'educandu-test-app@test.com',
  TEST_APP_SMTP_OPTIONS: 'smtp://127.0.0.1:8025/?ignoreTLS=true',
  TEST_APP_INITIAL_USER: JSON.stringify({ email: 'test@test.com', password: 'test', displayName: 'Testibus' })
};

const mongoContainer = new MongoContainer({
  port: 27017,
  rootUser: 'root',
  rootPassword: 'rootpw',
  replicaSetName: 'educandurs'
});

const minioContainer = new MinioContainer({
  port: 9000,
  accessKey: 'UVDXF41PYEAX0PXD8826',
  secretKey: 'SXtajmM3uahrQ1ALECh3Z3iKT76s2s5GBJlbQMZx',
  initialBuckets: ['dev-educandu-cdn']
});

const maildevContainer = new MaildevContainer({
  smtpPort: 8025,
  frontendPort: 8000
});

Graceful.on('exit', async () => {
  await currentAppBuildContext?.dispose();
  await currentApp?.waitForExit();
  await currentCdnProxy?.waitForExit();
});

export async function clean() {
  await deleteAsync(['dist', 'coverage', 'test-app/dist']);
}

export async function lint() {
  await eslint.lint('**/*.js', { failOnError: !isInWatchMode });
}

export async function fix() {
  await eslint.fix('**/*.js');
}

export async function test() {
  await vitest.coverage();
}

export async function testWatch() {
  await vitest.watch();
}

export async function buildJs() {
  await esbuild.transpileDir({ inputDir: 'src', outputDir: 'dist', ignore: '**/*.spec.js' });
}

export async function buildTranslations() {
  await mergeYamlFilesToJson({ inputFilesPattern: './src/**/*.yml', outputFile: './src/translations.json' });
}

export function copyToDist() {
  return gulp.src(['src/**', '!src/**/*.{js,yml}'], { base: 'src' }).pipe(gulp.dest('dist'));
}

export const build = gulp.parallel(copyToDist, buildJs, buildTranslations);

export async function buildTestAppCss() {
  await less.compile({
    inputFile: 'test-app/src/main.less',
    outputFile: 'test-app/dist/main.css',
    optimize: !!cliArgs.optimize
  });
}

export async function buildTestAppJs() {
  if (currentAppBuildContext) {
    await currentAppBuildContext.rebuild();
  } else {
    // eslint-disable-next-line require-atomic-updates
    currentAppBuildContext = await esbuild.bundle({
      entryPoints: ['./test-app/src/main.js'],
      outdir: './test-app/dist',
      minify: !!cliArgs.optimize,
      incremental: isInWatchMode,
      inject: ['./test-app/src/polyfills.js'],
      metaFilePath: './test-app/dist/meta.json'
    });
  }
}

export const buildTestApp = gulp.parallel(buildTestAppCss, buildTranslations, buildTestAppJs);

export async function maildevUp() {
  await maildevContainer.ensureIsRunning();
}

export async function maildevDown() {
  await maildevContainer.ensureIsRemoved();
}

export async function mongoUp() {
  await mongoContainer.ensureIsRunning();
}

export async function mongoDown() {
  await mongoContainer.ensureIsRemoved();
}

export async function minioUp() {
  await minioContainer.ensureIsRunning();
}

export async function minioDown() {
  await minioContainer.ensureIsRemoved();
}

export async function startServer() {
  currentCdnProxy = new NodeProcess({
    script: 'node_modules/@educandu/rooms-auth-lambda/src/dev-server/run.js',
    env: {
      NODE_ENV: 'development',
      PORT: 10000,
      WEBSITE_BASE_URL: 'http://localhost:3000',
      CDN_BASE_URL: 'http://localhost:9000/dev-educandu-cdn',
      SESSION_COOKIE_NAME: testAppEnv.TEST_APP_SESSION_COOKIE_NAME,
      X_ROOMS_AUTH_SECRET: testAppEnv.TEST_APP_X_ROOMS_AUTH_SECRET
    }
  });

  currentApp = new NodeProcess({
    script: 'test-app/src/index.js',
    jsx: true,
    env: {
      NODE_ENV: 'development',
      ...testAppEnv
    }
  });

  await Promise.all([
    currentCdnProxy.start(),
    currentApp.start()
  ]);
}

export async function restartServer() {
  await currentApp.restart({
    TEST_APP_SKIP_MAINTENANCE: true.toString()
  });
}

export function verifySemverTag(done) {
  ensureIsValidSemverTag(cliArgs.tag);
  done();
}

export async function release() {
  const { currentTag, releaseNotes, jiraIssueKeys } = await createReleaseNotesFromCurrentTag({
    jiraBaseUrl: cliArgs.jiraBaseUrl,
    jiraProjectKeys: cliArgs.jiraProjectKeys.split(',')
  });

  await createGithubRelease({
    githubToken: cliArgs.githubToken,
    currentTag,
    releaseNotes,
    files: []
  });

  await createLabelInJiraIssues({
    jiraBaseUrl: cliArgs.jiraBaseUrl,
    jiraUser: cliArgs.jiraUser,
    jiraApiKey: cliArgs.jiraApiKey,
    jiraIssueKeys,
    label: currentTag
  });
}

export const up = gulp.parallel(mongoUp, minioUp, maildevUp);

export const down = gulp.parallel(mongoDown, minioDown, maildevDown);

export const serve = gulp.series(gulp.parallel(up, build), buildTestApp, startServer);

export const verify = gulp.series(lint, test, build);

export function setupWatchMode(done) {
  isInWatchMode = true;
  done();
}

export function startWatchers(done) {
  gulp.watch(['src/**/*.{js,json}', 'test-app/src/**/*.{js,json}'], gulp.series(buildTestAppJs, restartServer));
  gulp.watch(['src/**/*.less', 'test-app/src/**/*.less'], gulp.series(copyToDist, buildTestAppCss));
  gulp.watch(['src/**/*.yml'], buildTranslations);
  done();
}

export const watch = gulp.series(setupWatchMode, serve, startWatchers);

export default watch;
