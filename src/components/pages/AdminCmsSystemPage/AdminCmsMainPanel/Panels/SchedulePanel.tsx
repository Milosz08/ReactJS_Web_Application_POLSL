import React, {useContext, useState} from 'react';
import classnames from 'classnames';
import OneDaySchedule from "./AdditionalComponents/OneDaySchedule";
import SearchBox from "./AdditionalComponents/SearchBox";
import {MainStoreContext} from "../../../../../contextStore/MainStoreContext";

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { scheduleContainer } = require('./SchedulePanel.module.scss');

const DAYS_STATIC = [
   'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'
];

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący panel zarządzania planem zajęć w systemie CMS.
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const SchedulePanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const [ inputField, setInputField ] = useState<string>('');
   const { dataFetchFromServer } = useContext<any>(MainStoreContext);

   const classToggle = activeNavElm === 3 ? panelActive : '';
   const { scheduleSubjects } = dataFetchFromServer;

   // eslint-disable-next-line array-callback-return
   const filteredAllSubjects = scheduleSubjects.filter((subject: any) => {
      if(inputField === '') {
         return subject;
      } else if(
         subject.title.toLocaleLowerCase().includes(inputField.toLocaleLowerCase()) ||
         subject.type.toLocaleLowerCase().includes(inputField.toLocaleLowerCase()) ||
         subject.start.toLocaleLowerCase().includes(inputField.toLocaleLowerCase()) ||
         subject.end.toLocaleLowerCase().includes(inputField.toLocaleLowerCase())
      ) {
         return subject;
      }
   });

   const generateFullDaysStructure = DAYS_STATIC.map((day: string) => (
      <OneDaySchedule
         key = {day}
         dayStr = {day}
         filteredAllSubjects = {filteredAllSubjects}
      />
   ));

   return (
      <div className = {classnames(panelContainer, scheduleContainer, classToggle)}>
         <h2>Dodawanie, Usuwanie i Modyfikowanie przedmiotów planu zajęć</h2>
         <SearchBox
            inputField = {inputField}
            setInputField = {setInputField}
            placeholderProp = 'Wyszukaj po nazwie/typie/godzinie'
         />
         {generateFullDaysStructure}
      </div>
   );
}

export default SchedulePanel;