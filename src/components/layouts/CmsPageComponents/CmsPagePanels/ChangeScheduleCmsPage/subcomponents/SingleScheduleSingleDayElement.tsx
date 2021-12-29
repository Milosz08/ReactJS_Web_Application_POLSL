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

import SearchingProvider from '../../../../../../context/searchingContext/SearchingProvider';
import { StaticDaysTypes } from '../../../../../../helpers/structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { sortAvailables, sortInputTypes } from '../../../../../../redux/apiReduxStore/types';
import { PreferencesInitialTypes } from '../../../../../../redux/preferencesReduxStore/initialState';
import { cmsListIndicators, searchInputs, sortingTypes } from '../../../../../../redux/preferencesReduxStore/types';

import { SingleScheduleSingleDayElementContainer } from '../ChangeScheduleCmsPage.styles';

const UniversalSearch = React.lazy(() => import('../../../../UniversalSearch/UniversalSearch'));
const MultipleElementsList = React.lazy(() => import('../../HighOrderComponents/MultipleElementsList'));
const ChangeScheduleSingleListElement = React.lazy(() => import('./ChangeScheduleSingleListElement'));
const ChangeScheduleHeader = React.lazy(() => import('./ChangeScheduleHeader'));

interface PropsProvider {
    day: StaticDaysTypes;
}

/**
 * Component responsible for generating all basic high-order components structure for single day list.
 *
 * @param day { StaticDaysTypes } - used day object.
 */
const SingleScheduleSingleDayElement: React.FC<PropsProvider> = ({ day }): JSX.Element => {

    const { currentActivePage }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    return (
        <SingleScheduleSingleDayElementContainer>
            <SearchingProvider
                sortType = {sortInputTypes.CMS_SCHEDULE_SEARCH}
                arrayType = {sortAvailables.SCHEDULE}
                additionalMark = {day.eng}
                sortByType = 'title'
                ifReversed = {currentActivePage[cmsListIndicators.SCHEDULE].sortingMode === sortingTypes.DECREASE}
            >
                <UniversalSearch
                    type = {searchInputs.CMS_SCHEDULE}
                    placeholder = 'Nazwa przedmiotu'
                />
                <MultipleElementsList
                    inputType = {searchInputs.CMS_SCHEDULE}
                    cmsListIndicator = {cmsListIndicators.SCHEDULE}
                    modalType = {allModals.SCHEDULE_MODAL}
                    buttonNewContent = 'przedmiot'
                    currDay = {day.name}
                    components = {{
                        ListRender: ChangeScheduleSingleListElement,
                        HeaderRender: ChangeScheduleHeader
                    }}
                />
            </SearchingProvider>
        </SingleScheduleSingleDayElementContainer>
    );
};

export default SingleScheduleSingleDayElement;