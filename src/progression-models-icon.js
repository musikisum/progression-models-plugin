import React from 'react';
import iconNs from '@ant-design/icons';

const Icon = iconNs.default || iconNs;

export function ProgressionModelsComponent() {
  return (
    <svg height="100%" width="100%" viewBox="0 0 1000 1000">
      <path style={{ fill: '#d9d9d9', fillRule:'evenodd', strokeWidth:1, strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeDasharray: 'none', stroke: '#171615' }} d="M0 0 C18.1586 0 46.8911 0 77.3311 0 C86.5637 11.6073 54.2108 40.948 70.1774 52.5478 C74.2741 61.4183 122.068 69.6063 145.281 52.5478 C156.205 42.9878 127.53 11.6073 134.347 0 C170.319 0 200.417 0 207.897 0 C207.897 15.9867 207.897 175.854 207.897 191.84 C190.573 191.84 173.248 191.84 138.598 191.84 C103.949 191.84 190.573 127.894 103.949 127.894 C17.3248 127.894 103.949 191.84 69.2991 191.84 C34.6496 191.84 17.3248 191.84 0 191.84 C0 175.854 0 15.9867 0 0 Z" />
      <path style={{ fill: '#b1b1b1', fillRule: 'evenodd', strokeWidth: 1,  strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeDasharray: 'none', stroke: '#171615'}} d="M63.4456 0 C111.03 0 237.921 5.68434e-14 253.782 5.68434e-14 C253.782 17.2999 253.782 34.5998 253.782 69.1997 C253.782 103.799 317.228 17.2999 317.228 103.799 C317.228 190.299 253.782 103.799 253.782 138.399 C253.782 172.999 253.782 190.299 253.782 207.599 C237.921 207.599 222.06 207.599 190.337 207.599 C158.614 207.599 237.921 138.399 158.614 138.399 C79.307 138.399 158.614 207.599 126.891 207.599 C95.1684 207.599 79.307 207.599 63.4456 207.599 C63.4456 190.299 63.4456 172.999 63.4456 138.399 C63.4456 103.799 0 190.299 0 103.799 C5.68434e-14 17.2999 63.4456 103.799 63.4456 69.1997 C63.4456 34.5998 63.4456 17.2999 63.4456 0 Z" />
      <path style={{ strokewidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', stroke: '#171615' }} />
      <path style={{ strokewidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', stroke: '#171615' }} />
      <path style={{ strokewidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', stroke: '#171615' }} />
      <path style={{ strokewidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', stroke: '#171615' }} />
      <path style={{ strokewidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', stroke: '#171615' }} />
      <path style={{ fill: '#08080', fillRule: 'evenodd', stroke: 'none' }} d="M49.0732 0 C15.7225 0 0.952877 24.5046 0.952877 43.0032 C0.952877 58.3786 9.05234 71.5918 24.2984 71.5918 C36.4477 71.5918 44.5471 63.1834 44.5471 51.1714 C44.5471 38.919 35.733 31.2314 26.2042 31.2314 C21.2015 31.2314 19.2958 32.6728 16.6754 32.6728 C14.2932 32.6728 13.8167 30.9912 13.8167 29.0692 C13.8167 21.3814 25.2513 7.44748 44.5471 7.44748 C64.7957 7.44748 73.6098 27.3876 73.6098 57.658 C73.6098 111.472 47.1674 141.022 2.85864 166.727 C1.1911 167.688 0 168.649 0 170.091 C0 171.292 0.714658 172.493 2.38219 172.493 C3.33508 172.493 4.52616 172.013 5.71727 171.532 C52.6466 148.229 102.196 114.355 102.196 55.736 C102.196 22.3424 81.9475 0 49.0732 0 L49.0732 0 Z M120.777 15.8559 C114.822 15.8559 110.296 20.4206 110.296 26.4266 C110.296 32.4326 114.822 36.9972 120.777 36.9972 C126.733 36.9972 131.259 32.4326 131.259 26.4266 C131.259 20.4206 126.733 15.8559 120.777 15.8559 L120.777 15.8559 Z M121.015 64.1444 C115.06 64.1444 110.772 68.4688 110.772 74.4748 C110.772 80.4808 115.06 84.8052 121.015 84.8052 C126.971 84.8052 131.259 80.4808 131.259 74.4748 C131.259 68.4688 126.971 64.1444 121.015 64.1444 Z" />
    </svg>
  );
}

function ProgressionModelsIcon() {
  return (
    <Icon component={ProgressionModelsComponent} />
  );
}

export default ProgressionModelsIcon;