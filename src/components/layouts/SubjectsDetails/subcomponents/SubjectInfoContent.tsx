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
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { createContext, useContext } from 'react';
import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { SubjectsContentTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { SubjectInfoContentContainer } from '../SubjectsDetails.styles';

import SingleSubjectInfoContent from './SingleSubjectInfoContent';
import NotFindContent from '../../NotFindContent/NotFindContent';

export interface SubjectContextProvider {
    subject: SubjectsContentTypes;
}

export const SubjectContext = createContext<Partial<SubjectContextProvider>>({ });

/**
 * Component responsible for generating and management showing specific subject content.
 */
const SubjectInfoContent: React.FC = (): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);
    const { activeSubjectPanelID }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const subjectObject = filteredState!.find((_, idx) => idx === activeSubjectPanelID);

    const generateSubjectOrNotFound: JSX.Element = Boolean(subjectObject) ? (
        <SingleSubjectInfoContent/>
    ) : (
        <NotFindContent
            ifVisible = {true}
            content = 'przedmiotu'
        />
    );

    return (
        <TransitionGroup
            component = {SubjectInfoContentContainer}
        >
            <CSSTransition
                key = {activeSubjectPanelID}
                timeout = {50}
                classNames = {{
                    enterActive: 'transition-enter',
                    enterDone: 'transition-enter-active',
                    exitActive: 'transition-exit',
                    exitDone: 'transition-exit-active',
                }}
            >
                <SubjectContext.Provider
                    value = {{ subject: subjectObject }}
                >
                    {generateSubjectOrNotFound}
                </SubjectContext.Provider>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default SubjectInfoContent;