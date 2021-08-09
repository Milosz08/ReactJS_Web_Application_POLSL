import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import { MainStoreContext } from '../../../../../contextStore/MainStoreContext';
import { ModalsStateContext } from '../../../../../contextStore/ModalsStateProvider';

import SearchBox from './AdditionalComponents/SearchBox';
import { MODAL_TYPES } from '../../../../../contextStore/ModalsStateProvider';

const {
   panelContainer, panelActive, recordsNotExist, infoIcon, listSorting, sortById, sortByName, sortByType,
   listNumber, listTitle, typeOfMessageCSS, modifyElement, fasIcon, deleteElement
} = require('./Panels.module.scss');

/**
 * Funkcja zwracająca odpowiednią wartość string wyboru (po polsku) na podstawie wprowadzonej
 * wartości po angielsku (static).
 *
 * @param choice { string } - wybór z pola select.
 */
export const insertUserChoice = (choice: string) => {
   switch(choice) {
      case 'sheduleModify':      return 'Modyfikacja planu zajęć';
      case 'pageError':          return 'Błąd na stronie';
      case 'calendarNewDate':    return 'Modyfikacja kalendarza';
      default:                   return 'Inne zgłoszenie';
   }
}

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent renderujący panel w systemie CMS umożliwiający wgląd i usunięcie wiadomości od użytkowników.
 * Korzysta z globalnego stora i wykorzystyje funkcje asynchroniczne do komunikacji z API (usuwanie wiadomości
 * z bazy danych).
 *
 * @param activeNavElm { number } - aktualnie aktywny panel.
 */
const UserMessagesPanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { setMessageModal } = useContext<any>(ModalsStateContext);

   const [ inputField, setInputField ] = useState<string>('');
   const { footerForms } = dataFetchFromServer;

   const toggleClass = activeNavElm === 5 ? panelActive : '';

   const filteredList = footerForms.filter((form: any): any => {
      const typeOfMessage = insertUserChoice(form.userChoice).toLocaleLowerCase();
      if(inputField === '') {
         return form;
      } else if(typeOfMessage.includes(inputField.toLocaleLowerCase())) {
         return form;
      }
      return null;
   });

   const generateMessagesList = filteredList.map((message: any, index: number) => {
      return (
         <li key = {uuidv4()}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listTitle}>{message.userIdentity}</span>
            <span className = {typeOfMessageCSS}>{insertUserChoice(message.userChoice)}</span>
            <button
               className = {modifyElement}
               onClick = {() => setMessageModal({ id: message._id, type: MODAL_TYPES.VIEW, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'envelope-open-text']}
                  className = {fasIcon}
                  title = 'Kliknij, aby zobaczyć szczegóły'
               />
            </button>
            <button
               className = {deleteElement}
               onClick = {() => setMessageModal({ id: message._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'times']}
                  className = {fasIcon}
                  title = 'Usuń wiadmość'
               />
            </button>
         </li>
      );
   });

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <h2>Przeglądanie i Usuwanie wiadmości użytkowników</h2>
         <SearchBox
            inputField = {inputField}
            setInputField = {setInputField}
            placeholderProp = 'Wyszukaj po typie'
         />
         <ul>
            {footerForms.length !== 0 && <li className = {listSorting}>
               <span className = {sortById}>id</span>
               <span className = {sortByName}>imię/nick</span>
               <span className = {sortByType}>typ</span>
            </li>}
            {generateMessagesList}
            {footerForms.length === 0 && <div className = {recordsNotExist}>
               <FontAwesomeIcon
                  icon = {['fas', 'info-circle']}
                  className = {infoIcon}
               />
               <p>Brak wiadomości</p>
            </div>}
         </ul>
      </div>
   );
}

export default UserMessagesPanel;