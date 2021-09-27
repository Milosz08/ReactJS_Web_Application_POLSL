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

import React, { Fragment, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DelayLink from 'react-delay-link';
import { v4 as uuidv4 } from 'uuid';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import { SubjectsProvider } from './Subjects';

const {
    classesPlatformsInfo, navButtons, pzeLinks, separator, subDep, subEnd, subjectsDoIt, subjectsIcon,
    subNotEnd, subStatusInfo
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    subjectID: number;
    filteredArray: SubjectsProvider[];
}

/**
 * @details A component that implements the content of the information about the item. The data is retrieved from the database.
 *          The component is rendered only on the home page. The item is generated on the basis of values passed in props
 *          (index ID and an array with items).
 *
 * @param subjectID { number } - schedule index.
 * @param filteredArray { SubjectsProvider[] } - filtered array of schedules (based on input value).
 */
const SubjectsLayout: React.FC<PropsProvider> = ({ subjectID, filteredArray }): JSX.Element => {

    const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const specificSubject = filteredArray[subjectID];
    const classesIfEnd = specificSubject.ifEnd ? 'odbywały' : 'odbywają';

    const multipleDepartment = specificSubject.departments.length !== 1
        ? specificSubject.departments.map((department: string) => <span key = {uuidv4()}>wydział {department}</span>)
        : `wydział ${specificSubject.departments[0]}`;

    const classesPlatforms = specificSubject.classesPlatforms.length !== 1
        ? specificSubject.classesPlatforms.map(platform => ((
                <span key = {platform.type}>
            {`${platform.type} ${classesIfEnd} się poprzed komunikator `}
                    <strong>{`${platform.place}`}</strong>.
         </span>
            ))
        ) : (
            <span>
            {`Zajęcia ${classesIfEnd} się poprzed komunikator `}
                <strong>{`${specificSubject.classesPlatforms[0].place}`}</strong>.
         </span>
        );

    const pzeRefer = specificSubject.classesPlatforms.length !== 1
        ? specificSubject.classesPlatforms.map(platform => (
            <a
                key = {platform.link}
                href = {platform.link}
                className = {pzeLinks}
                target = '_blank'
                rel = 'noreferrer'
            >
                {`Link do PZE (${platform.type})`}
            </a>
        )) : (
            <a
                href = {specificSubject.classesPlatforms[0].link}
                className = {pzeLinks}
                target = '_blank'
                rel = 'noreferrer'
            >
                {`Link do PZE (Wszystkie zajęcia)`}
            </a>
        );

    const subStatus = specificSubject.ifEnd
        ? <span className = {subEnd}>zakończony</span>
        : <span className = {subNotEnd}>w trakcie</span>

    const withoutBlankSpaces = specificSubject.semesters.filter(semester => semester !== '');

    const semestersCount = withoutBlankSpaces.map((semester, i) => {
        const toggleOnEndOfString = i === withoutBlankSpaces.length - 1 ? '.' : ', ';
        return (
            <span key = {uuidv4()}>{`${semester}${toggleOnEndOfString}`}</span>
        )
    });

    return (
        <Fragment>
            <header>przedmiot</header>
            <h2>{filteredArray[subjectID].title}</h2>
            <div className = {subDep}>
                {multipleDepartment}
            </div>
            <aside className = {separator}>
                <span/>
                <FontAwesomeIcon
                    icon = {specificSubject.icon}
                    className = {subjectsIcon}
                />
                <span/>
            </aside>
            <div className = {subStatusInfo}>
                <p>Status przedmiotu: {subStatus}</p>
                <p>Odbywany przez semestr: {semestersCount}</p>
            </div>
            <div className = {classesPlatformsInfo}>
                {classesPlatforms}
            </div>
            <div className = {navButtons}>
                {pzeRefer}
                <DelayLink
                    to = '/warunki-zaliczenia-przedmiotów'
                    delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                    replace = {false}
                    clickAction = {timeoutRoutePath}
                >
                    <a href = {'/warunki-zaliczenia-przedmiotów'} className = {subjectsDoIt}>
                        Warunki zaliczenia przedmiotu
                    </a>
                </DelayLink>
            </div>
        </Fragment>
    );
}

export default SubjectsLayout;