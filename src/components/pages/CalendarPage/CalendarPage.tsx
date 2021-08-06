import React, { Fragment } from 'react';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import UniversalHeader from "../../layouts/UniversalHeader/UniversalHeader";
import CalendarStructure from './CalendarStructure';
import DataLastUpdate from '../../layouts/DataLastUpdate/DataLastUpdate';

const { calendarContainer, calendarWrapper, underInfo, mobileInfo, legendInfo } = require('./CalendarPage.module.scss');
const { universalHeader } = require('./../../layouts/Navigation/Navigation.module.scss');

/**
 * Komponent generujący podstronę z kalendarzem studenta.
 */
const CalendarPage = () => {
   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <div className = {calendarContainer}>
            <div className = {calendarWrapper}>
               <section className = {universalHeader}>
                  <UniversalHeader
                     iconP = {['fas', 'calendar-alt']}
                     content = 'Kalendarz Studenta'
                     ifCloseButtonVisible = {false}
                  />
                  <p className = {underInfo}>
                     Interaktywny kalendarz z ważnymi datami. Kalendarz posiada możliwość nawigacji przy pomocy
                     strzałek (pojedyncza przenosi o miesiąc, podwójna przenosi o rok). Po kliknięciu w środkowy
                     panel daty kalendarz umożliwia szybki skok do miesiąca/roku/dekady. Kolor żółty na kafelku
                     kalendarza wskazuje aktualny dzień tygodnia.
                  </p>
                  <p className = {mobileInfo}>
                     Na urządzeniu moblinym kalendarz jest w formie zmimifikowanej. Aby zobaczyć, jakie aktywności
                     kryją się pod poszczególnymi dniami tygonia, kliknik w kafelek, aby otworzyć Modal.
                  </p>
               </section>
               <CalendarStructure/>
               <DataLastUpdate
                  dataID = {process.env.REACT_APP_CALENDAR_ID}
                  content = 'kalendarza'
                  withoutText = {false}
               />
               <section className = {universalHeader}>
                  <UniversalHeader
                     iconP = {['fas', 'info-circle']}
                     content = 'Dodatkowe Informacje'
                     ifCloseButtonVisible = {false}
                  />
                  <div className = {legendInfo}>
                     <ul>
                        <li><span>Kolor zielony</span> - aktywności o niskim priorytecie</li>
                        <li><span>Kolor żółty</span> - aktywności o średnim priorytecie</li>
                        <li><span>Kolor czerwony</span> - aktywności o wysokim priorytecie</li>
                     </ul>
                  </div>
               </section>
            </div>
         </div>
      </Fragment>
   );
}

export default CalendarPage;