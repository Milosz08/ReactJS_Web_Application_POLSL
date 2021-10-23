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

import { useEffect, useState } from 'react';

interface StateProvider {
    [value: string]: number | string;
}

/**
 * Custom hook handling a timer counting down from the specified time in the expTime parameter.
 *
 * @param expTime { number } - estimation time to some event.
 */
const useEstimateCounter = (expTime: number) => {

    const [ date, setDate ] = useState<StateProvider>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const setDateObject = (nowTime: number): StateProvider => {
            let days: number | string = Math.floor((expTime / (1000 * 60 * 60 * 24)) - (nowTime / (1000 * 60 * 60 * 24))) * -1;
            days = days < 10 ? `0${days}` : days;

            let hours: number | string = Math.floor((expTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24) * -1;
            hours = hours < 10 ? `0${hours}` : hours;

            let minutes: number | string = Math.floor((expTime / (1000 * 60) - nowTime / (1000 * 60)) % 60) * -1;
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            let seconds: number | string = Math.floor((expTime / 1000 - nowTime / 1000) % 60) * -1;
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

    return date;
};

export default useEstimateCounter;