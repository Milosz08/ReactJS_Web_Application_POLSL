import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import { MainStoreContext } from '../../../../../contextStore/MainStoreContext';
import { ModalsStateContext } from '../../../../../contextStore/ModalsStateProvider';

import SearchBox from './AdditionalComponents/SearchBox';
import { MODAL_TYPES } from '../../../../../contextStore/ModalsStateProvider';

const {
   panelContainer, panelActive, listNumber, listTitle, subjectStatus, modifyElement, deleteElement, fasIcon, infoIcon,
   subjectSemesters, subjectEnd, listSorting, addNewRecord, sortById, sortByName, sortBySem, sortByEnd, recordsNotExist
} = require('./Panels.module.scss');

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący panel zarządzania przedmiotami w systemie CMS.
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const SubjectsPanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { subjectModal, setSubjectModal } = useContext<any>(ModalsStateContext);

   const [ inputField, setInputField ] = useState<string>('');
   const { subjectsData } = dataFetchFromServer;

   // eslint-disable-next-line
   const filteredArray = subjectsData.filter((subject: any) => {
      if(inputField === '') {
         return subject;
      } else if(subject.title.toLocaleLowerCase().includes(inputField.toLocaleLowerCase())) {
         return subject;
      }
   });

   const generateSubjectsList = filteredArray.map((subject: any, index: number) => {
      const toggleClass = subject.ifEnd ? subjectEnd : '';

      const semestersWithoutBlanc = subject.semesters.filter((sem: any) => sem !== '');
      const generateSemesters = semestersWithoutBlanc.map((semester: any, index: number) => (
         index !== semestersWithoutBlanc.length - 1 ? `${semester}, ` : semester)
      );

      return (
         <li key = {uuidv4()}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listTitle}>{subject.title}</span>
            <span className = {subjectSemesters}>{generateSemesters}</span>
            <span className = {classnames(subjectStatus, toggleClass)}>
          {subject.ifEnd ? 'zakończony' : 'w trakcie'}
        </span>
            <button
               className = {modifyElement}
               onClick = {() => setSubjectModal({ id: subject._id, type: MODAL_TYPES.EDIT, ifOpen: true })}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'edit']}
                  className = {fasIcon}
                  title = 'Modyfikuj rekord'
               />
            </button>
            <button
               className = {deleteElement}
               onClick = {() => setSubjectModal({ ...subjectModal, type: MODAL_TYPES.REMOVE, ifOpen: true })}
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

   const toggleClass = activeNavElm === 2 ? panelActive : '';

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <h2>Dodawanie, Usuwanie i Modyfikowanie przedmiotów</h2>
         <SearchBox
            inputField = {inputField}
            setInputField = {setInputField}
            placeholderProp = 'Wyszukaj po nazwie przedmiotu'
         />
         <ul>
            <li className = {listSorting}>
               <span className = {sortById}>id</span>
               <span className = {sortByName}>nazwa przemiotu</span>
               <span className = {sortBySem}>semestry</span>
               <span className = {sortByEnd}>status</span>
            </li>
            {generateSubjectsList}
            {subjectsData.length === 0 && <div className = {recordsNotExist}>
               <FontAwesomeIcon
                  icon = {['fas', 'info-circle']}
                  className = {infoIcon}
               />
               <p>Brak wprowadzonych przedmiotów</p>
            </div>}
            <button
               className = {addNewRecord}
               onClick = {() => setSubjectModal({ ...subjectModal, type: MODAL_TYPES.ADD, ifOpen: true })}
            >
               Dodaj nowy przedmiot
            </button>
         </ul>
      </div>
   );
}

export default SubjectsPanel;