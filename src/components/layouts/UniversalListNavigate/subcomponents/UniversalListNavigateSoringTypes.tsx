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
import { useContext } from 'react';

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/all';
import { PropsProviderAndListNavigateContext, UniversalListNavigateContext } from '../UniversalListNavigate';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { sortingTypes } from '../../../../redux/preferencesReduxStore/types';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { changeUniversalListSortingType } from '../../../../redux/preferencesReduxStore/actions';

import {
    UniversalListNavigateSortingButton, UniversalListNavigateSortingIcons, UniversalListNavigateText
} from '../UniversalListNavigate.styles';

/**
 * Component responsible for generate sorting mode selector button (increase or decrease).
 */
const UniversalListNavigateSoringTypes: React.FC = (): JSX.Element => {

    const { type } = useContext<Partial<PropsProviderAndListNavigateContext>>(UniversalListNavigateContext);
    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const dispatcher = useDispatch();

    const { INCREASE } = sortingTypes;
    const currentSortingMode: sortingTypes = currentActivePage[type!].sortingMode;

    const handleSettingSortingMode = (): void => {
        dispatcher(changeUniversalListSortingType(type!));
    };

    return (
        <UniversalListNavigateSortingButton
            onClick = {handleSettingSortingMode}
        >
            <UniversalListNavigateText>
                Sortowanie {currentSortingMode === INCREASE ? 'rosnące' : 'malejące'}
            </UniversalListNavigateText>
            <UniversalListNavigateSortingIcons>
                 {currentSortingMode === INCREASE ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>}
            </UniversalListNavigateSortingIcons>
        </UniversalListNavigateSortingButton>
    );
};

export default UniversalListNavigateSoringTypes;