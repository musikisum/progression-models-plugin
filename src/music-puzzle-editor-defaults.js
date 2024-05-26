export const keys = [
  {
    key: 'C',
    label: 'C-Dur (C)'
  },
  {
    key: 'Dm',
    label: 'd-Moll (Dm)'
  },
  {
    key: 'Em',
    label: 'e-Moll (Em)'
  },
  {
    key: 'F',
    label: 'F-Dur (F)'
  },
  {
    key: 'G',
    label: 'G-Dur (G)'
  },
  {
    key: 'Am',
    label: 'a-Moll (Am)'
  },
];

export function getVoiceDraggers(labelText) {
  return [
    {
      key: 'voice1',
      text: `${labelText} 1`,
      voiceIndex: 0
    }, {
      key: 'voice2',
      text: `${labelText} 2`,
      voiceIndex: 1
    }, {
      key: 'voice3',
      text: `${labelText} 3`,
      voiceIndex: 2
    }
  ];
};