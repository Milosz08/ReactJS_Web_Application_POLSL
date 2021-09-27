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

import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../helpers/request';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { CovidDataProvider } from '../../../StartPage/CovidInfo/CovidInfo';

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { covidPanelsContainer, sectionWrapper, submitCovidForm, unwriteChangesCSS } = require('./Covid19Panel.module.scss');

/**
 * Constant representing the maximum number in the Covid19 danger selection options.
 */
const MAX_RISK_NUMBER: number = 4;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * @details Component that generates a panel with the ability to change Covid 19 threat levels.
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const Covid19Panel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { covidData } = dataFetchFromServer;

    const [ riskLevels, setRiskLevel ] = useState<number[]>(covidData.map((object: CovidDataProvider) => object.actualRiskNumber));
    const [ unwriteChanges, setUnwireChanges ] = useState<boolean>(false);

    const handleOnChangeInput = (id: string, target: EventTarget & HTMLSelectElement): void => {
        const copy: number[] = [ ...riskLevels ];
        const dataCopy: CovidDataProvider[] = [ ...covidData ];
        const findIndex = dataCopy.findIndex((tile: CovidDataProvider) => tile._id === id);
        copy[findIndex] = target === '0' ? 0 : parseInt(target.value);
        dataCopy[findIndex].actualRiskNumber = target === '0' ? 0 : parseInt(target.value);
        setDataFetchFromServer({ ...dataFetchFromServer, covidData: dataCopy })
        setRiskLevel(copy);
        setUnwireChanges(true);
    }

    const handleSubmitChanges = async (): Promise<any> => {
        setUnwireChanges(false);
        await Promise.all(covidData.map(async (object: CovidDataProvider) => {
            await axiosInstance.put(`covid-data/${object._id}`, object);
        }));
    }

    const generateRiskTiles = covidData.map((tile: CovidDataProvider): JSX.Element => {
        const generateOptions = Array.from({ length: MAX_RISK_NUMBER }, (v, s) => s).map(i => (
            <option key = {i}>{i}</option>
        ));

        return (
            <section key = {tile._id}>
                <div className = {sectionWrapper}>
                    <h3>{tile.description}</h3>
                    <select
                        value = {tile.actualRiskNumber}
                        onChange = {({ target }) => handleOnChangeInput(tile._id, target)}
                    >
                        {generateOptions}
                    </select>
                </div>
            </section>
        );
    });

    const toggleClass: string = activeNavElm === 1 ? panelActive : '';

    return (
        <div className = {classnames(panelContainer, toggleClass)}>
            <h2>Edycja paneli poziomów zagrożenia Covid-19</h2>
            <div className = {covidPanelsContainer}>
                {generateRiskTiles}
            </div>
            {unwriteChanges && <p className = {unwriteChangesCSS}>
                Uwaga! Wprowadziłeś zmiany, które nie zostały wysłane na serwer.
            </p>}
            <button
                onClick = {handleSubmitChanges}
                className = {submitCovidForm}
            >Zapisz zmiany
            </button>
        </div>
    );
}

export default Covid19Panel;