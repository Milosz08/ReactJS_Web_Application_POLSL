import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ActualDateProvider from '../../../contextStore/ActualDateProvider';
import SheduleProvider from "../../../contextStore/SheduleProvider";

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import SheduleForm from './SheduleForm/SheduleForm';
import SheduleSections from './SheduleSections';
import SearchSubject from './SheduleHeader/SearchSubject';
import AdditionalTools from './SheduleHeader/AdditionalTools';
import UniversalHeader from '../../layouts/UniversalHeader/UniversalHeader';
import ActualDateInfo from './SheduleHeader/ActualDateInfo';

const {
   sheduleContainer, sheduleWrapper, sheduleDaysContainer, sheduleDaysWrapper
} = require('./SheduleSections.module.scss');
const { sheduleRender } = require('./../../layouts/Navigation/Navigation.module.scss');

const STATIC_DAYS = [
   'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek',
];

/**
 * Komponent renderujący podstronę z planem zajęć (standardowe komponenty, formularz na podstawie którego generowany
 * jest plan, siatka z planem zajęć oraz dodatkowe narzędzia do planu - generacja dokumentu pdf).
 */
const ShedulePage = () => {

   const executeScrollRef = useRef<any>(null);

   const executeScroll = (): void => {
      executeScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
   }

   const generateDaysStructure = STATIC_DAYS.map(day => <SheduleSections key = {uuidv4()} dayOfWeek = {day}/>);

   return (
      <SheduleProvider>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <div className = {sheduleContainer}>
            <ActualDateProvider>
               <div className = {sheduleWrapper}>
                  <SheduleForm executeScroll = {executeScroll}/>
                  <section 
                     className = {sheduleRender}
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
               <div className = {sheduleDaysContainer}>
                  <div className = {sheduleDaysWrapper}>
                     {generateDaysStructure}
                  </div>
               </div>
            </ActualDateProvider>
            <AdditionalTools/>
         </div>
      </SheduleProvider>
   );
}

export default ShedulePage;