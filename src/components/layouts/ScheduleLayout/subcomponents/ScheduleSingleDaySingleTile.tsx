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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { ScheduleContentTypes, SubjectsContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import {
    ScheduleSingleDayTileContainer, ScheduleSingleDayTileSubjectHeader, ScheduleSingleDayTileType
} from '../ScheduleLayout.styles';

const ScheduleSingleDaySingleTileSeparator = React.lazy(() => import('./ScheduleSingleDaySingleTileSeparator'));
const ScheduleSingleDayExpandedPanel = React.lazy(() => import('./ScheduleSingleDayExpandedPanel'));

interface PropsProvider {
    tile: ScheduleContentTypes;
    ifActive: boolean;
}

/**
 * Component responsible for generating schedule single tile structure.
 *
 * @param tile { ScheduleContentTypes } - single tile object from DB.
 * @param ifActive { boolean } - flag decide to show/hide.
 */
const ScheduleSingleDaySingleTile: React.FC<PropsProvider> = ({ tile, ifActive }): JSX.Element => {

    const { subjectsContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { searchInputs }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const subject: SubjectsContentTypes | undefined = subjectsContent.find(subject => subject.title === tile.title);

    const titleLower: string = tile.title.toLocaleLowerCase();
    const searchLower: string = searchInputs.scheduleSearch.toLocaleLowerCase();
    const searching: boolean = !titleLower.includes(searchLower) && searchLower !== '';

    return (
        <ScheduleSingleDayTileContainer
            ifActive = {ifActive}
            ifGrayscale = {searching}
        >
            <ScheduleSingleDayTileType>
                {tile.classesInfo.type === 'wykłady' ? 'wykład' : tile.classesInfo.type}
            </ScheduleSingleDayTileType>
            <ScheduleSingleDayTileSubjectHeader>
                {tile.title}
            </ScheduleSingleDayTileSubjectHeader>
            <ScheduleSingleDaySingleTileSeparator
                icon = {tile.icon}
            />
            <ScheduleSingleDayTileSubjectHeader>
                {tile.startHour} - {tile.endHour}
            </ScheduleSingleDayTileSubjectHeader>
            <ScheduleSingleDayExpandedPanel
                tile = {tile}
                subject = {subject}
            />
        </ScheduleSingleDayTileContainer>
    );
};

export default ScheduleSingleDaySingleTile;