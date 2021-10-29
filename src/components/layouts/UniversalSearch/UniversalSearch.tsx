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
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/reduxStore';
import { searchInputs } from '../../../redux/preferencesReduxStore/types';
import { insertInSearchInput } from '../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../redux/preferencesReduxStore/initialState';

import {
    CleanInputButton, CleanInputButtonIconWrapper, TrashAlIconStyles, UniversalSearchContainer, UniversalSearchInput,
    UniversalSearchLabel
} from './UniversalSearch.styles';

interface PropsProvider {
    type: searchInputs;
    placeholder: string;
    filterReducer?: (filterCrit: string) => any;
}

/**
 * Component responsible for generate universal search input. This components is connected with
 * react redux state management and has erorrs handling.
 *
 * @param type { searchInputs } - search input type (enum).
 * @param placeholder { string } - aria label text value.
 * @param filterReducer { ?(filterCrit: string) => any } - callback function from custom hook to filtered elements.
 */
const UniversalSearch: React.FC<PropsProvider> = ({ type, placeholder, filterReducer }): JSX.Element => {

    const dispatcher = useDispatch();

    const { searchInputs: inp, searchInputsErrors }: PreferencesInitialTypes = useSelector((state: RootState) => (
        state.preferencesReducer
    ));

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(insertInSearchInput(type, target.value));
        if (Boolean(filterReducer)) {
            dispatcher(filterReducer!(target.value));
        }
    };

    const handleClearInput = () => {
        dispatcher(insertInSearchInput(type, ''));
        if (Boolean(filterReducer)) {
            dispatcher(filterReducer!(''));
        }
    };

    return (
        <UniversalSearchContainer>
            <UniversalSearchLabel>
                <UniversalSearchInput
                    type = 'text'
                    placeholder = {placeholder}
                    value = {inp[type]}
                    onChange = {handleInput}
                    ifError = {searchInputsErrors[type]}
                />
                <CleanInputButton
                    onClick = {handleClearInput}
                    title = 'Wyczyść pole wyszukiwania'
                >
                    <CleanInputButtonIconWrapper>
                        <TrashAlIconStyles
                            $ifError = {searchInputsErrors[type]}
                        />
                    </CleanInputButtonIconWrapper>
                </CleanInputButton>
            </UniversalSearchLabel>
        </UniversalSearchContainer>
    );
};

export default UniversalSearch;