import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";

import { ModalsStateContext, MODAL_TYPES } from "../../../../../../contextStore/ModalsStateProvider";

const {
   modifyElement, deleteElement, addNewRecord, listNumber, sortById, listSorting, infoIcon, recordsNotExist
} = require('./../Panels.module.scss');
const {
   subjectList, ejectedList, oneDaySubjectContainer, scheduleList, dayButtonToggle, dayTitle, listTitle, listHour,
   listType, listGroup, listButtons, listGroupHeader, fasIcon, addNewSubjectSchedule
} = require('./../SchedulePanel.module.scss');

interface PropsProvider {
   dayStr: string;
   filteredAllSubjects: Array<any>;
}

/**
 * Komponent generujący przedmioty z konkretnego dnia przekazywanego w propsach.
 *
 * @param dayStr { string } - dzień, z jakiego ma wyrenderować przedmioty.
 * @param filteredAllSubjects { Array<any> } - tablica z przefiltrowanymi przedmiotami.
 */
const OneDaySchedule: React.FC<PropsProvider> = ({ dayStr, filteredAllSubjects }) => {

   const { scheduleModal, setScheduleModal } = useContext<any>(ModalsStateContext);

   // const [ filteredArray, setFilteredArray ] = useState<Array<any>>([]);
   const [ ejectList, setEjectList ] = useState<boolean>(false);

   const filteredDayArray = filteredAllSubjects.filter((shedule: any) => shedule.day === dayStr);
   filteredDayArray.sort((prevH: any, secH: any): number => (
      parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
   ));

   const generateDayStructure = filteredDayArray.map((subject: any, index: number) => {
      const groupInfoText = (group: string) => {
         if(!group.includes('b2') && !group.includes('c1')) {
            switch(group) {
               case 'all': return 'wszyscy';
               case 'firstGroup': return 'pierwsza';
               case 'secondGroup': return 'druga';
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
                  onClick = {() => setScheduleModal({
                     id: subject._id, type: MODAL_TYPES.EDIT, day: dayStr, ifOpen: true
                  })}
               >
                  <FontAwesomeIcon
                     icon = {['fas', 'edit']}
                     className = {fasIcon}
                     title = 'Modyfikuj rekord'
                  />
               </button>
               <button
                  className = {deleteElement}
                  onClick = {() => setScheduleModal({ id: subject._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
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
                  onClick = {() => setScheduleModal({
                     ...scheduleModal, type: MODAL_TYPES.ADD, day: dayStr, ifOpen: true
                  })}
               >
                  Dodaj nowy przedmiot
               </button>
            </ul>
         </div>
      </div>
   );
}

export default OneDaySchedule;