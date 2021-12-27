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

import { ComponentToPrintDates, ComponentToPrintRow, ComponentToPrintHeader } from '../ComponentToPrint.styles';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { updateSections } from '../../../../redux/apiReduxStore/types';
import { LastUpdateTypes } from '../../../../redux/apiReduxStore/dataTypes';

import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

interface PropsProvider {
    date: string;
}

/**
 * Component responsible for generating header info content (group and date) in PDF.
 *
 * @param date { string } - current date.
 */
const ComponentToPrintHeaderData: React.FC<PropsProvider> = ({ date }): JSX.Element => {

    const { lastUpdate }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const scheduleUpdate: LastUpdateTypes | undefined = lastUpdate.find(el => el.updateDateFor === updateSections.SCHEDULE);
    const group: string = chooseGroups.normalGroup === 'pierwsza' ? 'I' : 'II';

    const { fullDate, fullTime } = scheduleUpdate!.servletTime;

    const [ , month, year ]: string[] = fullDate.split('/');

    const genData = (): { semNr: number, semType: string } => {
        const semester = Number(year) - (START_YEAR - 1);
        if(Number(month) >= 2 && Number(month) <= 10) {
            return { semNr: semester, semType: 'letni' }
        } else {
            return { semNr: semester + 1, semType: 'zimowy' }
        }
    };

    return (
        <ComponentToPrintHeader>
            <ComponentToPrintRow>
                Plan zajęć - I S1 {genData().semNr}/{group}, semestr {genData().semType}, rok {year}
            </ComponentToPrintRow>
            <ComponentToPrintDates>
                <span>Wygenerowano dnia: {date}</span>
                <span>Aktualizacja planu: {fullDate}, {fullTime}</span>
            </ComponentToPrintDates>
        </ComponentToPrintHeader>
    );
};

/**
 *
 */
const START_YEAR: number = 2020;

export default ComponentToPrintHeaderData;