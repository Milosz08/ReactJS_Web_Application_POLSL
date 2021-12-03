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

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/all';
import { PropsProviderAndListNavigateContext, UniversalListNavigateContext } from '../UniversalListNavigate';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { changeCmsListPageNumber } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { UniversalListNavigateButton } from '../UniversalListNavigate.styles';

export enum directions {
    PREV, NEXT
}

interface PropsProvider {
    dir: directions;
}

/**
 *
 * @param dir { directions } -
 */
const UniversalListNavigatePrevNextButton: React.FC<PropsProvider> = ({ dir }): JSX.Element => {

    const { type, listItemsLength } = useContext<Partial<PropsProviderAndListNavigateContext>>(UniversalListNavigateContext);
    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const { activePage, maxShowingElms } = currentActivePage[type!];
    const countOfSingleList: number = Math.floor(listItemsLength! / maxShowingElms) + 1;

    const dispatcher = useDispatch();

    const handleClickPrevOrNextPage = (): void => {
        dispatcher(changeCmsListPageNumber(type!, activePage, countOfSingleList, dir));
    };

    return (
        <UniversalListNavigateButton
            onClick = {handleClickPrevOrNextPage}
            title = {`${dir === directions.NEXT ? 'Następna' : 'Poprzednia'} strona`}
            disabled = {dir === directions.NEXT ? activePage === countOfSingleList : activePage === 1}
        >
            {dir === directions.PREV ? <AiOutlineArrowLeft/> : <AiOutlineArrowRight/>}
        </UniversalListNavigateButton>
    );
};

export default UniversalListNavigatePrevNextButton;