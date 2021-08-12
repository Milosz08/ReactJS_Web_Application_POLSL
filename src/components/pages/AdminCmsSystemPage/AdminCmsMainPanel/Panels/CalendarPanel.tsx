import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import { MainStoreContext } from '../../../../../contextStore/MainStoreContext';
import { MODAL_TYPES, ModalsStateContext } from '../../../../../contextStore/ModalsStateProvider';

import SearchBox from './AdditionalComponents/SearchBox';
import DAYS_AND_MONTHS from "../../../../../constants/daysAndMonths";

const {
   listNumber, listDate, modifyElement, fasIcon, deleteElement, listSorting, sortById, addNewRecord,
   sortByDate, sortByImportant, sortByCount, listCount, listImportant, importantDot, lowLevel, mediumLevel,
   highLevel, recordsNotExist, infoIcon, panelContainer, panelActive
} = require('./Panels.module.scss');

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący zarządzanie wpisami kalendarza (panel administratora CMS).
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const CalendarPanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const [ inputField, setInputField ] = useState<string>('');
   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { calendarModal, setCalendarModal } = useContext<any>(ModalsStateContext);
   const { calendarRecords } = dataFetchFromServer;

   // eslint-disable-next-line array-callback-return
   const filteredArray = calendarRecords.filter((calendarRecord: any) => {
      const fullDate = `${calendarRecord.day}/0${calendarRecord.month + 1}/${calendarRecord.year}`
      if(inputField === '') {
         return calendarRecord;
      } else if(fullDate.includes(inputField)) {
         return calendarRecord;
      }
   });

   const convertDate = (monthCallback: number) => {
      return DAYS_AND_MONTHS.MONTHS.find((month: any) => month.id === monthCallback);
   }

   const generateSubjectsList = filteredArray.map((entry: any, index: number) => {

      const generateImportantDots = entry.items.map((dot: any) => {
         const returnCSSstyles = () => {
            switch(dot.importantLevel) {
               case 'low': return lowLevel;
               case 'medium': return mediumLevel;
               case 'high': return highLevel;
               default: return undefined;
            }
         }
         return (
            <div className = {`${importantDot} ${returnCSSstyles()}`} key = {uuidv4()}/>
         );
      });

      return (
         <li key = {uuidv4()}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listDate}>{entry.day} {convertDate(entry.month)!.name} {entry.year}</span>
            <span className = {listCount}>{entry.items.length}</span>
            <span className = {listImportant}>{generateImportantDots}</span>
            <button
               className = {modifyElement}
               onClick = {() => setCalendarModal({ id: entry._id, type: MODAL_TYPES.EDIT, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'edit']}
                  className = {fasIcon}
                  title = 'Modyfikuj rekord'
               />
            </button>
            <button
               className = {deleteElement}
               onClick = {() => setCalendarModal({ id: entry._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'times']}
                  className = {fasIcon}
                  title = 'Usuń rekord'
               />
            </button>
         </li>
      );
   });

   const toggleClass = activeNavElm === 4 ? panelActive : '';

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <h2>Dodawanie, Usuwanie i Modyfikowanie wpisów kalendarza</h2>
         <SearchBox
            inputField = {inputField}
            setInputField = {setInputField}
            placeholderProp = 'Wyszukaj po dacie (dd/mm/yyyy)'
         />
         <ul>
            <li className = {listSorting}>
               <span className = {sortById}>id</span>
               <span className = {sortByDate}>data wpisu/wpisów</span>
               <span className = {sortByCount}>ilość wpisów</span>
               <span className = {sortByImportant}>ważność</span>
            </li>
            {generateSubjectsList}
            {calendarRecords.length === 0 && <div className = {recordsNotExist}>
               <FontAwesomeIcon
                  icon = {['fas', 'info-circle']}
                  className = {infoIcon}
               />
               <p>Brak wpisów kalendarza</p>
            </div>}
            <button
               className = {addNewRecord}
               onClick = {() => setCalendarModal({ ...calendarModal, type: MODAL_TYPES.ADD, ifOpen: true })}
            >Dodaj nowy wpis/wpisy</button>
         </ul>
      </div>
   );
}

export default CalendarPanel;