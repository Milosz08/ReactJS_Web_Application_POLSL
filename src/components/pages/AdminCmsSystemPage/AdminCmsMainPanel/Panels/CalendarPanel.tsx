/**
 * @file CalendarPanel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                uuid: "^8.3.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/24/2021
 */

import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../contextStore/ModalsStateProvider';

import DAYS_AND_MONTHS from '../../../../../constants/daysAndMonths';
import { IMPORTANT_VALUES } from '../Modals/WarningDeleteModal/CalendarDeleteModal';

const SearchBox = React.lazy(() => import('./AdditionalComponents/SearchBox'));

const {
   listNumber, listDate, modifyElement, fasIcon, deleteElement, listSorting, sortById, addNewRecord, sortByDate,
   sortByImportant, sortByCount, listCount, listImportant, importantDot, lowLevel, mediumLevel, highLevel,
   recordsNotExist, infoIcon, panelContainer, panelActive
} = require('./Panels.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   activeNavElm: number;
}

/**
 * @details Component that generates the management of calendar entries (CMS admin panel).
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const CalendarPanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

   const [ inputField, setInputField ] = useState<string>('');
   const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
   const { calendarModal, setCalendarModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
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
               case IMPORTANT_VALUES.LOW:    return lowLevel;
               case IMPORTANT_VALUES.MEDIUM: return mediumLevel;
               case IMPORTANT_VALUES.HIGH:   return highLevel;
               default:                      return undefined;
            }
         }
         return <div className = {`${importantDot} ${returnCSSstyles()}`} key = {uuidv4()}/>;
      });

      return (
         <li key = {uuidv4()}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listDate}>{entry.day} {convertDate(entry.month)!.name} {entry.year}</span>
            <span className = {listCount}>{entry.items.length}</span>
            <span className = {listImportant}>{generateImportantDots}</span>
            <button
               className = {modifyElement}
               onClick = {() => setCalendarModal!({ id: entry._id, type: MODAL_TYPES.EDIT, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'edit']}
                  className = {fasIcon}
                  title = 'Modyfikuj rekord'
               />
            </button>
            <button
               className = {deleteElement}
               onClick = {() => setCalendarModal!({ id: entry._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
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
            placeholderProp = '(dd/mm/yyyy)'
         />
         <ul>
            <li className = {listSorting}>
               <span className = {sortById}>id</span>
               <span className = {sortByDate}>data</span>
               <span className = {sortByCount}>ilość</span>
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
               onClick = {() => setCalendarModal!({ ...calendarModal!, type: MODAL_TYPES.ADD, ifOpen: true })}
            >Dodaj nowy wpis/wpisy</button>
         </ul>
      </div>
   );
}

export default CalendarPanel;