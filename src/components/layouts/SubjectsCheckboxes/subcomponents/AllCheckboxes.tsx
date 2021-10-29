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
import { Fragment, useEffect } from 'react';

import useInputFilter from '../../../../helpers/hooks/useInputFilter';

import { RootState } from '../../../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { sortInputTypes } from '../../../../redux/apiReduxStore/types';
import { searchInputs } from '../../../../redux/preferencesReduxStore/types';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { setErrorsSearchInputs } from '../../../../redux/preferencesReduxStore/actions';

import { SubjectsTilesContainer } from '../SubjectsCheckboxes.styles';

import SingleSubjectElements from './SingleSubjectElements';
import NotFindContent from '../../NotFindContent/NotFindContent';

/**
 * Component responsible for generate all subjects tiles buttons based on redux state.
 * If content array is empty, component show info component about not find search element.
 */
const AllCheckboxes: React.FC = (): JSX.Element => {

    const { subjectsContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const dispatcher = useDispatch();
    const subjectsNewState = useInputFilter(subjectsContent, sortInputTypes.SUBJECT_SEARCH);

    const subjects = subjectsNewState.map((el, idx) => (
        <SingleSubjectElements
            key = {idx}
            tile = {el}
            id = {idx}
        />
    ));

    useEffect(() => {
        dispatcher(setErrorsSearchInputs(searchInputs.SUBJECT_SEARCH, subjectsNewState.length === 0));
    }, [ dispatcher, subjectsNewState.length]);

    return (
        <Fragment>
            <SubjectsTilesContainer>
                {subjects}
            </SubjectsTilesContainer>
            <NotFindContent
                ifVisible = {subjectsNewState.length === 0}
                content = 'przedmiotu'
            />
        </Fragment>
    );
};

export default AllCheckboxes;