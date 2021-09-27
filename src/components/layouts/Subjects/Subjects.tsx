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

import React, { Fragment, useContext, useState } from 'react';
import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const SubjectInfo = React.lazy(() => import('./SubjectInfo'));
const DataLastUpdate = React.lazy(() => import('../DataLastUpdate/DataLastUpdate'));
const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));
const SearchSubject = React.lazy(() => import('./SearchSubject'));

const { scheduleRender } = require('./../../layouts/Navigation/Navigation.module.scss');

/**
 * Interface defining the types of iterate one Subject object fetch from API values.
 */
export interface SubjectsProvider {
    _id: string,
    semesters: string[],
    departments: string[],
    icon: IconProp,
    ifEnd: boolean;
    classesPlatforms: {
        type: string,
        place: string,
        link: string
    }[],
    title: string,
    __v: number
}

/**
 * @details Component that generates an items section on the main page. It includes: a search engine, a list
 *          of items and a window with detailed information about the item.
 */
const Subjects = (): JSX.Element => {

    const [ state, setState ] = useState<number>(0);
    const [ input, setInput ] = useState<string>('');
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    // eslint-disable-next-line array-callback-return
    const filteredArray = dataFetchFromServer!.subjectsData.filter((subject: SubjectsProvider) => {
        if (input === '') {
            return subject;
        } else if (subject.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
            return subject;
        }
    });

    return (
        <Fragment>
            <section className = {scheduleRender}>
                <UniversalHeader
                    iconP = {[ 'fas', 'chalkboard' ]}
                    content = 'Przedmioty'
                    ifCloseButtonVisible = {false}
                />
                <SearchSubject
                    state = {state}
                    setState = {setState}
                    filteredArray = {filteredArray}
                    input = {input}
                    setInput = {setInput}
                />
                <DataLastUpdate
                    dataID = {process.env.REACT_APP_SUBJECTS_ID}
                    content = 'przedmiotów'
                    withoutText = {false}
                />
                <UniversalHeader
                    iconP = {[ 'fas', 'university' ]}
                    content = 'Szczegółowe informacje'
                    ifCloseButtonVisible = {false}
                />
            </section>
            <SubjectInfo
                subjectID = {state}
                filteredArray = {filteredArray}
                state = {state}
                setState = {setState}
            />
        </Fragment>
    );
}

export default Subjects;