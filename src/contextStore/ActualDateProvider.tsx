/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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