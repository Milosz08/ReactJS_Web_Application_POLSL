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

import { API_ENDPOINTS } from '../../../../../../helpers/structs/appEndpoints';
import { MAX_RISK_NUMBER } from '../../../../../../helpers/structs/cmsSystem.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { CovidWarningsTypes } from '../../../../../../redux/apiReduxStore/dataTypes';
import { DbNonModalOp } from '../../../../../../redux/apiReduxStore/operationsForNonModals';
import { SessionInitialTypes } from '../../../../../../redux/sessionReduxStore/initialState';
import { apiGetContentFromDB, searchByType, updateSections } from '../../../../../../redux/apiReduxStore/types';

import {
    SingleCovidSectionElement, SingleCovidSectionHeader, SingleCovidSectionWrapper, SingleCovidSelect
} from '../CovidCmsPageElements.styles';

interface PropsProvider {
    tile: CovidWarningsTypes;
}

/**
 * Component responsible for generating single covid warning block structure element.
 *
 * @param tile { CovidWarningsTypes } - single covid warning block object.
 */
const SingleCovidElement: React.FC<PropsProvider> = ({ tile }): JSX.Element => {

    const { headers }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const { _id, description, type } = tile;
    const dispatcher = useDispatch();

    const handleSelectChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(DbNonModalOp.updateLastUpdateField(updateSections.COVID));
        dispatcher(DbNonModalOp.editSingleNonModalElement({
            _id, description, type, actualRiskNumber: Number(target.value)
        }, apiGetContentFromDB.COVID, tile.type, API_ENDPOINTS.COVID_WARNINGS, headers, searchByType.COVID_TYPE));
    };

    const generateSelectOptions = Array.from({ length: MAX_RISK_NUMBER }, (v, s) => s).map(i => (
        <option key = {i}>
            {i}
        </option>
    ));

    return (
        <SingleCovidSectionElement>
            <SingleCovidSectionWrapper>
                <SingleCovidSectionHeader>
                    {tile.description}
                </SingleCovidSectionHeader>
                <SingleCovidSelect
                    value = {tile.actualRiskNumber}
                    onChange = {handleSelectChange}
                >
                    {generateSelectOptions}
                </SingleCovidSelect>
            </SingleCovidSectionWrapper>
        </SingleCovidSectionElement>
    );
};

export default SingleCovidElement;