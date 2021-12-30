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

import useDate from '../../../../helpers/hooks/useDate';
import { STATIC_DAYS } from '../../../../helpers/structs/schedule.config';

import {
    ScheduleSummerBreakHeadersWrapper, ScheduleSummerBreakSingleDayWrapper, ScheduleSingleDayEndingSeparator,
    ScheduleSummerBreakMainContainer
} from '../ScheduleLayout.styles';

const ScheduleSummerBreakContent = React.lazy(() => import('./ScheduleSummerBreakContent'));

/**
 * Component responsible for generate schedule headers and footers for
 * schedule break (no schedule).
 */
const ScheduleSummerBreak: React.FC = (): JSX.Element => {

    const date = useDate();

    const generateHeaders = STATIC_DAYS.map(day => (
        <ScheduleSummerBreakSingleDayWrapper
            ifActive = {date.day.toLocaleLowerCase() === day.name.toLocaleLowerCase()}
            key = {day.eng}
        >
            {day.name}
        </ScheduleSummerBreakSingleDayWrapper>
    ));

    const generateFooters = STATIC_DAYS.map(day => (
        <ScheduleSingleDayEndingSeparator
            key = {day.eng}
            ifActive = {date.day.toLocaleLowerCase() === day.name.toLocaleLowerCase()}
            ifNonSchedule
        />
    ));

    return (
        <ScheduleSummerBreakMainContainer>
            <ScheduleSummerBreakHeadersWrapper>
                {generateHeaders}
            </ScheduleSummerBreakHeadersWrapper>
            <ScheduleSummerBreakContent/>
            <ScheduleSummerBreakHeadersWrapper ifNonSchedule>
                {generateFooters}
            </ScheduleSummerBreakHeadersWrapper>
        </ScheduleSummerBreakMainContainer>
    );
};

export default ScheduleSummerBreak;