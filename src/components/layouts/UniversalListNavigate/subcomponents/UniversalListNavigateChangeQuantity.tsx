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

import { CMS_LIST_QUANTITY_VALUES } from '../../../../helpers/structs/cmsSystem.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { changeCmsListShowingElementsCount } from '../../../../redux/preferencesReduxStore/actions';

import { PropsProviderAndListNavigateContext, UniversalListNavigateContext } from '../UniversalListNavigate';

import {
    UniversalListNaviagteSelect, UniversalListNavigateSingleElement, UniversalListNavigateText
} from '../UniversalListNavigate.styles';

/**
 *
 */
const UniversalListNavigateChangeQuantity: React.FC = (): JSX.Element => {

    const { type } = useContext<Partial<PropsProviderAndListNavigateContext>>(UniversalListNavigateContext);
    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const dispatcher = useDispatch();

    const generateOptions: JSX.Element[] = CMS_LIST_QUANTITY_VALUES.map(quantity => (
        <option key = {quantity}>
            {quantity}
        </option>
    ));

    const handleChangeListElementsQuantity = ({ target }: React.ChangeEvent<HTMLSelectElement>): void => {
        if (currentActivePage[type!].activePage === 1) {
            dispatcher(changeCmsListShowingElementsCount(type!, Number(target.value)));
        }
    };

    return (
        <UniversalListNavigateSingleElement
            ifExtraMargin = {true}
        >
            <UniversalListNavigateText>Elementów na stronie:</UniversalListNavigateText>
            <UniversalListNaviagteSelect
                onChange = {handleChangeListElementsQuantity}
                disabled = {currentActivePage[type!].activePage !== 1}
                ifExtraMargin = {true}
            >
                {generateOptions}
            </UniversalListNaviagteSelect>
        </UniversalListNavigateSingleElement>
    );
};

export default UniversalListNavigateChangeQuantity;