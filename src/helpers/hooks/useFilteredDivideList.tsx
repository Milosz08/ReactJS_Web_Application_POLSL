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
import { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';
import { cmsListIndicators, searchInputs } from '../../redux/preferencesReduxStore/types';

import { SearchingContext, SearchingTypes } from '../../context/searchingContext/SearchingProvider';

/**
 *
 *
 * @param searchType { searchInputs } -
 * @param pageType { cmsListIndicators } -
 * @param RenderComponent { any } -
 */
const useFilteredDivideList = (
    searchType: searchInputs, pageType: cmsListIndicators, RenderComponent: any
): [ boolean, (JSX.Element | null)[] ] => {

    const {
        currentActivePage, searchInputs: search
    }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);

    const { activePage, maxShowingElms } = currentActivePage[pageType!];

    const [ disableOnFinding, setDisableOnFinding ] = useState<boolean>(false);

    const generateListElements: (JSX.Element | null)[] = filteredState!.map((element, idx) => (
        !disableOnFinding ? (
            idx >= (activePage - 1) * maxShowingElms && idx < activePage * maxShowingElms ? (
                <RenderComponent
                    key = {element._id}
                    element = {element}
                    index = {idx}
                />
            ) : null
        ) : (
            <RenderComponent
                key = {element._id}
                element = {element}
                index = {idx}
            />
        )
    ));

    useEffect(() => {
        if (search[searchType] === '') {
            setDisableOnFinding(false);
        } else {
            setDisableOnFinding(true);
        }
    }, [ filteredState, search, searchType ]);

    return [ disableOnFinding, generateListElements ];
};

export default useFilteredDivideList;