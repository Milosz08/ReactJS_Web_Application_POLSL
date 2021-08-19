/**
 * @file SchedulePage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                uuid: "^8.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ActualDateProvider from '../../../contextStore/ActualDateProvider';
import ScheduleProvider from '../../../contextStore/ScheduleProvider';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import AcceptScheduleChoiceModal from './AcceptScheduleChoiceModal/AcceptScheduleChoiceModal';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import ScheduleSections from './ScheduleSections';
import SearchSubject from './ScheduleHeader/SearchSubject';
import AdditionalTools from './ScheduleHeader/AdditionalTools';
import UniversalHeader from '../../layouts/UniversalHeader/UniversalHeader';
import ActualDateInfo from './ScheduleHeader/ActualDateInfo';

const { scheduleContainer, scheduleWrapper, scheduleDaysContainer, scheduleDaysWrapper } = require('./SchedulePage.module.scss');
const { scheduleRender } = require('./../../layouts/Navigation/Navigation.module.scss');

/**
 * Static array of strings representing the consecutive days of the week.
 */
export const STATIC_DAYS: string[] = [ 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek' ];

/**
 * @details Component Rendering subpage with a class schedule (standard components, form on the basis of which a plan,
 *          a grid with a plan for classes and additional tools for the plan - generation of a PDF document) is generated.
 */
const SchedulePage = (): JSX.Element => {

   const executeScrollRef: React.MutableRefObject<any> = useRef<HTMLElement>(null);

   const executeScroll = (): void => {
      executeScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
   }

   const generateDaysStructure: JSX.Element[] = STATIC_DAYS.map(day => <ScheduleSections key = {uuidv4()} dayOfWeek = {day}/>);

   return (
      <ScheduleProvider>
         <CookiesNotification/>
         <AcceptScheduleChoiceModal/>
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