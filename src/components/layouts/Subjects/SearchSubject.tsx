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

import React, { Fragment, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubjectsProvider } from './Subjects';

const SubjectsTiles = React.lazy(() => import('./SubjectsTiles'));

const {
    searchSubjectWrapper, removeInputField, subjectsWrapper, emptyIcon, emptySubjectField
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    state: number;
    input: string;
    setInput: Dispatch<SetStateAction<string>>
    setState: Dispatch<SetStateAction<number>>;
    filteredArray: SubjectsProvider[];
}

/**
 * @details Component that generates an item search field and displays the result of the item found. If the item
 *          does not exist (empty array), the component issues a message.
 *
 * @param state { number } - index of the currently displayed subject.
 * @param setState { Dispatch<SetStateAction<number>> } - function that changes the currently displaying subject.
 * @param filteredArray { SubjectsProvider[] } - array of all subjects.
 * @param input { string } - the value entered into the input field.
 * @param setInput { Dispatch<SetStateAction<number>> } - function that updates the value of the input field.
 */
const SearchSubject: React.FC<PropsProvider> = ({ state, setState, filteredArray, input, setInput }): JSX.Element => {

    const ifSubjectExists = filteredArray.length !== 0 ? (
        <div className = {subjectsWrapper}>
            <SubjectsTiles
                state = {state}
                setState = {setState}
                filteredArray = {filteredArray}
            />
        </div>
    ) : (
        <div className = {emptySubjectField}>
            <FontAwesomeIcon
                icon = {[ 'fas', 'exclamation-circle' ]}
                className = {emptyIcon}
            />
            <span>Nie znalazłem szukanego przemiotu.</span>
        </div>
    );

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setState(0);
        setInput(target.value);
    }

    return (
        <Fragment>
            <aside className = {searchSubjectWrapper}>
                <label htmlFor = 'searchSubject'>
                    <input
                        type = 'text'
                        placeholder = 'Wyszukaj przedmiot'
                        value = {input}
                        onChange = {handleInput}
                        id = 'searchSubject'
                    />
                    <button onClick = {() => setInput('')}>
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'trash-alt' ]}
                            className = {removeInputField}
                        />
                    </button>
                </label>
            </aside>
            {ifSubjectExists}
        </Fragment>
    );
}

export default SearchSubject;