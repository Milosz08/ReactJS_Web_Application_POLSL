/**
 * @file ScheduleSections.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useLayoutEffect, useState } from 'react';
const { countDownContainer, countDownWrapper, dateFont, mobileDateFont } = require('./CountDown.module.scss');

/**
 * A constant representing the day and time of the counting end.
 */
const EXP_TIME: number = new Date('2021-10-01 10:00:00').getTime();

/**
 * Interface defining the type of State values.
 */
interface StateProvider {
   [value: string]: number | string;
}

/**
 * @details Component on the deductible main page to the date stored in the permanent Exp_Time. The refreshed component
 *          is every second with the UselayoutEffect function and counts down the time from the current date, collected every
 *          time the Date class component is refreshed. Time values take a permanent number of characters (for <10 is added 0).
 */
const CountDown = (): JSX.Element => {

   const [ date, setDate ] = useState<StateProvider>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

   useLayoutEffect(() => {
      const setDateObject = (nowTime : number): StateProvider => {
         let days : number | string = Math.floor((EXP_TIME / (1000 * 60 * 60 * 24)) - (nowTime / (1000 * 60 * 60 * 24)));
         days = days < 10 ? `0${days}` : days;

         let hours : number | string = Math.floor((EXP_TIME / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);
         hours = hours < 10 ? `0${hours}` : hours;

         let minutes : number | string = Math.floor((EXP_TIME / (1000 * 60) - nowTime / (1000 * 60)) % 60);
         minutes = minutes < 10 ? `0${minutes}` : minutes;

         let seconds : number | string = Math.floor((EXP_TIME / 1000 - nowTime / 1000) % 60);
         seconds = seconds < 10 ? `0${seconds}` : seconds;

         return { days, hours, minutes, seconds };
      }

      const counting = () => {
         const { days, hours, minutes, seconds } = setDateObject(new Date().getTime());
         setDate({ days, hours, minutes, seconds });
      }

      const index = setInterval(counting, 1000);
      return () => clearInterval(index);
   });

   return (
      <div className = {countDownContainer}>
         <div className = {countDownWrapper}>
            <h2>Do rozpoczęcia <strong>III semestru</strong> brakuje:</h2>
            <div className = {dateFont}>
               <span><strong>{date.days}</strong> dni, </span>
               <span><strong>{date.hours}</strong> godzin, </span>
               <span><strong>{date.minutes}</strong> minut, </span>
               <span><strong>{date.seconds}</strong> sekund </span>
            </div>
            <div className = {mobileDateFont}>
               <span>{date.days}:{date.hours}:{date.minutes}:{date.seconds}</span>
            </div>
         </div>
      </div>
   );
}

export default CountDown;