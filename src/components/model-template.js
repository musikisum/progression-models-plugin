// import AbcSnippet from '../abc-snippet.js';
// import { useTranslation } from 'react-i18next';
// import { Form, Button, Dropdown, Space, Radio } from 'antd';
// import VoiceSwitch from './voice-switch.js';
// import { keys, getVoiceDraggers } from '../music-puzzle-editor-defaults.js';
// import React, { useState, useEffect } from 'react';
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';

// import Cadence from '../models/model-cadence.js';
// import ModelComposition from '../model-composition.js'; 
// import CircleOfFifths from '../models/model-circle-of-fifths.js';

// export default function ModelTemplate({ modelInfo }) {

// function name(model) {
//   return {
//     voiceArrangementIndices: [0, 1, 2],
//     key: 'C',
//   }
// }

//   const content = modelInfo.content;
//   const onContentChanged = modelInfo.onContentChanged;

//   const [radioValue, setRadioValue] = useState(0);
//   const [modelOptions, setModelOptions] = useState(Cadence.getDefaultOptions);
//   const [checked, setChecked] = useState([true, true, false]);
//   const [changedVoices, setChangedVoices] = useState();
//   const [abcResult, setAbcResult] = useState(ModelComposition.abcOutput('C', 'C', 120, '1/2', [CircleOfFifths.getVoices()]));

//   const toggleChecked = (index) => {
//     setChecked(prevState => {
//       const newState = [...prevState];
//       newState[index] = !newState[index];
//       return newState;
//     });
//   };

//   const menuProps = {
//     items: keys,
//     onClick: event => setKey(event.key)
//   };

//   const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
//   const { text } = content;

//   const updateContent = newContentValues => {
//     onContentChanged({ ...content, ...newContentValues });
//   };

//   const onArrowButtonClick = (e, direction) => {
//     const opt = { ...modelOptions };
//     const voice = radioValue;
//     if(direction === 'up') {
//       opt.transposeValues[voice] += 1;
//     } else {
//       opt.transposeValues[voice] -= 1;
//     }
//     setModelOptions(opt);
//     setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
//   };

//   useEffect(() => {
//     const opt = { ...modelOptions};
//     opt.key = key;
//     setModelOptions(opt);
//     setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [key]);

//   useEffect(() => {
//     const opt = { ...modelOptions };
//     const [upper, middle, lower] = opt.transposeValues;
//     const voiceArrangement = voiceDraggers.reduce((akku, vd) => {
//       const result = akku + vd.voiceIndex.toString();
//       return result;
//     }, '');
//     const mapObj = {
//       '012': [upper, middle, lower],
//       '102': [upper, middle - 1, lower],
//       '021': [upper, middle, lower],
//       '120': [upper, middle, lower - 1],
//       '201': [upper + 1, middle - 1, lower],
//       '210': [upper + 1, middle, lower]
//     };
//     opt.transposeValues = mapObj[voiceArrangement];
//     opt.voiceArrangement = [voiceDraggers[0].voiceIndex + 1, voiceDraggers[1].voiceIndex + 1, voiceDraggers[2].voiceIndex + 1];
//     setModelOptions(opt);
//     setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
//   }, [voiceDraggers]);

//   const onRadioChange = (e) => {    
//     setRadioValue(e.target.value);
//   };

//   return (
//     <div className="EP_Educandu_Example_Editor">
//       <Form labelAlign="left" style={{ width: '100%' }}>
//         <div className='container'>
//           <div className="left">
//             <div className='innerContainer'>
//               <div className='item-1'>
//                 <div className='label'>Tonart</div>
//                 <Dropdown menu={menuProps} placement="bottomLeft" arrow={{ pointAtCenter: true, }}>
//                   <div className='buttons'>
//                     <Button>{key}</Button>
//                   </div>
//                 </Dropdown>
//               </div>
//               <div className='item-2'>
//               <div className='label'>Transposition (8)</div>
//                 <div className='buttons'>
//                   <Button className='button' onClick={(e) => onArrowButtonClick(e, 'up')}><ArrowUpOutlined /></Button>
//                   <Button className='button' onClick={onArrowButtonClick}><ArrowDownOutlined /></Button>
//                 </div>
//                 <Radio.Group onChange={onRadioChange} value={radioValue}>
//                   <Space direction="vertical">
//                     <Radio value={0}>Stimme 1</Radio>
//                     <Radio value={1}>Stimme 2</Radio>
//                     <Radio value={2}>Stimme 3</Radio>
//                   </Space>
//                 </Radio.Group>
//               </div>
//               <div className='item-3'>
//                 <div className='label'>Stimmtausch</div>
//                 <VoiceSwitch style={{ margin: '16px 0' }} switchButtons={voiceDraggers} setSwitchButtons={setvoiceDraggers} />
//               </div>
//             </div>
//           </div>
//           <div className="right">
//             <div>
//               { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

// MusicPuzzleEditor.propTypes = {
//   ...sectionEditorProps
// };
