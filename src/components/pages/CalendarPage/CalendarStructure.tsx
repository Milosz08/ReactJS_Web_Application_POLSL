import React, { Dispatch, Fragment, SetStateAction, useContext, useState, useEffect } from 'react';
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

interface PropsProvider {
   setOpenModal: Dispatch<SetStateAction<any>>;
   setDate: Dispatch<SetStateAction<Date>>;
}

/**
 * Generacja i dodatkowa implementacja kalendarza. Pobiera dane z globalnego stora (kontekstu).
 */
const CalendarStructure: React.FC<PropsProvider> = ({ setOpenModal, setDate }) => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);

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
      if(offsetWidth < 970) {
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