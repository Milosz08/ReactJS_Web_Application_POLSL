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
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { ActualDateContext, ActualDateTypes } from '../../../contextStore/ActualDateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';
import { ScheduleContext, ScheduleType } from '../../../contextStore/ScheduleProvider';

import GROUPS_STATIC from '../../../constants/allGroups';

const ExpandedPanel = React.lazy(() => import('./ExpandedPanel'));

const {
    scheduleSection, dayOfWeekCSS, active, scheduleTile, subjectType, subjectImportant, endLineOfSection,
    separator, subjectIcon, disactiveTile, subjectActive
} = require('./ScheduleSections.module.scss');

/**
 * Interface defining the type of Subjects tiles in schedule values.
 */
export interface ScheduleSubjectsProvider {
    _id: string,
    title: string,
    group: string,
    day: string,
    type: string,
    start: string,
    end: string,
    pzeInfo: {
        platform: string,
        pzeLink: string
    }
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    dayOfWeek: string;
}

/**
 * @details Component Rendering Grid Class Plan. Data are downloaded from a global context (backend capture via API).
 *          RE-RERENDER OF THE COMPONENT AT EQ CHANGE OF THE USER PREFERENCE.
 *
 * @param dayOfWeek { string } - current day of the week.
 */
const ScheduleSections: React.FC<PropsProvider> = ({ dayOfWeek }): JSX.Element => {

    const { date } = useContext<Partial<ActualDateTypes>>(ActualDateContext);
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { groupSelected, engSelected, inputField } = useContext<Partial<ScheduleType>>(ScheduleContext);

    const [ filteredArray, setFilteredArray ] = useState<ScheduleSubjectsProvider[]>([]);

    const { dayStr } = date!;
    const { scheduleSubjects } = dataFetchFromServer;
    const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

    const ifActive: string = dayStr.toLocaleLowerCase() === dayOfWeek.toLocaleLowerCase() ? active : '';

    useEffect(() => {
        const returFilteredArray = (engGroup: string, normalGroup: string): ScheduleSubjectsProvider[] => (
            scheduleSubjects.filter((object: ScheduleSubjectsProvider) => (
                    object.group === engGroup || object.group === normalGroup || object.group === 'all'
                )
            ));

        const englishGroup = (normalGroup: string): void => {
            setFilteredArray(returFilteredArray(normalGroup, engSelected!));
        }

        switch (groupSelected) {
            case NORMAL_GROUPS[0].text:
                englishGroup(NORMAL_GROUPS[0].field);
                break;
            case NORMAL_GROUPS[1].text:
                englishGroup(NORMAL_GROUPS[1].field);
                break;
            default:
                throw new Error('Selected group not exist!');
        }

    }, [ groupSelected, engSelected, NORMAL_GROUPS, scheduleSubjects, ENG_GROUPS, inputField ]);

    const filteredSubjects = filteredArray.filter((subject: ScheduleSubjectsProvider): boolean => (
        subject.day.toLocaleLowerCase() === dayOfWeek.toLocaleLowerCase()
    ));

    filteredSubjects.sort((prevH: ScheduleSubjectsProvider, secH: ScheduleSubjectsProvider): number => (
        parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
    ));

    const generateOneColumnOfTile = filteredSubjects.map((tile: ScheduleSubjectsProvider) => {
        const title = tile.title.toLowerCase();
        const startHour = parseInt(tile.start.replace(':', ''));
        const endHour = parseInt(tile.end.replace(':', ''));
        const tileDay = tile.day.toLocaleLowerCase();
        const actualDay = date!.dayStr.toLocaleLowerCase();

        const filterOneSubject = dataFetchFromServer.subjectsData.filter((subject: ScheduleSubjectsProvider) => (
            subject.title.toLocaleLowerCase() === title
        ));

        const searchActive = title.includes(inputField!.toLowerCase()) || !inputField ? '' : disactiveTile;
        const activeHour = (startHour < date!.time && endHour > date!.time) && tileDay === actualDay
            ? subjectActive : '';

        return (
            filterOneSubject[0] &&
            <div className = {classnames(scheduleTile, activeHour, searchActive)} key = {uuidv4()}>
                <p className = {subjectType}>{tile.type}</p>
                <h2 className = {subjectImportant}>{tile.title}</h2>
                <div className = {separator}>
                    <span/>
                    <FontAwesomeIcon
                        icon = {[ filterOneSubject[0].icon[0], filterOneSubject[0].icon[1] ]}
                        className = {subjectIcon}
                    />
                    <span/>
                </div>
                <h2 className = {subjectImportant}>{tile.start} - {tile.end}</h2>
                <ExpandedPanel
                    tile = {tile}
                    subjectObj = {filterOneSubject[0]}
                />
            </div>
        );
    });

    return (
        <div className = {scheduleSection}>
            <header className = {classnames(dayOfWeekCSS, ifActive)}>
                {dayOfWeek}
            </header>
            {generateOneColumnOfTile}
            <aside className = {classnames(endLineOfSection, ifActive)}/>
        </div>
    );
}

export default ScheduleSections;