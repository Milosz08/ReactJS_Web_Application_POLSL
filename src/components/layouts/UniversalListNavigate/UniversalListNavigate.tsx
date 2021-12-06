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
import { createContext } from 'react';

import {
    UniversalListNavigateArrowsContainer, UniversalListNavigateContainer, UniversalListNavigateListElementsCounter
} from './UniversalListNavigate.styles';
import { cmsListIndicators } from '../../../redux/preferencesReduxStore/types';
import { directions } from './subcomponents/UniversalListNavigatePrevNextButton';

const UniversalListNavigatePrevNextButton = React.lazy(() => import('./subcomponents/UniversalListNavigatePrevNextButton'));
const UniversalListNavigateSelectPageInput = React.lazy(() => import('./subcomponents/UniversalListNavigateSelectPageInput'));
const UniversalListNavigateChangeQuantity = React.lazy(() => import('./subcomponents/UniversalListNavigateChangeQuantity'));
const UniversalListNavigateSoringTypes = React.lazy(() => import('./subcomponents/UniversalListNavigateSoringTypes'));

export interface PropsProviderAndListNavigateContext {
    type: cmsListIndicators;
    listItemsLength: number;
    visibilityOnSearch: boolean;
}

export const UniversalListNavigateContext = createContext<Partial<PropsProviderAndListNavigateContext>>({});

/**
 * Component responsible for generating universal navigate buttons used mostly in
 * CMS system array lists for navigate and sorting elements.
 *
 * @param type { cmsListIndicators } - type of array list.
 * @param listItemsLength { number } - length of selected array list.
 * @param visibilityOnSearch { boolean } - if navigate is visible.
 */
const UniversalListNavigate: React.FC<PropsProviderAndListNavigateContext> = ({
    type, listItemsLength, visibilityOnSearch
}): JSX.Element => {

    const { PREV, NEXT } = directions;

    return (
        <>
            {!visibilityOnSearch && <UniversalListNavigateContainer>
                <UniversalListNavigateContext.Provider
                    value = {{
                        type, listItemsLength
                    }}
                >
                    <UniversalListNavigateListElementsCounter>
                        Elementów na liście: <strong>{listItemsLength}</strong>
                    </UniversalListNavigateListElementsCounter>
                    <UniversalListNavigateSoringTypes/>
                    <UniversalListNavigateArrowsContainer>
                        <UniversalListNavigatePrevNextButton
                            dir = {PREV}
                        />
                        <UniversalListNavigateSelectPageInput/>
                        <UniversalListNavigatePrevNextButton
                            dir = {NEXT}
                        />
                    </UniversalListNavigateArrowsContainer>
                    <UniversalListNavigateChangeQuantity/>
                </UniversalListNavigateContext.Provider>
            </UniversalListNavigateContainer>}
        </>
    );
};

export default UniversalListNavigate;