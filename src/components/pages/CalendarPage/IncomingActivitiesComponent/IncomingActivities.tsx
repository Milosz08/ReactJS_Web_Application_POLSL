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

import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../contextStore/MainStoreProvider';

import separatingCalendarRecords, { ObjectProvider } from '../../../../helpers/separatingCalendarRecords';
import getSingleDateObjects from '../../../../constants/getSingleDateObjects';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const { emptySubjectField, emptyIcon } = require('./../../../layouts/Subjects/Subjects.module.scss');
const { universalHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
    incomingActivities, incomingActivitiesContainer, incomingActivitiesWrapper, dateInfoAbsolute, mainContent,
    indicatorRight, low, medium, high, asideActivitiesInfo
} = require('./IncomingActivities.module.scss');

/**
 * This constant that defines how many days in advance upcoming events should show up.
 */
const DAYS_INCOME: number = 8;

/**
 * @details Component responsible for generating upcoming events. Bookmark in addition to the student's
 *          calendar for quick information about upcoming events.
 */
const IncomingActivities = (): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { calendarRecords } = dataFetchFromServer;

    const [ allActivities, setAllActivities ] = useState<ObjectProvider[]>([]);

    // eslint-disable-next-line array-callback-return
    const generateRecentActivities = allActivities.map((activity: ObjectProvider): JSX.Element | undefined => {
        const { date } = activity;

        const currDate: Date = new Date();
        const itemDate: Date = new Date(date);

        const ifDateIsNotLower: boolean = itemDate.getTime() > currDate.getTime();
        const ifDateIsNotHigher: boolean = itemDate.getTime() < (currDate.getTime() + (1000 * 60 * 60 * 24 * DAYS_INCOME));

        const { day, month, hours, minutes } = getSingleDateObjects(itemDate);

        const chooseImportantLevel = (): string | undefined => {
            switch (activity.important) {
                case 'low':
                    return low;
                case 'medium':
                    return medium;
                case 'high':
                    return high;
            }
        }

        if (ifDateIsNotLower && ifDateIsNotHigher) {
            return (
                <div
                    className = {incomingActivitiesContainer}
                    key = {activity._id}
                >
                    <span className = {classnames(dateInfoAbsolute, chooseImportantLevel())}>
                        {day}/{month}/{itemDate.getFullYear()}, {hours}:{minutes}
                    </span>
                    <span className = {mainContent}>
                        {activity.message}
                    </span>
                    <span className = {classnames(indicatorRight, chooseImportantLevel())}/>
                </div>
            );
        }
    });

    const generateNonActivities: JSX.Element | null = generateRecentActivities.every((curValue) => curValue === undefined) ? (
        <div className = {emptySubjectField}>
            <FontAwesomeIcon
                icon = {[ 'fas', 'exclamation-circle' ]}
                className = {emptyIcon}
            />
            <span>Brak nadchodzących wydarzeń.</span>
            <span className = {asideActivitiesInfo}>
                Wydarzenia wyświetlane są automatycznie z {DAYS_INCOME - 1}-dniowym wyprzedzeniem.
            </span>
        </div>
    ) : null;

    useEffect(() => {
        const returnerArray = separatingCalendarRecords(calendarRecords);
        setAllActivities(returnerArray);
    }, [ calendarRecords ]);

    return (
        <section className = {classnames(incomingActivities, universalHeader)}>
            <UniversalHeader
                iconP = {[ 'fas', 'business-time' ]}
                content = 'Nadchodzące Wydarzenia'
                ifCloseButtonVisible = {false}
            />
            <div className = {incomingActivitiesWrapper}>
                {generateRecentActivities}
            </div>
            {generateNonActivities}
        </section>
    );
};

export default IncomingActivities;