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

import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { SubjectsProvider } from './Subjects';

const {
    activeBtn, subjectTile, subjectsIcon, subjectIconWrapper, subjectTitle, subjectInfoBlock
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    filteredArray: SubjectsProvider[];
    state: number;
    setState: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component that generates a list of items in the form of buttons. The props contain an array of items to
 *          generate, the currently displayed item and a function that allows you to change the currently displayed item.
 *
 * @param filteredArray { SubjectsProvider[] } - array storing all subjects
 * @param state { number } - index of the currently displayed subject
 * @param setState { Dispatch<SetStateAction<number>> } - function that allows you to change the subject
 */
const SubjectsTiles: React.FC<PropsProvider> = ({ filteredArray, state, setState }): JSX.Element => {

    const subjectsButtons = filteredArray.map((subject: SubjectsProvider, index: number) => {
        const subjectsButtonActive = index === state ? activeBtn : '';
        return (
            <button
                key = {subject.title}
                onClick = {() => setState(index)}
                className = {subjectTile}
            >
                <div className = {subjectIconWrapper}>
                    <FontAwesomeIcon
                        icon = {subject.icon}
                        className = {subjectsIcon}
                    />
                </div>
                <div className = {subjectTitle}>{subject.title}</div>
                <div className = {classnames(subjectInfoBlock, subjectsButtonActive)}/>
            </button>
        );
    });

    return (
        <Fragment>
            {subjectsButtons}
        </Fragment>
    );
}

export default SubjectsTiles;