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

import { searchInputs } from '../../../redux/preferencesReduxStore/types';
import { sortAvailables, sortInputTypes } from '../../../redux/apiReduxStore/types';

import { ChangeSubjectsCmsPageContainer } from './ChangeSubjectsCmsPage.styles';

const UniversalSearch = React.lazy(() => import('../UniversalSearch/UniversalSearch'));
const ChangeSubjectsMultipleListElements = React.lazy(() => import('./subcomponents/ChangeSubjectsMultipleListElements'));
const SearchingProvider = React.lazy(() => import('../../../context/searchingContext/SearchingProvider'));

/**
 * Component responsible for generating basic structure of cms subjects section.
 */
const ChangeSubjectsCmsPage: React.FC = (): JSX.Element => (
    <ChangeSubjectsCmsPageContainer>
        <SearchingProvider
            sortType = {sortInputTypes.CMS_SUBJECT_SEARCH}
            arrayType = {sortAvailables.SUBJECTS}
        >
            <UniversalSearch
                type = {searchInputs.CMS_SUBJECTS_SEARCH}
                placeholder = 'Nazwa przedmiotu'
            />
            <ChangeSubjectsMultipleListElements/>
        </SearchingProvider>
    </ChangeSubjectsCmsPageContainer>
);

export default ChangeSubjectsCmsPage;