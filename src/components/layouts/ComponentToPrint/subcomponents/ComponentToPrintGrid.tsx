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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ScheduleContentTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { ALL_GROUPS, STATIC_DAYS } from '../../../../helpers/structs/schedule.config';

import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import {
    ComponentToPrintSeparator, ComponentToPrintTable, ComponentToPrintTd, ComponentToPrintWeekDays
} from '../ComponentToPrint.styles';

/**
 * Component responsible for generating all structure for subjects in schedule to PDF output.
 */
const ComponentToPrintGrid: React.FC = (): JSX.Element => {

    const { scheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const generateSubjectsStructure = () => {
        const { engGroup, normalGroup, skGroup } = chooseGroups;

        const daysAndSubjects = Object.keys(scheduleContent).map(key => scheduleContent[key].filter(prop => {
            if (prop.group.includes(',')) {
                const [ sk, normal ] = prop.group.split(',');
                return sk === skGroup && normal === normalGroup;
            } else {
                return prop.group === engGroup || prop.group === normalGroup || prop.group === ALL_GROUPS
            }
        }).sort((prevH: ScheduleContentTypes, secH: ScheduleContentTypes): number => (
            parseInt(prevH.subjectHours.start.replace(':', '')) - parseInt(secH.subjectHours.start.replace(':', ''))
        )));

        return daysAndSubjects.map((day, idx) => (
            <Fragment key = {idx}>
                {day.map((subject: ScheduleContentTypes, index: number) => (
                    <tr key = {index}>
                        {index === 0 &&
                        <ComponentToPrintWeekDays
                            rowSpan = {day.length}
                        >
                            {STATIC_DAYS[idx].name}
                        </ComponentToPrintWeekDays>}
                        <ComponentToPrintTd>
                            {subject.subjectHours.start} - {subject.subjectHours.end}
                        </ComponentToPrintTd>
                        <ComponentToPrintTd>
                            {subject.title}
                        </ComponentToPrintTd>
                        <ComponentToPrintTd>
                            {subject.subjectInfo.type}, {subject.subjectInfo.room.toLocaleUpperCase()}
                        </ComponentToPrintTd>
                        <ComponentToPrintTd>
                            {subject.subjectInfo.subjectsPze.place}
                        </ComponentToPrintTd>
                    </tr>
                ))}
                <ComponentToPrintSeparator/>
            </Fragment>
        ));
    };

    return (
        <ComponentToPrintTable>
            <tbody>
                {generateSubjectsStructure()}
            </tbody>
        </ComponentToPrintTable>
    );
};

export default ComponentToPrintGrid;