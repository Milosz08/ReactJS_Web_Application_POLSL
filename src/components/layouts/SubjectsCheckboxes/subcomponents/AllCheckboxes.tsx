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
import { Fragment, useContext, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { PrefActions } from '../../../../redux/preferencesReduxStore/actions';
import { prefFields, searchInputs } from '../../../../redux/preferencesReduxStore/types';

import { SubjectsTilesContainer } from '../SubjectsCheckboxes.styles';

import SingleSubjectElements from './SingleSubjectElements';
import NotFindContent from '../../NotFindContent/NotFindContent';
import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

/**
 * Component responsible for generate all subjects tiles buttons based on redux state.
 * If content array is empty, component show info component about not find search element.
 */
const AllCheckboxes: React.FC = (): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);

    const dispatcher = useDispatch();

    const subjects = filteredState!.map((el, idx) => (
        <SingleSubjectElements
            key = {idx}
            tile = {el}
            id = {idx}
        />
    ));

    useEffect(() => {
        dispatcher(PrefActions.changeSecondRootPrefField(
            prefFields.SEARCH_INPUTS_ERRORS, searchInputs.SUBJECT_SEARCH, filteredState!.length === 0
        ));
    }, [ dispatcher, filteredState ]);

    return (
        <Fragment>
            <SubjectsTilesContainer>
                {subjects}
            </SubjectsTilesContainer>
            <NotFindContent
                ifVisible = {filteredState!.length === 0}
                content = 'przedmiotu'
            />
        </Fragment>
    );
};

export default AllCheckboxes;