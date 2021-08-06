import React, { useContext } from 'react';
import classnames from 'classnames';

import GROUPS_STATIC from '../../../../constants/allGroups';
import { SheduleContext } from '../../../../contextStore/SheduleProvider';

const { englishRadio, customRadio, radioInputContainer, activeRadio  } = require('./SheduleForm.module.scss');

/**
 * Komponent generujący radio inputy do wyboru grupy z angielskiego. Dane pobierane z kontekstu i
 * statycznych plików JS.
 */
const SheduleEngInputs = () => {

   const { ENG_GROUPS } = GROUPS_STATIC;
   const { engSelected, setEngSelected } = useContext<any>(SheduleContext);

   const generateInputStructure = ENG_GROUPS.map((record: string) => {
      const activeRadioInput = engSelected === record
         ? classnames(radioInputContainer, activeRadio) : radioInputContainer;

      return (
         <div key={record} className={activeRadioInput}>
            <input
               type='radio'
               id={record}
               name='eng'
               onChange={e => setEngSelected(e.target.id)}
               checked={engSelected === record}
               value={engSelected}
            />
            <label htmlFor={record}>
               Grupa {record.toLocaleUpperCase()}
            </label>
            <div className={customRadio}/>
         </div>
      );
   });

   return (
      <div className = {englishRadio}>
         {generateInputStructure}
      </div>
   );
}

export default SheduleEngInputs;