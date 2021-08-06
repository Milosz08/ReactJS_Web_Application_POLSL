import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ActualDateProvider from '../../../contextStore/ActualDateProvider';
import ScheduleProvider from "../../../contextStore/ScheduleProvider";

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import ScheduleSections from './ScheduleSections';
import SearchSubject from './ScheduleHeader/SearchSubject';
import AdditionalTools from './ScheduleHeader/AdditionalTools';
import UniversalHeader from '../../layouts/UniversalHeader/UniversalHeader';
import ActualDateInfo from './ScheduleHeader/ActualDateInfo';

const {
   scheduleContainer, scheduleWrapper, scheduleDaysContainer, scheduleDaysWrapper
} = require('./SchedulePage.module.scss');
const { scheduleRender } = require('./../../layouts/Navigation/Navigation.module.scss');

const STATIC_DAYS = [
   'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek',
];

/**
 * Komponent renderujący podstronę z planem zajęć (standardowe komponenty, formularz na podstawie którego generowany
 * jest plan, siatka z planem zajęć oraz dodatkowe narzędzia do planu - generacja dokumentu pdf).
 */
const SchedulePage = () => {

   const executeScrollRef = useRef<any>(null);

   const executeScroll = (): void => {
      executeScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
   }

   const generateDaysStructure = STATIC_DAYS.map(day => <ScheduleSections key = {uuidv4()} dayOfWeek = {day}/>);

   return (
      <ScheduleProvider>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <div className = {scheduleContainer}>
            <ActualDateProvider>
               <div className = {scheduleWrapper}>
                  <ScheduleForm executeScroll = {executeScroll}/>
                  <section 
                     className = {scheduleRender}
                     ref = {executeScrollRef}
                  >
                     <UniversalHeader
                        iconP = {['fas', 'calendar-check']}
                        content = 'Wygenerowany Plan Zajęć'
                        ifCloseButtonVisible = {false}
                     />
                     <ActualDateInfo/>
                  </section>
                  <SearchSubject/>
               </div>
               <div className = {scheduleDaysContainer}>
                  <div className = {scheduleDaysWrapper}>
                     {generateDaysStructure}
                  </div>
               </div>
            </ActualDateProvider>
            <AdditionalTools/>
         </div>
      </ScheduleProvider>
   );
}

export default SchedulePage;