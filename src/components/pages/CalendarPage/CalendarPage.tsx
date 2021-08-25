/**
 * @file CalendarPage.tsx
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

import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes} from '../../../contextStore/MainStoreProvider';
import { IMPORTANT_VALUES } from '../AdminCmsSystemPage/AdminCmsMainPanel/Modals/WarningDeleteModal/CalendarDeleteModal';

import getSingleDateObjects from '../../../constants/getSingleDateObjects';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const UniversalHeader = React.lazy(() => import('../../layouts/UniversalHeader/UniversalHeader'));
const CalendarStructure = React.lazy(() => import('./CalendarStructure'));
const DataLastUpdate = React.lazy(() => import('../../layouts/DataLastUpdate/DataLastUpdate'));

const {
   calendarContainer, calendarWrapper, underInfo, mobileInfo, legendInfo, calendarStructureAndModal, dateInfoModal,
   closeModal, modalActive, oneCalendarTask, taskMessage, taskHour, noActivities, emptyIcon, low, medium, high
} = require('./CalendarPage.module.scss');
const { universalHeader } = require('./../../layouts/Navigation/Navigation.module.scss');

/**
 * @details Component responsible for the generation of a subpage (routing) that displays the student's calendar.
 */
const CalendarPage = (): JSX.Element => {

   const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const [ openModal, setOpenModal ] = useState<boolean>(false);
   const [ date, setDate ] = useState<Date>(new Date());

   const toggleModalVisible = openModal ? classnames(dateInfoModal, modalActive) : dateInfoModal;
   const { day, month } = getSingleDateObjects(date);
   const { calendarRecords } = dataFetchFromServer;

   const generateTasksPerDay = () => {
      const selectClass = (value: string) => {
         switch(value) {
            case IMPORTANT_VALUES.LOW:       return low;
            case IMPORTANT_VALUES.MEDIUM:    return medium;
            case IMPORTANT_VALUES.HIGH:      return high;
         }
      }

      const filteredRecord = calendarRecords.find((record: any) => (
         record.day === date.getDate() && record.month === date.getMonth() && record.year === date.getFullYear()
      ));
      if(filteredRecord !== undefined) {
         return (
           filteredRecord.items.map((item: any) => (
             <div className = {classnames(oneCalendarTask, selectClass(item.importantLevel))} key = {item.message}>
                <h2 className = {taskMessage}>{item.message}</h2>
                <span className = {classnames(taskHour, selectClass(item.importantLevel))}>Start: {item.start}</span>
             </div>
           ))
         );
      } else {
         return (
            <div className = {noActivities}>
               <FontAwesomeIcon
                  icon = {['fas', 'exclamation-circle']}
                  className = {emptyIcon}
               />
               Brak aktywności
            </div>
         );
      }
   }

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.CALENDAR_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <MobileDownNav id = {2}/>
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
               <div className = {calendarStructureAndModal}>
                  <div className = {toggleModalVisible}>
                     <h2>Aktywności</h2>
                     <span>w dniu: {day}/{month}/{date.getFullYear()}</span>
                     {generateTasksPerDay()}
                     <button
                        className = {closeModal}
                        onClick = {() => setOpenModal(false)}
                        title = 'Zamknij okno'
                     />
                  </div>
                  <CalendarStructure setOpenModal = {setOpenModal} setDate = {setDate}/>
               </div>
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