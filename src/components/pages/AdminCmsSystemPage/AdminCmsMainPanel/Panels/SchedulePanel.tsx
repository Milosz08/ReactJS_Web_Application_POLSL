/**
 * @file SchedulePanel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/24/2021
 */

import React, { useContext, useState } from 'react';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { SubjectsProvider } from '../../../../layouts/Subjects/Subjects';

import { STATIC_DAYS } from '../../../SchedulePage/SchedulePage';

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
    const filteredAllSubjects = scheduleSubjects.filter((subject: any): SubjectsProvider | undefined => {
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

    const generateFullDaysStructure = STATIC_DAYS.map((day: string) => (
        <OneDaySchedule
            key = {day}
            dayStr = {day}
            filteredAllSubjects = {filteredAllSubjects}
        />
    ));

    return (
        <div className = {classnames(panelContainer, scheduleContainer, classToggle)}>
            <h2>Dodawanie, Usuwanie i Modyfikowanie przedmiotów planu zajęć</h2>
            <SearchBox
                inputField = {inputField}
                setInputField = {setInputField}
                placeholderProp = 'Nazwa/typ/godzina'
            />
            {generateFullDaysStructure}
            <SetScheduleBreak/>
        </div>
    );
}

export default SchedulePanel;