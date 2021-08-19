/**
 * @file OneDaySchedule.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { SubjectsProvider } from '../../../../../layouts/Subjects/Subjects';

const {
   modifyElement, deleteElement, addNewRecord, listNumber, sortById, listSorting, infoIcon, recordsNotExist
} = require('./../Panels.module.scss');
const {
   subjectList, ejectedList, oneDaySubjectContainer, scheduleList, dayButtonToggle, dayTitle, listTitle, listHour,
   listType, listGroup, listButtons, listGroupHeader, fasIcon, addNewSubjectSchedule
} = require('./../SchedulePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   dayStr: string;
   filteredAllSubjects: SubjectsProvider[];
}

/**
 * @details Component that generates items from a specific day passed in props.
 *
 * @param dayStr { string } - the day from which to render the items.
 * @param filteredAllSubjects { Array<any> } - board with filtered items.
 */
const OneDaySchedule: React.FC<PropsProvider> = ({ dayStr, filteredAllSubjects }): JSX.Element => {

   const { scheduleModal, setScheduleModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

   const [ ejectList, setEjectList ] = useState<boolean>(false);

   const filteredDayArray = filteredAllSubjects.filter((shedule: any): boolean => shedule.day === dayStr);
   filteredDayArray.sort((prevH: any, secH: any): number => (
      parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
   ));

   const generateDayStructure = filteredDayArray.map((subject: any, index: number): JSX.Element => {
      const groupInfoText = (group: string): string | undefined => {
         if(!group.includes('b2') && !group.includes('c1')) {
            switch(group) {
               case 'all':          return 'wszyscy';
               case 'firstGroup':   return 'pierwsza';
               case 'secondGroup':  return 'druga';
            }
         } else {
            return group;
         }
      }
      return (
         <li key = {`${subject.title}__${subject.start}__${subject.end}__${subject.group}`}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listTitle}>{subject.title}</span>
            <span className = {listHour}>{subject.start} - {subject.end}</span>
            <span className = {listType}>{subject.type}</span>
            <span className = {listGroup}>{groupInfoText(subject.group)}</span>
            <div className = {listButtons}>
               <button
                  className = {modifyElement}
                  onClick = {() => setScheduleModal!({ id: subject._id, type: MODAL_TYPES.EDIT, day: dayStr, ifOpen: true })}
               >
                  <FontAwesomeIcon
                     icon = {['fas', 'edit']}
                     className = {fasIcon}
                     title = 'Modyfikuj rekord'
                  />
               </button>
               <button
                  className = {deleteElement}
                  onClick = {() => setScheduleModal!({ id: subject._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
               >
                  <FontAwesomeIcon
                     icon = {['fas', 'times']}
                     className = {fasIcon}
                     title = 'Usuń rekord'
                  />
               </button>
            </div>
         </li>
      );
   });

   const toggleEjectList = ejectList ? ejectedList : '';
   const toggleIcon: IconProp = ejectList ? ['fas', 'chevron-down'] : ['fas', 'chevron-right']

   return (
      <div className = {oneDaySubjectContainer}>
         <button
            className = {dayButtonToggle}
            onClick = {() => setEjectList(prevState => !prevState)}
            title = {!ejectList ? 'Rozwiń panel' : 'Schowaj panel'}
         >
            <FontAwesomeIcon
               icon = {toggleIcon}
               className = {fasIcon}
            />
            <span className = {dayTitle}>{dayStr}</span>
            <span>Ilość przedmiotów: {filteredDayArray.length}</span>
         </button>
         <div className = {classnames(subjectList, toggleEjectList)}>
            <ul className = {scheduleList}>
               <li className = {listSorting}>
                  <span className = {sortById}>id</span>
                  <span className = {listTitle}>nazwa przemiotu</span>
                  <span className = {listHour}>godzina</span>
                  <span className = {listType}>typ</span>
                  <span className = {listGroupHeader}>grupa</span>
               </li>
               {generateDayStructure}
               {filteredDayArray.length === 0 && <div className = {recordsNotExist}>
                  <FontAwesomeIcon
                     icon = {['fas', 'info-circle']}
                     className = {infoIcon}
                  />
                  <p>Brak wprowadzonych przedmiotów</p>
               </div>}
               <button
                  className = {classnames(addNewRecord, addNewSubjectSchedule)}
                  onClick = {() => setScheduleModal!({ ...scheduleModal!, type: MODAL_TYPES.ADD, day: dayStr, ifOpen: true })}
               >
                  Dodaj nowy przedmiot
               </button>
            </ul>
         </div>
      </div>
   );
}

export default OneDaySchedule;