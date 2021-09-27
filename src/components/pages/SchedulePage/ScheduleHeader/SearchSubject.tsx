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

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ScheduleContext } from '../../../../contextStore/ScheduleProvider';

const { searchSubjectWrapper, removeInputField } = require('./../../../layouts/Subjects/Subjects.module.scss');

/**
 * Komponent generujący pole wyszukiwania przedmiotów na planie. Wartości inputów pobierane z kontekstu.
 */
const SearchSubject = (): JSX.Element => {

    const { inputField, setInputField } = useContext<any>(ScheduleContext);

    return (
        <aside className = {searchSubjectWrapper}>
            <label htmlFor = 'searchSubject'>
                <input
                    type = 'text'
                    placeholder = 'Wyszukaj przedmiot'
                    value = {inputField}
                    onChange = {({ target }) => setInputField(target.value)}
                    id = 'searchSubject'
                />
                <button
                    onClick = {() => setInputField('')}
                    title = 'Wyczyść pole'
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'trash-alt' ]}
                        className = {removeInputField}
                    />
                </button>
            </label>
        </aside>
    );
}

export default SearchSubject;