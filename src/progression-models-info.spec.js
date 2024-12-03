import { beforeEach, describe, expect, it } from 'vitest';
import ProgressionModelsInfo from './progression-models-info.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

describe('example-info', () => {
  let sut;

  beforeEach(() => {
    sut = new ProgressionModelsInfo(new GithubFlavoredMarkdown());
  });

  // describe('redactContent', () => {
  //   it('redacts room-media resources from different rooms', () => {
  //     const result = sut.redactContent({
  //       text: '![Some image](cdn://room-media/63cHjt3BAhGnNxzJGrTsN1/some-image.png)'
  //     }, 'rebhjf4MLq7yjeoCnYfn7E');
  //     expect(result).toStrictEqual({
  //       text: '![Some image]()'
  //     });
  //   });

  //   it('leaves room-media resources from the same room intact', () => {
  //     const result = sut.redactContent({
  //       text: '![Some image](cdn://room-media/63cHjt3BAhGnNxzJGrTsN1/some-image.png)'
  //     }, '63cHjt3BAhGnNxzJGrTsN1');
  //     expect(result).toStrictEqual({
  //       text: '![Some image](cdn://room-media/63cHjt3BAhGnNxzJGrTsN1/some-image.png)'
  //     });
  //   });

  //   it('leaves non room-media resources intact', () => {
  //     const result = sut.redactContent({
  //       text: '![Some image](cdn://media-library/JgTaqob5vqosBiHsZZoh1/some-image.png)'
  //     }, 'rebhjf4MLq7yjeoCnYfn7E');
  //     expect(result).toStrictEqual({
  //       text: '![Some image](cdn://media-library/JgTaqob5vqosBiHsZZoh1/some-image.png)'
  //     });
  //   });
  // });
});