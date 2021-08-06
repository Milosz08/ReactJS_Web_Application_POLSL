import React, { createContext, useState, useEffect } from 'react';
import DAYS_AND_MONTHS from '../constants/daysAndMonths';

export const ActualDateContext = createContext<any>(null);

interface PropsProvider {
   children: React.ReactNode;
}

interface StateProvider {
   dayStr: string;
   day: number;
   monthStr: string;
   year: number;
   time: number;
}

/**
 *
 * @param childern
 */
const ActualDateProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ date, setDate ] = useState<StateProvider>({ dayStr: '', day: 0, monthStr: '', year: 0, time: 0 });
   const { DAYS, MONTHS } = DAYS_AND_MONTHS;

   useEffect(() => {
      const dateObject = (date: Date): StateProvider => {
         const day: number = date.getDate();
         const year: number = date.getFullYear();
         const hours: number = date.getHours();
         const minutes: number = date.getMinutes();
         const time: number = parseInt(`${hours}${minutes}`);

         const actualDay = DAYS.find((day: { id: number, name: string }): { } => day.id === date.getDay());
         const actualMonth = MONTHS.find((month: { id: number, paraphrase: string }) => month.id === date.getMonth());

         const dayStr: string = actualDay!.name;
         const monthStr: string = actualMonth!.paraphrase;

         return { dayStr, day, monthStr, year, time }
      }

      const counting = () => {
         const { dayStr, day, monthStr, year, time } = dateObject(new Date());
         setDate({ dayStr, day, monthStr, year, time });
      }

      counting(); //pierwsze wywołanie
      const interval = setInterval(counting, 1000 * 60 * 10); //refresh co 10 minut
      return () => clearInterval(interval);
   });

   return (
      <ActualDateContext.Provider
         value = {{ date }}
      >
         {children}
      </ActualDateContext.Provider>
   );
}

export default ActualDateProvider;