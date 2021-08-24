/**
 * @file SummerBreakSchedule.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                uuid: "^8.3.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/24/2021
 */

import React, { Fragment, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { STATIC_DAYS } from './SchedulePage';
import { ActualDateContext, ActualDateTypes } from '../../../contextStore/ActualDateProvider';

const { scheduleDaysWrapper, separateTopMargin, separateBottomMargin } = require('./SchedulePage.module.scss');
const { dayOfWeekCSS, endLineOfSection, separateContainer } = require('./ScheduleSections.module.scss');
const { scheduleSection, centerSeparateWindow, centerSeparateContent, active } = require('./ScheduleSections.module.scss');

/**
 * @details Component responsible for generating information about an empty timetable (inter-semester break,
 *          holidays, etc.).
 */
const SummerBreakSchedule = (): JSX.Element => {

   const { date } = useContext<Partial<ActualDateTypes>>(ActualDateContext);
   const { dayStr } = date!;

   const generateHeaders: JSX.Element[] = STATIC_DAYS.map((day: string) => {
      const ifActive: string = dayStr.toLocaleLowerCase() === day.toLocaleLowerCase() ? active : '';
      return (
         <div className = {scheduleSection} key = {uuidv4()}>
            <header className = {classnames(dayOfWeekCSS, ifActive)}>
               {day}
            </header>
         </div>
      );
   });

   const generateFooters: JSX.Element[] = STATIC_DAYS.map((day: string) => {
      const ifActive: string = dayStr.toLocaleLowerCase() === day.toLocaleLowerCase() ? active : '';
      return (
         <aside className = {classnames(endLineOfSection, separateContainer, ifActive)} key = {uuidv4()}/>
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