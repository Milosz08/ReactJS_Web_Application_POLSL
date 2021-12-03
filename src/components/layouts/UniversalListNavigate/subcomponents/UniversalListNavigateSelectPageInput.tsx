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
import { useContext, useEffect } from 'react';

import useIsMount from '../../../../helpers/hooks/useIsMount';
import useMultipleRef from '../../../../helpers/hooks/useMultipleRef';

import { PropsProviderAndListNavigateContext, UniversalListNavigateContext } from '../UniversalListNavigate';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { changeCmsListPageNumber } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

/**
 *
 */
const UniversalListNavigateSelectPageInput: React.FC = (): JSX.Element => {

    const { type, listItemsLength } = useContext<Partial<PropsProviderAndListNavigateContext>>(UniversalListNavigateContext);
    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const dispatcher = useDispatch();
    const [ grabber ] = useMultipleRef(1);
    const isMount = useIsMount();

    const { maxShowingElms } = currentActivePage[type!];
    const countOfSingleList: number = Math.floor(listItemsLength! / maxShowingElms) + 1;

    const generateOptions = Array.from({ length: countOfSingleList }).map((_, idx) => (
        <option key = {idx}>
            {idx + 1}
        </option>
    ));

    const handleSelectCurrentPage = ({ target }: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatcher(changeCmsListPageNumber(type!, Number(target.value), countOfSingleList));
    };

    useEffect(() => {
        if (!isMount) {
            grabber.current.value = currentActivePage[type!].activePage;
        }
    }, [ currentActivePage, grabber, isMount, type ]);

    return (
        <div>
            Strona
            <select
                onChange = {handleSelectCurrentPage}
                ref = {grabber}
            >
                {generateOptions}
            </select>
             z {countOfSingleList}
        </div>
    );
};

export default UniversalListNavigateSelectPageInput;