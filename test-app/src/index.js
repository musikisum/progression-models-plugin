import url from 'node:url';
import path from 'node:path';
import parseBool from 'parseboolean';
import educandu from '@educandu/educandu';
import customResolvers from './custom-resolvers.js';
import ExampleController from '../../src/example-controller.js';

const thisDir = path.dirname(url.fileURLToPath(import.meta.url));

const config = {
  appName: 'educandu-test-app',
  port: Number(process.env.TEST_APP_PORT),
  trustProxy: true,
  mongoConnectionString: process.env.TEST_APP_WEB_CONNECTION_STRING,
  skipMaintenance: parseBool(process.env.TEST_APP_SKIP_MAINTENANCE),
  cdnEndpoint: process.env.TEST_APP_CDN_ENDPOINT,
  cdnRegion: process.env.TEST_APP_CDN_REGION,
  cdnAccessKey: process.env.TEST_APP_CDN_ACCESS_KEY,
  cdnSecretKey: process.env.TEST_APP_CDN_SECRET_KEY,
  cdnBucketName: process.env.TEST_APP_CDN_BUCKET_NAME,
  cdnRootUrl: process.env.TEST_APP_CDN_ROOT_URL,
  customResolvers,
  publicFolders: [path.resolve(thisDir, '../dist')],
  resources: [path.resolve(thisDir, '../../src/translations.json')],
  additionalControllers: [ExampleController],
  sessionSecret: process.env.TEST_APP_SESSION_SECRET,
  sessionCookieDomain: process.env.TEST_APP_SESSION_COOKIE_DOMAIN,
  sessionCookieName: process.env.TEST_APP_SESSION_COOKIE_NAME,
  sessionDurationInMinutes: Number(process.env.TEST_APP_SESSION_DURATION_IN_MINUTES) || 60,
  consentCookieNamePrefix: process.env.TEST_APP_CONSENT_COOKIE_NAME_PREFIX,
  uploadLiabilityCookieName: process.env.TEST_APP_UPLOAD_LIABILITY_COOKIE_NAME,
  announcementCookieNamePrefix: process.env.TEST_APP_ANNOUNCEMENT_COOKIE_NAME_PREFIX,
  xFrameOptions: process.env.TEST_APP_X_FRAME_OPTIONS,
  xRoomsAuthSecret: process.env.TEST_APP_X_ROOMS_AUTH_SECRET,
  smtpOptions: process.env.TEST_APP_SMTP_OPTIONS,
  emailSenderAddress: process.env.TEST_APP_EMAIL_SENDER_ADDRESS,
  adminEmailAddress: process.env.TEST_APP_ADMIN_EMAIL_ADDRESS,
  initialUser: JSON.parse(process.env.TEST_APP_INITIAL_USER),
  plugins: ['markdown', 'image', 'educandu/educandu-plugin-example'],
  exposeErrorDetails: true
};

educandu(config);
