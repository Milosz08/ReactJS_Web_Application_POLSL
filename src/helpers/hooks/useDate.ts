/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { useEffect, useState } from 'react';
import ConvertTimeUTC, { DATE_ELEMENTS } from '../functionsAndClasses/convertTimeUTC';

interface StateProvider {
    day: string;
    engDay: string;
    dayNmb: number;
    month: string;
    year: number;
    time: {
        [value: string]: number;
    }
}

/**
 *
 */
const useDate = (intervalRule = true) => {

    const [ date, setDate ] = useState<StateProvider>({
        day: '', engDay: '', dayNmb: 0, month: '', year: 0, time: { hr: 0, min: 0, sec: 0 }
    });

    useEffect(() => {
        const counting = (): void => {
            const date = new ConvertTimeUTC();
            setDate({
                day: date.getDayPolishName(),
                engDay: date.getDayEnglishName(),
                dayNmb: Number(date.getOneDateElm(DATE_ELEMENTS.DAY)),
                month: date.getMonthPolishName(),
                year: Number(date.getOneDateElm(DATE_ELEMENTS.YEAR)),
                time: {
                    hr: Number(date.getOneDateElm(DATE_ELEMENTS.HOURS)),
                    min: Number(date.getOneDateElm(DATE_ELEMENTS.MINUTES)),
                    sec: Number(date.getOneDateElm(DATE_ELEMENTS.SECONDS))
                }
            });
        };
        counting();
        const interval = setInterval(counting, 1000 * (intervalRule ? 60 * INTERVAL_RESET_DATE : 1));
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return date;
};

/**
 * Constant that decides how many minutes the value in the store is to be re-rendered.
 */
const INTERVAL_RESET_DATE: number = 1; //minutes

export default useDate;