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
import generateID from '../../../helpers/functionsAndClasses/generateID';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../redux/apiReduxStore/initialState';

import { ScheduleLayoutContainer, ScheduleLayoutWrapper } from './ScheduleLayout.styles';

import ScheduleSummerBreak from './subcomponents/ScheduleSummerBreak';
import ScheduleSingleDayColumn from './subcomponents/ScheduleSingleDayColumn';

/**
 * Component responsible for generate all structure for Schedule Layout.
 */
const ScheduleLayout: React.FC = (): JSX.Element => {

    const { summerBreakActive }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const generateAllDaysStructure: JSX.Element[] = STATIC_DAYS.map(day => (
        <ScheduleSingleDayColumn
            key = {generateID()}
            day = {day}
        />
    ));

    const generateSummerOrNotContent = summerBreakActive ? (
        <ScheduleSummerBreak/>
    ) : (
        <ScheduleLayoutWrapper>
            {generateAllDaysStructure}
        </ScheduleLayoutWrapper>
    );

    return (
        <ScheduleLayoutContainer>
            {generateSummerOrNotContent}
        </ScheduleLayoutContainer>
    );
};

export default ScheduleLayout;