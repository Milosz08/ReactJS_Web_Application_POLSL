/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reduxStore';
import { sortAvailables, sortInputTypes } from '../../../../../redux/apiReduxStore/types';
import { PreferencesInitialTypes } from '../../../../../redux/preferencesReduxStore/initialState';
import { cmsListIndicators, searchInputs, sortingTypes } from '../../../../../redux/preferencesReduxStore/types';

import { CmsPageContainer } from '../HighOrderComponents/HighOrderComponents.styles';

const SearchingProvider = React.lazy(() => import('../../../../../context/searchingContext/SearchingProvider'));
const UniversalSearch = React.lazy(() => import('../../../../reusable/UniversalSearch/UniversalSearch'));
const MultipleElementsList = React.lazy(() => import('../HighOrderComponents/MultipleElementsList'));
const MessageManagementSingleListElement = React.lazy(() => import('./subcomponents/MessageManagementSingleListElement'));
const MessageManagementHeader = React.lazy(() => import('./subcomponents/MessageManagementHeader'));

/**
 * Component responsible for generating basic structure of cms user messages section.
 */
const MessagesManagementCmsPage: React.FC = (): JSX.Element => {

    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    return (
        <CmsPageContainer>
            <SearchingProvider
                sortType = {sortInputTypes.CMS_USER_MESSAGES_SEARCH}
                arrayType = {sortAvailables.USER_MESSAGES}
                sortByType = 'userChoice'
                ifReversed = {currentActivePage[cmsListIndicators.USER_MESSAGES].sortingMode === sortingTypes.DECREASE}
            >
                <UniversalSearch
                    type = {searchInputs.CMS_USER_MESSAGES}
                    placeholder = 'Typ wiadomości'
                />
                <MultipleElementsList
                    inputType = {searchInputs.CMS_USER_MESSAGES}
                    cmsListIndicator = {cmsListIndicators.USER_MESSAGES}
                    components = {{
                        ListRender: MessageManagementSingleListElement,
                        HeaderRender: MessageManagementHeader
                    }}
                />
            </SearchingProvider>
        </CmsPageContainer>
    );
};

export default MessagesManagementCmsPage;