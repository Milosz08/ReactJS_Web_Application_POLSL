/**
 * @file CalendarStructure.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCalendar: "^3.4.0"
 *                uuid: "^8.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Dispatch, Fragment, SetStateAction, useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { v4 as uuidv4 } from 'uuid';

import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreContext';

import './CalendarStyles.scss';
const { messageInit, hourStart } = require('./CalendarPage.module.scss');

/**
 * A constant that defines the maximum width of the browser window in which it is possible to
 * open the modal with activities (in px).
 */
const MAX_WIDTH_CLICK_ACTION: number = 970;

/**
 * Interface defining the type of SupplementsTiles values.
 */
interface SupplementsTilesProvider {
   date: Date;
   view: string;
}

/**
 * Interface defining the type of CalendarRecord values.
 */
interface CalendarProvider {
   day: number;
   month: number;
   year: number;
   items: {
      start: string;
      message: string;
      importantLevel: string;
   }[];
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   setOpenModal: Dispatch<SetStateAction<boolean>>;
   setDate: Dispatch<SetStateAction<Date>>;
}

/**
 * Generacja i dodatkowa implementacja kalendarza. Pobiera dane z globalnego stora (kontekstu).
 */
const CalendarStructure: React.FC<PropsProvider> = ({ setOpenModal, setDate }): JSX.Element => {

   const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const [ offsetWidth, setOffsetWidth ] = useState<number>(document.body.offsetWidth);
   const [ value, onChange ] = useState<Date>(new Date());

   const { calendarRecords } = dataFetchFromServer;

   const supplementsTiles = ({ date, view }: SupplementsTilesProvider): any => {
      return calendarRecords.map((item: CalendarProvider) => (
         view === 'month' && date.getMonth() === item.month && date.getDate() === item.day
         && date.getFullYear() === item.year
            ? (
               item.items.sort((a, b) => (
                  parseInt(a.start.replace(':', '')) - parseInt(b.start.replace(':', ''))
               )).map(prop => (
                  <Fragment key = {uuidv4()}>
                     <p className = {prop.importantLevel}>
                        <span className = {messageInit}>{prop.message}</span>
                        <span className = {hourStart}>{prop.start}</span>
                     </p>
                     <span className = {prop.importantLevel}/>
                  </Fragment>
               ))
            ) : null
      ));
   }

   const handleClickDay = (value: Date) => {
      if(offsetWidth < MAX_WIDTH_CLICK_ACTION) {
         setOpenModal(true);
         setDate(value);
      }
   }

   useEffect(() => {
      const handleResize = () => setOffsetWidth(document.body.offsetWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, [offsetWidth]);

   return (
      <Calendar
         tileContent = {supplementsTiles}
         value = {value}
         onChange = {onChange}
         onClickDay = {(value: Date) => handleClickDay(value)}
         locale = 'pl-PL'
         prevLabel = {<span/>}
         prev2Label = {<Fragment><span/><span/></Fragment>}
         nextLabel = {<span/>}
         next2Label = {<Fragment><span/><span/></Fragment>}
      />
   );
}

export default CalendarStructure;