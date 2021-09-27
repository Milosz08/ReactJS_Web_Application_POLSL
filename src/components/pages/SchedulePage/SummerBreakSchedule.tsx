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