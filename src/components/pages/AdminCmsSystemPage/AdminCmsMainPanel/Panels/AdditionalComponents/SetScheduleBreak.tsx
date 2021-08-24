/**
 * @file SetScheduleBreak.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/20/2021
 */

import React, { useContext, useEffect, useState } from 'react';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import updateDate from '../../../../../../constants/updateLogsDateAsync';

const {
   setScheduleBreakContainer, checkboxWrapper, sendData, checkmark, checkboxContainer, active
} = require('./../SchedulePanel.module.scss');

/**
 * @details Component responsible for generating a field to change the activity of the plan activity (hiding a
 *          plan in case of science breaks).
 */
const SetScheduleBreak = (): JSX.Element => {

   const { summerBreak, setSummerBreak } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const [ checkbox, setCheckbox ] = useState<boolean>(false);
   const [ unwriteChanges, setUnwriteChanges ] = useState<boolean>(false);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setUnwriteChanges(false);
      updateDate('schedule', process.env.REACT_APP_SCHEDULE_ID, true, checkbox);
      setSummerBreak!(checkbox);
   }

   const handleCheckbox = (): void => {
      setUnwriteChanges(true);
      setSummerBreak!(checkbox);
      setCheckbox(prevState => !prevState);
   }

   useEffect(() => {
      if(summerBreak !== undefined) {
         setCheckbox(summerBreak!);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className = {setScheduleBreakContainer}>
         <form onSubmit = {handleSubmit}>
            <div className = {checkboxContainer}>
               <div className = {checkboxWrapper}>
                  <input
                     type = 'checkbox'
                     id = 'summerBreak'
                     checked = {checkbox}
                     onChange = {handleCheckbox}
                  />
                  <span className = {checkmark}/>
                  <label htmlFor = 'summerBreak'>
                     {checkbox ? 'Plan zajęć wyłączony (brak zajęć)' : 'Plan zajęć włączony'}
                  </label>
               </div>
               <p>Aby wyłączyć plan zajęć (przerwa międzysemetralna, brak zajęć itp.) zaznacz pole.</p>
            </div>
            <div className = {sendData}>
               <p className = {unwriteChanges ? active : ''}>Uwaga! Masz niezapisane zmiany.</p>
               <button>Zapisz zmiany</button>
            </div>
         </form>
      </div>
   );
}

export default SetScheduleBreak;