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
import { useContext, useEffect } from 'react';

import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

import { useDispatch } from 'react-redux';
import { searchInputs } from '../../../../redux/preferencesReduxStore/types';
import { setErrorsSearchInputs } from '../../../../redux/preferencesReduxStore/actions';

import { ChangeSubjectsUnorderedList } from '../ChangeSubjectsCmsPage.styles';

const ChangeSubjectsSingleListElement = React.lazy(() => import('./ChangeSubjectsSingleListElement'));
const NotFindContent = React.lazy(() => import('../../NotFindContent/NotFindContent'));

/**
 * Component responsible for generating all filtered subjects list (based context api).
 */
const ChangeSubjectsMultipleListElements: React.FC = (): JSX.Element => {

    const dispatcher = useDispatch();
    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);

    const generateListElements: JSX.Element[] = filteredState!.map((subject, idx) => (
        <ChangeSubjectsSingleListElement
            key = {subject._id}
            element = {subject}
            index = {idx}
        />
    ));

    useEffect(() => {
        dispatcher(setErrorsSearchInputs(searchInputs.CMS_SUBJECTS_SEARCH, filteredState!.length === 0));
    }, [ dispatcher, filteredState ]);

    return (
        <>
            <ChangeSubjectsUnorderedList>
                {generateListElements}
            </ChangeSubjectsUnorderedList>
            <NotFindContent
                ifVisible = {filteredState?.length === 0}
                content = 'przedmiotu'
            />
        </>
    );
};

export default ChangeSubjectsMultipleListElements;