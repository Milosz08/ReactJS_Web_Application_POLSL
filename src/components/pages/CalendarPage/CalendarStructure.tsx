import React, { Fragment, useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { v4 as uuidv4 } from 'uuid';

import { MainStoreContext } from '../../../contextStore/MainStoreContext';
import './CalendarStyles.scss';

const { messageInit, hourStart } = require('./CalendarPage.module.scss');

interface SupplementsTilesProvider {
   date: Date;
   view: string;
}

interface CalendarProvider {
   day: number;
   month: number;
   year: number;
   items: Array<{
      start: string;
      message: string;
      importantLevel: string;
   }>
}

/**
 * Generacja i dodatkowa implementacja kalendarza. Pobiera dane z globalnego stora (kontekstu).
 */
const CalendarStructure = () => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
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
                  <p key = {uuidv4()} className = {prop.importantLevel}>
                     <span className = {messageInit}>{prop.message}</span>
                     <span className = {hourStart}>{prop.start}</span>
                  </p>
               ))
            ) : null
      ));
   }

   return (
      <Calendar
         tileContent = {supplementsTiles}
         value = {value}
         onChange = {onChange}
         locale = 'pl-PL'
         prevLabel = {<span/>}
         prev2Label = {<Fragment><span/><span/></Fragment>}
         nextLabel = {<span/>}
         next2Label = {<Fragment><span/><span/></Fragment>}
      />
   );
}

export default CalendarStructure;