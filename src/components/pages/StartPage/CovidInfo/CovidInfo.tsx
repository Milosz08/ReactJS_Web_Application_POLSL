/**
 * @file ScheduleSections.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
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