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

import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { SubjectsProvider } from './Subjects';

const SubjectLayout = React.lazy(() => import('./SubjectLayout'));

const {
    subInfoContainer, subInfo, animFlexContainer, emptySubjectField, emptyIcon, messageoutEnter,
    messageoutEnterActive, messageoutExit, messageoutExitActive, prevButtonContainer, nextButtonContainer
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    subjectID: number;
    filteredArray: SubjectsProvider[];
    state: number;
    setState: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component that generates information about an item. It only appears on the home page. Possibility to navigate
 *          through items using the right / left arrows. Generates the appropriate item based on the value in props.
 *
 * @param subjectID { number } - index of the generated subject.
 * @param filteredArray { SubjectsProvider } - array with subjects.
 * @param state { number } - currently supported item subject.
 * @param setState { Dispatch<SetStateAction<number>> } - change subject (base on ID value).
 */
const SubjectInfo: React.FC<PropsProvider> = ({ subjectID, filteredArray, state, setState }): JSX.Element => {

    const ifSubjectArrayIsEmpty = filteredArray.length !== 0 ? (
        <SubjectLayout
            subjectID = {subjectID}
            filteredArray = {filteredArray}
        />
    ) : (
        <div className = {emptySubjectField}>
            <FontAwesomeIcon
                icon = {[ 'fas', 'exclamation-circle' ]}
                className = {emptyIcon}
            />
            <span>Nie znalazłem szukanego przedmiotu.</span>
        </div>
    );

    const handlePrevClick = () => {
        if (state === 0) {
            setState(filteredArray.length - 1);
        } else {
            setState(prevState => prevState - 1);
        }
    }

    const handleNextClick = () => {
        if (state === filteredArray.length - 1) {
            setState(0);
        } else {
            setState(prevState => prevState + 1);
        }
    }

    const generatePrevButton = filteredArray.length > 1 ? <button onClick = {handlePrevClick}/> : null;
    const generateNextButton = filteredArray.length > 1 ? <button onClick = {handleNextClick}/> : null;

    return (
        <div className = {subInfoContainer}>
            <div className = {prevButtonContainer}>
                {generatePrevButton}
            </div>
            <div className = {subInfo}>
                <TransitionGroup>
                    <CSSTransition
                        key = {subjectID}
                        timeout = {50}
                        classNames = {{
                            enterActive: messageoutEnter,
                            enterDone: messageoutEnterActive,
                            exitActive: messageoutExit,
                            exitDone: messageoutExitActive,
                        }}
                    >
                        <div className = {animFlexContainer}>
                            {ifSubjectArrayIsEmpty}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <div className = {nextButtonContainer}>
                {generateNextButton}
            </div>
        </div>
    );
}

export default SubjectInfo;