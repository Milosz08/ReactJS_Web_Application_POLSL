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
import { useState } from 'react';

import { StaticDaysTypes } from '../../../../../../helpers/structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../../../redux/apiReduxStore/initialState';

import {
    ChangeScheduleSingleDayCount, ChangeScheduleSingleDayElements, ChangeScheduleSingleDayHeader,
    ChangeScheduleSingleDayIcon, ChangeScheduleSingleDayTitle
} from '../ChangeScheduleCmsPage.styles';

const SingleScheduleSingleDayElement = React.lazy(() => import('./SingleScheduleSingleDayElement'));

interface PropsProvider {
    day: StaticDaysTypes;
}

/**
 * Component responsible for generating header structuure and subcomponent with all subjects in selected day.
 *
 * @param day { StaticDaysTypes } - selected day object.
 */
const SingleScheduleDayElements: React.FC<PropsProvider> = ({ day }): JSX.Element => {

    const { scheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const [ open, setOpen ] = useState<boolean>(false);

    const selectedDays = scheduleContent[day.eng];

    const handleChangeVisibitityPanel = (): void => {
        setOpen(prevState => !prevState);
    };

    return (
        <ChangeScheduleSingleDayElements>
            <ChangeScheduleSingleDayHeader
                onClick = {handleChangeVisibitityPanel}
            >
                <ChangeScheduleSingleDayTitle>
                    <ChangeScheduleSingleDayIcon ifActive = {open}/>
                    {day.name}
                </ChangeScheduleSingleDayTitle>
                <ChangeScheduleSingleDayCount>
                    Liczba przedmiotów: {selectedDays.length}
                </ChangeScheduleSingleDayCount>
            </ChangeScheduleSingleDayHeader>
            {open && <SingleScheduleSingleDayElement
                subjectsArray = {selectedDays}
            />}
        </ChangeScheduleSingleDayElements>
    );
};

export default SingleScheduleDayElements;