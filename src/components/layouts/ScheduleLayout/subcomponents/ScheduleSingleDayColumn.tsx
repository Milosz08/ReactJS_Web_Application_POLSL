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
import useFilteredSchedule from '../../../../helpers/hooks/useFilteredSchedule';

import { StaticDaysTypes } from '../../../../helpers/structs/schedule.config';

import {
    ScheduleSingleDayColumnContainer, ScheduleSingleDayEndingSeparator, ScheduleSingleDayIndicator
} from '../ScheduleLayout.styles';

import ScheduleSingleDaySingleTile from './ScheduleSingleDaySingleTile';

interface PropsProvider {
    day: StaticDaysTypes;
}

/**
 * Component responsible for generating schedule single day column of tiles.
 *
 * @param day { StaticDaysTypes } - current day.
 */
const ScheduleSingleDayColumn: React.FC<PropsProvider> = ({ day }): JSX.Element => {

    const filteredArray = useFilteredSchedule(day.eng);
    const date = useDate();

    const activeHighlighter: boolean = date.day.toLocaleLowerCase() === day.name.toLocaleLowerCase();

    const generateTiles: JSX.Element[] = filteredArray.map(subject => (
        <ScheduleSingleDaySingleTile
            key = {subject.title}
            tile = {subject}
            ifActive = {activeHighlighter}
        />
    ));

    return (
        <ScheduleSingleDayColumnContainer>
            <ScheduleSingleDayIndicator
                ifActive = {activeHighlighter}
            >
                {day.name}
            </ScheduleSingleDayIndicator>
            {generateTiles}
            <ScheduleSingleDayEndingSeparator
                ifActive = {activeHighlighter}
            />
        </ScheduleSingleDayColumnContainer>
    );
};

export default ScheduleSingleDayColumn;