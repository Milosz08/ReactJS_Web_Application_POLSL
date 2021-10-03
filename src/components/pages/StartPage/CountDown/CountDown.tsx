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

import React, { useLayoutEffect, useState } from 'react';

const { countDownContainer, countDownWrapper, dateFont, mobileDateFont } = require('./CountDown.module.scss');

/**
 * A constant representing the day and time of the counting end.
 */
const EXP_TIME: number = new Date('2021-10-01T10:00:00').getTime();

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
        const setDateObject = (nowTime: number): StateProvider => {
            let days: number | string = Math.floor((EXP_TIME / (1000 * 60 * 60 * 24)) - (nowTime / (1000 * 60 * 60 * 24))) * -1;

            let hours: number | string = Math.floor((EXP_TIME / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24) * -1;

            let minutes: number | string = Math.floor((EXP_TIME / (1000 * 60) - nowTime / (1000 * 60)) % 60) * -1;
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            let seconds: number | string = Math.floor((EXP_TIME / 1000 - nowTime / 1000) % 60) * -1;
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
                <h2>Od rozpoczęcia <strong>III semestru</strong> minęło:</h2>
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