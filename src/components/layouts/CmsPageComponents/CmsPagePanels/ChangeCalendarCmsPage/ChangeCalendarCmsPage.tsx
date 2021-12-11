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

import { allModals } from '../../../../../redux/modalsReduxStore/types';
import { sortAvailables, sortInputTypes } from '../../../../../redux/apiReduxStore/types';
import { cmsListIndicators, searchInputs, sortingTypes } from '../../../../../redux/preferencesReduxStore/types';

import { CmsPageContainer } from '../HighOrderComponents/HighOrderComponents.styles';
import { PreferencesInitialTypes } from '../../../../../redux/preferencesReduxStore/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reduxStore';

const SearchingProvider = React.lazy(() => import('../../../../../context/searchingContext/SearchingProvider'));
const UniversalSearch = React.lazy(() => import('../../../UniversalSearch/UniversalSearch'));
const MultipleElementsList = React.lazy(() => import('../HighOrderComponents/MultipleElementsList'));
const ChangeCalendarSingleListElement = React.lazy(() => import('./subcomponents/ChangeCalendarSingleListElement'));
const ChangeCalendarHeader = React.lazy(() => import('./subcomponents/ChangeCalendarHeader'));

/**
 * Component responsible for generating calendar page basic structure of high order components.
 */
const ChangeCalendarCmsPage: React.FC = (): JSX.Element => {

    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    return (
        <CmsPageContainer>
            <SearchingProvider
                sortType = {sortInputTypes.CMS_CALENDAR_SEARCH}
                arrayType = {sortAvailables.CALENDAR}
                sortByType = 'dateString'
                ifReversed = {currentActivePage[cmsListIndicators.CALENDAR].sortingMode === sortingTypes.DECREASE}
            >
                <UniversalSearch
                    type = {searchInputs.CMS_CALENDAR}
                    placeholder = 'Format: dd/mm/yyyy'
                />
                <MultipleElementsList
                    inputType = {searchInputs.CMS_CALENDAR}
                    cmsListIndicator = {cmsListIndicators.CALENDAR}
                    modalType = {allModals.CALENDAR_MODAL}
                    buttonNewContent = 'wpis'
                    components = {{
                        ListRender: ChangeCalendarSingleListElement,
                        HeaderRender: ChangeCalendarHeader
                    }}
                />
            </SearchingProvider>
        </CmsPageContainer>
    );
};

export default ChangeCalendarCmsPage;