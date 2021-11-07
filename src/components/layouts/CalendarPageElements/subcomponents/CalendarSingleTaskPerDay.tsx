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

import { CalendarContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import {
    CalendarHourContainer, CalendarModalNoActivities, CalendarModalNoActivitiesIcon, CalendarOneTaskContainer,
    CalendarTaskMessage
} from '../CalendarPageElements.styles';

interface PropsProvider {
    filteredRecord: CalendarContentTypes | undefined;
}

/**
 * Component responsible showing all activities in opened activities modal (small devices).
 *
 * @param filteredRecord { CalendarContentTypes | undefined } - finded activities based day (if not found => undefined value).
 */
const CalendarSingleTaskPerDay: React.FC<PropsProvider> = ({ filteredRecord }): JSX.Element => {

    const generateStructure = (): JSX.Element[] | null => {
        if(Boolean(filteredRecord)) {
            return filteredRecord!.items.map((item: any) => (
                <CalendarOneTaskContainer
                    key = {item.message}
                    colorCSS = {item.importantLevel}
                >
                    <CalendarTaskMessage
                        colorCSS = {item.importantLevel}
                    >
                        {item.message}
                    </CalendarTaskMessage>
                    <CalendarHourContainer
                        colorCSS = {item.importantLevel}
                    >
                        Start: {item.start}
                    </CalendarHourContainer>
                </CalendarOneTaskContainer>
            ));
        }
        return null;
    };

    const noActivities: JSX.Element = (
        <CalendarModalNoActivities>
            <CalendarModalNoActivitiesIcon/>
            Brak aktywności
        </CalendarModalNoActivities>
    );

    return (
        <Fragment>
            {Boolean(filteredRecord) ? generateStructure() : noActivities}
        </Fragment>

    );
};

export default CalendarSingleTaskPerDay;