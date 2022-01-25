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
import { RootState } from '../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../redux/apiReduxStore/initialState';
import { CovidWarningsTypes } from '../../../redux/apiReduxStore/dataTypes';

import setColorBasedRiskLevel from './CovidColorsHelper';

import {
    CovidInfoBlocksContainer, CovidInfoContainer, CovidMoreInformations, CovidSingleInfoBlock, CovidSingleInfoDescription,
    CovidSingleInfoRiskNumber, SecurityLevel
} from './CovidInfoSection.styles';


/**
 * Component resposible for fetch data from api (covid warnings) and show all data (covid warning 3 blocks).
 */
const CovidInfoSection: React.FC = (): JSX.Element => {

    const { covidWarningLevels }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { bg, fg } = setColorBasedRiskLevel(covidWarningLevels[0].actualRiskNumber);

    const generateCovidBlocks = covidWarningLevels.map((covidBlock: CovidWarningsTypes) => (
        <CovidSingleInfoBlock
            key = {covidBlock.description}
            $colorValue = {fg}
        >
            <CovidSingleInfoDescription>
                {covidBlock.description}:
            </CovidSingleInfoDescription>
            <CovidSingleInfoRiskNumber>
                {covidBlock.actualRiskNumber}
            </CovidSingleInfoRiskNumber>
        </CovidSingleInfoBlock>
    ));

    return (
        <CovidInfoContainer
            $colorValue = {bg}
        >
            <SecurityLevel
                $colorValue = {fg}
            >
                Status zabezpieczeń COVID-19
            </SecurityLevel>
            <CovidMoreInformations
                href = 'https://covid.polsl.pl/'
                target = '_blank'
                rel = 'noreferrer'
                $colorValue = {fg}
            >
                więcej informacji
            </CovidMoreInformations>
            <CovidInfoBlocksContainer>
                {generateCovidBlocks}
            </CovidInfoBlocksContainer>
        </CovidInfoContainer>
    );
};

export default CovidInfoSection;