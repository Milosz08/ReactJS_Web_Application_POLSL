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

import React, { useContext, useState } from 'react';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';


const SearchBox = React.lazy(() => import('./AdditionalComponents/SearchBox'));
const OneDaySchedule = React.lazy(() => import('./AdditionalComponents/OneDaySchedule'));
const SetScheduleBreak = React.lazy(() => import('./AdditionalComponents/SetScheduleBreak'));

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { scheduleContainer } = require('./SchedulePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * @details Component that generates the panel for managing the schedule in the CMS system.
 *
 * @param activeNavElm { number } - a number indicating the activity of a given element.
 */
const SchedulePanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const [ inputField, setInputField ] = useState<string>('');
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const classToggle = activeNavElm === 3 ? panelActive : '';
    const { scheduleSubjects } = dataFetchFromServer;

    // eslint-disable-next-line array-callback-return
    const filteredAllSubjects = scheduleSubjects.filter((subject: any) => {
        const title = subject.title.toLocaleLowerCase();
        const type = subject.type.toLocaleLowerCase();
        const start = subject.start.toLocaleLowerCase();
        const end = subject.end.toLocaleLowerCase();
        const input = inputField.toLocaleLowerCase();
        if (inputField === '') {
            return subject;
        } else if (title.includes(input) || type.includes(input) || start.includes(input) || end.includes(input)) {
            return subject;
        }
    });

    // const generateFullDaysStructure = STATIC_DAYS.map((day: string) => (
    //     <OneDaySchedule
    //         key = {day}
    //         dayStr = {day}
    //         filteredAllSubjects = {filteredAllSubjects}
    //     />
    // ));

    return (
        <div className = {classnames(panelContainer, scheduleContainer, classToggle)}>
            <h2>Dodawanie, Usuwanie i Modyfikowanie przedmiotów planu zajęć</h2>
            <SearchBox
                inputField = {inputField}
                setInputField = {setInputField}
                placeholderProp = 'Nazwa/typ/godzina'
            />
            {/*{generateFullDaysStructure}*/}
            <SetScheduleBreak/>
        </div>
    );
}

export default SchedulePanel;