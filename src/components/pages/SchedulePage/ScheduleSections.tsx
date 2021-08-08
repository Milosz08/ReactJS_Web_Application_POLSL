import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import ExpandedPanel from './ExpandedPanel';

import { ActualDateContext } from '../../../contextStore/ActualDateProvider';
import { MainStoreContext } from '../../../contextStore/MainStoreContext';
import { ScheduleContext } from '../../../contextStore/ScheduleProvider';

import GROUPS_STATIC from '../../../constants/allGroups';

const {
   scheduleSection, dayOfWeekCSS, active, scheduleTile, subjectType, subjectImportant, endLineOfSection,
   separator, subjectIcon, disactiveTile, subjectActive
} = require('./ScheduleSections.module.scss');

interface PropsProvider {
   dayOfWeek: string;
}

interface SheduleSubjectsProvider {
   _id: string,
   title: string,
   group: string,
   day: string,
   type: string,
   start: string,
   end: string,
   pzeInfo: {
      platform: string,
      pzeLink: string
   }
}

/**
 * Komponent renderujący grid planu zajęć. Dane pobierane są z globalnego kontekstu (przechwytywanie z backendu
 * poprzez API). Re-rerender komponentu przy każdej zmianie preferencji użytkownika.
 *
 * @param dayOfWeek { string } - aktualny dzień tygodnia.
 */
const ScheduleSections: React.FC<PropsProvider> = ({ dayOfWeek }) => {

   const { date } = useContext<any>(ActualDateContext);
   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { groupSelected, engSelected, inputField } = useContext<any>(ScheduleContext);

   const [ filteredArray, setFilteredArray ] = useState<any>([]);

   const { dayStr } = date;
   const { sheduleSubjects } = dataFetchFromServer;
   const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

   const ifActive: string = dayStr.toLocaleLowerCase() === dayOfWeek.toLocaleLowerCase() ? active : '';

   useEffect(() => {
      const returFilteredArray = (engGroup: string, normalGroup: string): Array<SheduleSubjectsProvider> => (
         sheduleSubjects.filter((object: SheduleSubjectsProvider) => (
            object.group === engGroup || object.group === normalGroup || object.group === 'all'
         )
      ));

      const englishGroup = (normalGroup: string): void => {
         setFilteredArray(returFilteredArray(normalGroup, engSelected));
      }

      switch(groupSelected) {
         case NORMAL_GROUPS[0].text:
            englishGroup(NORMAL_GROUPS[0].field);
            break;
         case NORMAL_GROUPS[1].text:
            englishGroup(NORMAL_GROUPS[1].field);
            break;
         default:
            throw new Error('Selected group not exist!');
      }

   }, [groupSelected, engSelected, NORMAL_GROUPS, sheduleSubjects, ENG_GROUPS, inputField]);

   const filteredSubjects = filteredArray.filter((subject: SheduleSubjectsProvider): boolean => (
      subject.day.toLocaleLowerCase() === dayOfWeek.toLocaleLowerCase()
   ));

   filteredSubjects.sort((prevH: SheduleSubjectsProvider, secH: SheduleSubjectsProvider): number => (
      parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
   ));

   const generateOneColumnOfTile = filteredSubjects.map((tile: any) => {
      const title = tile.title.toLowerCase();
      const startHour = parseInt(tile.start.replace(':', ''));
      const endHour = parseInt(tile.end.replace(':', ''));
      const tileDay = tile.day.toLocaleLowerCase();
      const actualDay = date.dayStr.toLocaleLowerCase();

      const filterOneSubject = dataFetchFromServer.subjectsData.filter((subject: SheduleSubjectsProvider) => (
         subject.title.toLocaleLowerCase() === title
      ));

      const searchActive = title.includes(inputField.toLowerCase()) || !inputField ? '' : disactiveTile;
      const activeHour = (startHour < date.time && endHour > date.time) && tileDay === actualDay
         ? subjectActive : '';

      return (
         filterOneSubject[0] &&
         <div className = {classnames(scheduleTile, activeHour, searchActive)} key = {uuidv4()}>
            <p className = {subjectType}>{tile.type}</p>
            <h2 className = {subjectImportant}>{tile.title}</h2>
            <div className = {separator}>
               <span/>
               <FontAwesomeIcon
                  icon = {[filterOneSubject[0].icon[0], filterOneSubject[0].icon[1]]}
                  className = {subjectIcon}
               />
               <span/>
            </div>
            <h2 className = {subjectImportant}>{tile.start} - {tile.end}</h2>
            <ExpandedPanel
               tile = {tile}
               subjectObj = {filterOneSubject[0]}
            />
         </div>
      );
   });

   return (
      <div className = {scheduleSection}>
         <header className = {`${dayOfWeekCSS} ${ifActive}`}>
            {dayOfWeek}
         </header>
         {generateOneColumnOfTile}
         <aside className = {`${endLineOfSection} ${ifActive}`}/>
      </div>
   );
}

export default ScheduleSections;