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

import { STATIC_DAYS } from '../../../helpers/structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../redux/apiReduxStore/initialState';

import { ScheduleLayoutContainer, ScheduleLayoutWrapper } from './ScheduleLayout.styles';

const ScheduleSummerBreak = React.lazy(() => import('./subcomponents/ScheduleSummerBreak'));
const ScheduleSingleDayColumn = React.lazy(() => import('./subcomponents/ScheduleSingleDayColumn'));

/**
 * Component responsible for generate all structure for Schedule Layout.
 */
const ScheduleLayout: React.FC = (): JSX.Element => {

    const { currentScheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const noContentActive = Object.values(currentScheduleContent).every(day => day.length === 0);

    const generateAllDaysStructure: JSX.Element[] = STATIC_DAYS.map(day => (
        <ScheduleSingleDayColumn
            key = {day.eng}
            day = {day}
        />
    ));

    const generateContentOrNot: JSX.Element = !noContentActive ? (
        <ScheduleLayoutWrapper>
            {generateAllDaysStructure}
        </ScheduleLayoutWrapper>
    ) : <ScheduleSummerBreak/>;

    return (
        <ScheduleLayoutContainer>
            {generateContentOrNot}
        </ScheduleLayoutContainer>
    );
};

export default ScheduleLayout;