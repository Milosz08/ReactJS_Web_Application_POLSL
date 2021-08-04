import React, { useLayoutEffect, useState } from "react";

const { countDownContainer, countDownWrapper, dateFont } = require('./CountDown.module.scss');

const EXP_TIME = new Date('2021-10-01 10:00:00').getTime(); //koniec odliczania

interface StateProvider {
   days: number | string;
   hours: number | string;
   minutes: number | string;
   seconds: number | string;
}

/**
 * Komponent na stronie głównej odliczający do daty zapisanej w stałej EXP_TIME. Komponent odświeżany jest co 1
 * sekundę przy pomocy funkcji useLayoutEffect i odlicza czas od aktualnej daty, pobieranej przy każdym odświeżeniu
 * komponentu z klasy Date. Wartości czasu przyjmują stałą ilość znaków (dla < 10 dodawane jest 0).
 */
const CountDown = () => {

   const [ date, setDate ] = useState<StateProvider>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

   useLayoutEffect(() => {
      const setDateObject = (nowTime : number) => {
         let days : number | string = Math.floor((EXP_TIME / (1000*60*60*24)) - (nowTime / (1000*60*60*24)));
         days = days < 10 ? `0${days}` : days;

         let hours : number | string = Math.floor((EXP_TIME / (1000* 60*60) - nowTime / (1000*60*60)) % 24);
         hours = hours < 10 ? `0${hours}` : hours;

         let minutes : number | string = Math.floor((EXP_TIME / (1000*60) - nowTime / (1000*60)) % 60);
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
         </div>
      </div>
   );
}

export default CountDown;