import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';

import { STATIC_DAYS } from './SchedulePage';
import { ActualDateContext, ActualDateTypes } from '../../../contextStore/ActualDateProvider';

const { scheduleDaysWrapper, separateTopMargin, separateBottomMargin } = require('./SchedulePage.module.scss');
const { dayOfWeekCSS, endLineOfSection, separateContainer } = require('./ScheduleSections.module.scss');
const { scheduleSection, centerSeparateWindow, centerSeparateContent, active } = require('./ScheduleSections.module.scss');

/**
 * @details
 */
const SummerBreakSchedule = (): JSX.Element => {

   const { date } = useContext<Partial<ActualDateTypes>>(ActualDateContext);
   const { dayStr } = date!;

   const generateHeaders: JSX.Element[] = STATIC_DAYS.map((day: string) => {
      const ifActive: string = dayStr.toLocaleLowerCase() === day.toLocaleLowerCase() ? active : '';
      return (
         <div className={scheduleSection}>
            <header className={classnames(dayOfWeekCSS, ifActive)}>
               {day}
            </header>
         </div>
      );
   });

   const generateFooters: JSX.Element[] = STATIC_DAYS.map((day: string) => {
      const ifActive: string = dayStr.toLocaleLowerCase() === day.toLocaleLowerCase() ? active : '';
      return (
         <aside className={classnames(endLineOfSection, separateContainer, ifActive)}/>
      );
   });

   return (
      <Fragment>
         <div className = {classnames(scheduleDaysWrapper, separateTopMargin)}>
            {generateHeaders}
         </div>
         <div className = {centerSeparateWindow}>
            <img src = {`${process.env.PUBLIC_URL}/images/summertime.png`} alt = 'summer'/>
            <div className = {centerSeparateContent}>
               <h2>Brak zajęć</h2>
            </div>
         </div>
         <div className = {classnames(scheduleDaysWrapper, separateBottomMargin)}>
            {generateFooters}
         </div>
      </Fragment>
   );
}

export default SummerBreakSchedule;