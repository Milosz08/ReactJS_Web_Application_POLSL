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
import { createContext } from 'react';

import useInputFilter from '../../helpers/hooks/useInputFilter';
import { sortAvailables, sortInputTypes } from '../../redux/apiReduxStore/types';
import { ApiInitialTypes } from '../../redux/apiReduxStore/initialState';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';

export interface SearchingTypes {
    filteredState: any[];
}

interface PropsProvider {
    children: React.ReactNode;
    sortType: sortInputTypes;
    arrayType: sortAvailables;
    sortByType: string;
    ifReversed?: boolean;
}

export const SearchingContext = createContext<Partial<SearchingTypes>>({ });

/**
 * Component responsible for managing search subjects array and distribute this state around children
 * React pseudoDOM components.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 * @param sortType { sortInputTypes } - get input string value from Redux state.
 * @param arrayType { sortAvailables } - specific object from Redux initial state.
 * @param sortByType { string } - based on string key object sorting array list.
 * @param ifReversed { boolean } - flag decided, if initial array should be reversed.
 */
const SearchingProvider: React.FC<PropsProvider> = ({ children, sortType, arrayType, sortByType, ifReversed }): JSX.Element => {

    const initialState: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const filteredState = useInputFilter(initialState[arrayType], sortType, sortByType, Boolean(ifReversed));

    return (
        <SearchingContext.Provider
            value = {{ filteredState }}
        >
            {children}
        </SearchingContext.Provider>
    );
};

export default SearchingProvider;