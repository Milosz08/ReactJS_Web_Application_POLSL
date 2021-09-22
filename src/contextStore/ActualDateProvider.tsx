/**
 * @file ActualDateProvider.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component with Context Store (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { createContext, useState, useEffect } from 'react';
import DAYS_AND_MONTHS from '../constants/daysAndMonths';

/**
 * Constant that decides how many minutes the value in the store is to be re-rendered.
 */
const INTERVAL_RESET_DATE: number = 10;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of state values.
 */
interface StateProvider {
    dayStr: string;
    day: number;
    monthStr: string;
    year: number;
    time: number;
}

/**
 * Interface defining the type of actual date values.
 */
export interface ActualDateTypes {
    date: StateProvider;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const ActualDateContext = createContext<Partial<ActualDateTypes>>({});

/**
 * @details React component that is a store that holds a date object. Component is
 *          re-rendered at the time specified in the constant "INTERVAL_RESET_DATE".
 *
 * @param childern { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const ActualDateProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const [ date, setDate ] = useState<StateProvider>({ dayStr: '', day: 0, monthStr: '', year: 0, time: 0 });
    const { DAYS, MONTHS } = DAYS_AND_MONTHS;

    useEffect(() => {
        const dateObject = (date: Date): StateProvider => {
            const day: number = date.getDate();
            const year: number = date.getFullYear();
            const hours: number = date.getHours();
            const minutes: number = date.getMinutes();
            const time: number = parseInt(`${hours}${minutes}`);

            const actualDay = DAYS.find((day: { id: number, name: string }): {} => day.id === date.getDay());
            const actualMonth = MONTHS.find((month: { id: number, paraphrase: string }) => month.id === date.getMonth());

            const dayStr: string = actualDay!.name;
            const monthStr: string = actualMonth!.paraphrase;

            return { dayStr, day, monthStr, year, time }
        }

        const counting = () => {
            const { dayStr, day, monthStr, year, time } = dateObject(new Date());
            setDate({ dayStr, day, monthStr, year, time });
        }

        counting();
        const interval = setInterval(counting, 1000 * 60 * INTERVAL_RESET_DATE);
        return () => clearInterval(interval);
    }, [ DAYS, MONTHS ]);

    return (
        <ActualDateContext.Provider
            value = {{ date }}
        >
            {children}
        </ActualDateContext.Provider>
    );
}

export default ActualDateProvider;