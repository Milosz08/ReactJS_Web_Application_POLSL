/**
 * @file ScheduleEngInputs.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import classnames from 'classnames';

import GROUPS_STATIC from '../../../../constants/allGroups';
import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';

const { englishRadio, customRadio, radioInputContainer, activeRadio  } = require('./ScheduleForm.module.scss');

/**
 * @details Component that generates radio inputs to choose from the English group. Data retrieved
 *          from context and static TS files.
 */
const ScheduleEngInputs = (): JSX.Element => {

   const { ENG_GROUPS } = GROUPS_STATIC;
   const { engSelected, setEngSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

   const generateInputStructure = ENG_GROUPS.map((record: string): JSX.Element=> {
      const activeRadioInput = engSelected === record ? classnames(radioInputContainer, activeRadio) : radioInputContainer;

      return (
         <div key = {record} className = {activeRadioInput}>
            <input
               type = 'radio'
               id = {record}
               name = 'eng'
               onChange = {e => setEngSelected!(e.target.id)}
               checked = {engSelected === record}
               value = {engSelected}
            />
            <label htmlFor = {record}>
               Grupa {record.toLocaleUpperCase()}
            </label>
            <div className = {customRadio}/>
         </div>
      );
   });

   return (
      <div className = {englishRadio}>
         {generateInputStructure}
      </div>
   );
}

export default ScheduleEngInputs;