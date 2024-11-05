import React from 'react';
import iconNs from '@ant-design/icons';

const Icon = iconNs.default || iconNs;

export function Satzmodell3IconComponent() {
  return (
    <svg width={744.725} height={744.725} >
      <path d="M314.396 104.58h-156.3v224.46c-13.56-13.06-31.65-21.45-51.7-22.49-44.87-2.34-84.37 34.57-84.98 79.5-.62 45.11 35.77 81.88 80.74 81.88 21.74 0 41.43-8.64 55.94-22.6v224.46h223.42c-12.61-13.62-20.65-31.54-21.48-51.35-1.89-44.59 34.88-83.55 79.51-84.18 45.13-.64 81.91 35.75 81.91 80.73 0 21.18-8.22 40.39-21.55 54.79h223.41v-465.9c0-54.85-44.46-99.31-99.31-99.31h-35.07" style={{    fill: '#f2f2f2',    stroke: '#666',    strokeWidth: 42.8172,    strokeLinecap: 'round',    strokeLinejoin: 'round',    strokeMiterlimit: 10  }} />
      <g fill="#666" transform="translate(-127.644 -144.11)">
        <ellipse cx={545.41} cy={525.52} rx={123.28} ry={82.18} transform="rotate(-22.711 545.35 525.48)" />
        <path d="M642.64 521.94c-11.82 0-21.41-9.58-21.41-21.41V207.52c0-11.82 9.58-21.41 21.41-21.41s21.41 9.59 21.41 21.41v293.01c-.01 11.82-9.59 21.41-21.41 21.41M559.69 270.1h-46.14c-11.82 0-21.41-9.59-21.41-21.41s9.58-21.41 21.41-21.41h46.14c11.82 0 21.41 9.59 21.41 21.41s-9.58 21.41-21.41 21.41" />
      </g>
    </svg>
  );
}

function Satzmodell3Icon() {
  return (
    <Icon component={Satzmodell3IconComponent} />
  );
}

export default Satzmodell3Icon;
