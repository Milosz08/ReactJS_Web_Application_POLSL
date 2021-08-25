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

import React, { useContext, useEffect, useRef } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';
import { v4 as uuidv4 } from 'uuid';

import ActualDateProvider from '../../../contextStore/ActualDateProvider';
import ScheduleProvider from '../../../contextStore/ScheduleProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const AcceptScheduleChoiceModal = React.lazy(() => import('./AcceptScheduleChoiceModal/AcceptScheduleChoiceModal'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const ScheduleForm = React.lazy(() => import('./ScheduleForm/ScheduleForm'));
const ScheduleSections = React.lazy(() => import('./ScheduleSections'));
const SearchSubject = React.lazy(() => import('./ScheduleHeader/SearchSubject'));
const AdditionalTools = React.lazy(() => import('./ScheduleHeader/AdditionalTools'));
const UniversalHeader = React.lazy(() => import('../../layouts/UniversalHeader/UniversalHeader'));
const ActualDateInfo = React.lazy(() => import('./ScheduleHeader/ActualDateInfo'));
const SummerBreakSchedule = React.lazy(() => import('./SummerBreakSchedule'));

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
   const { summerBreak } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const executeScroll = (): void => {
      executeScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
   }

   const generateDaysStructure: JSX.Element[] = STATIC_DAYS.map((day: string) => (
      <ScheduleSections key = {uuidv4()} dayOfWeek = {day}/>
   ));

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.SCHEDULE_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <ScheduleProvider>
         <CookiesNotification/>
         <AcceptScheduleChoiceModal/>
         <MobileDownNav id = {1}/>
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
                  {summerBreak ? <SummerBreakSchedule/> : <div className = {scheduleDaysWrapper}>
                     {generateDaysStructure}
                  </div>}
               </div>
            </ActualDateProvider>
            <AdditionalTools/>
         </div>
      </ScheduleProvider>
   );
}

export default SchedulePage;