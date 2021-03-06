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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../../../redux/apiReduxStore/initialState';

import { CovidCmsPageElementsContainer } from '../CovidCmsPageElements.styles';

const SingleCovidElement = React.lazy(() => import('./SingleCovidElement'));

/**
 * Component responsible for generating all covid warnings blocks elements.
 */
const MultipleCovidElements: React.FC = (): JSX.Element => {

    const { covidWarningLevels }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const generateCovidElements = covidWarningLevels.map(level => (
        <SingleCovidElement
            key = {level._id}
            tile = {level}
        />
    ));

    return (
        <CovidCmsPageElementsContainer>
            {generateCovidElements}
        </CovidCmsPageElementsContainer>
    );
};

export default MultipleCovidElements;