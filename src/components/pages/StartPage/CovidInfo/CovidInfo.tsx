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

import React, { useContext } from 'react';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../contextStore/MainStoreProvider';

const { covidBlocks, covidInfo, covidInfoBlocks, statusInfo } = require('./CovidInfo.module.scss');

/**
 * Interface defining the type of Covid Risk Sections values.
 */
export interface CovidDataProvider {
    _id: string;
    description: string;
    actualRiskNumber: number;
    __v: number;
}

/**
 * @details Component of the home page informing about the current level of epidemiological threat in the Silesian
 *          University of Technology. Data is downloaded from the main blind.
 */
const CovidInfo = () => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { covidData } = dataFetchFromServer;

    const generateCovidInfos = covidData.map((info: CovidDataProvider) => {
        return (
            <div
                className = {covidBlocks}
                key = {info._id}
            >
                <span>{info.description}:</span>
                <span>{info.actualRiskNumber}</span>
            </div>
        );
    });

    return (
        <div className = {covidInfo}>
            <div className = {statusInfo}>Status zabezpieczeń COVID-19</div>
            <a
                href = "https://covid.polsl.pl/"
                target = "_blank"
                rel = "noreferrer"
            >więcej informacji</a>
            <div className = {covidInfoBlocks}>
                {generateCovidInfos}
            </div>
        </div>
    );
}

export default CovidInfo;