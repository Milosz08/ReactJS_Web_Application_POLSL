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
const HelpersLinksSingleListElement = React.lazy(() => import('./subcomponents/HelpersLinksSingleListElement'));
const HelpersLinksHeader = React.lazy(() => import('./subcomponents/HelpersLinksHeader'));

/**
 * Component responsible for generating helpersLinks page basic structure of high order components.
 */
const HelpersLinksCmsPage: React.FC = (): JSX.Element => {

    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    return (
        <CmsPageContainer>
            <SearchingProvider
                sortType = {sortInputTypes.CMS_HELPERS_LINKS_SEARCH}
                arrayType = {sortAvailables.HELPERS_LINKS}
                sortByType = 'helperTitle'
                ifReversed = {currentActivePage[cmsListIndicators.HELPERS_LINKS].sortingMode === sortingTypes.DECREASE}
            >
                <UniversalSearch
                    type = {searchInputs.CMS_HELPERS_LINKS}
                    placeholder = 'Tytuł linku'
                />
                <MultipleElementsList
                    inputType = {searchInputs.CMS_HELPERS_LINKS}
                    cmsListIndicator = {cmsListIndicators.HELPERS_LINKS}
                    modalType = {allModals.HELPERS_LINKS_MODAL}
                    buttonNewContent = 'link do pomocy'
                    components = {{
                        ListRender: HelpersLinksSingleListElement,
                        HeaderRender: HelpersLinksHeader
                    }}
                />
            </SearchingProvider>
        </CmsPageContainer>
    );
};

export default HelpersLinksCmsPage;