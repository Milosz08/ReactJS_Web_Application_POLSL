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

import { MAX_RISK_NUMBER } from '../../../../helpers/structs/cmsSystem.config';

import { useDispatch } from 'react-redux';
import { CovidWarningsTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { updateCovidSingleElement } from '../../../../redux/apiReduxStore/actions';

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

    const dispatcher = useDispatch();

    const handleSelectChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(updateCovidSingleElement(tile.type, Number(target.value)));
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