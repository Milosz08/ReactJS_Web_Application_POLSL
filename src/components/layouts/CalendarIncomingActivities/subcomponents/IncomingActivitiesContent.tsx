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

import * as React from 'react';
import { Fragment } from 'react';

import { DAYS_INCOME } from '../../../../helpers/structs/calendar.config';
import ConvertTimeUTC from '../../../../helpers/functionsAndClasses/convertTimeUTC';
import SeparatingSingleCalendarTiles from '../../../../helpers/functionsAndClasses/separatingCalendarRecords';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';

import {
    IncomingActivitesContainer, IncomingActivitiesContentMessage, IncomingActivitiesDateInfo, IncomingActivitiesIndicator,
    IncomingActivitiesMainWrapper
} from '../CalendarIncomingActivities.styles';

const NoIcomingActivities = React.lazy(() => import('./NoIncomingActivities'));

/**
 * Component responsible for generating activities in the selected time period
 * (based constant in calendar.config.ts).
 */
const IncomingActivitiesContent: React.FC = (): JSX.Element => {

    const { calendarContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const recentActivities = new SeparatingSingleCalendarTiles(calendarContent).getAllReversedItems();

    const generateRecentActivity: (JSX.Element | null)[] = recentActivities.reverse().map((activity, idx) => {
        const { date } = activity;
        const currDate: Date = new Date();
        const itemDate: Date = new Date(date);

        const ifDateIsNotLower: boolean = itemDate.getTime() > currDate.getTime();
        const ifDateIsNotHigher: boolean = itemDate.getTime() < (currDate.getTime() + (1000 * 60 * 60 * 24 * DAYS_INCOME));

        const { day, month, hours, minutes } = new ConvertTimeUTC(itemDate).getDestructurizedDate();

        if (ifDateIsNotLower && ifDateIsNotHigher) {
            return (
                <IncomingActivitesContainer
                    key = {idx}
                >
                    <IncomingActivitiesDateInfo
                        colorCSS = {activity.important}
                    >
                        {day}/{month}/{itemDate.getFullYear()}, {hours}:{minutes}
                    </IncomingActivitiesDateInfo>
                    <IncomingActivitiesContentMessage>
                        {activity.message}
                    </IncomingActivitiesContentMessage>
                    <IncomingActivitiesIndicator
                        colorCSS = {activity.important}
                    />
                </IncomingActivitesContainer>
            );
        }
        return null;
    });

    return (
        <Fragment>
            <IncomingActivitiesMainWrapper>
                {generateRecentActivity}
            </IncomingActivitiesMainWrapper>
            <NoIcomingActivities
                jsxElms = {generateRecentActivity}
            />
        </Fragment>
    );
};

export default IncomingActivitiesContent;