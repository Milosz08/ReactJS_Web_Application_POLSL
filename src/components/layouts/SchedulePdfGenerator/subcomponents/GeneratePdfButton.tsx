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
import { Fragment, useRef } from 'react';

import useGeneratePdfLine from '../../../../helpers/hooks/useGenerateLoadingLine';
import { useReactToPrint } from 'react-to-print';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';

import { SchedulePdfButtonGenerator, SchedulePdfInfoText } from '../SchedulePdfGenerator.styles';

const GeneratePdfComponent = React.lazy(() => import('./GeneratePdfComponent'));
const EstimateTimeCounterBar = React.lazy(() => import('../../EstimateTimeCounterBar/EstimateTimeCounterBar'));

/**
 * Component responsible for generating button, which generate pdf schedule
 * and aside text with progress bar line.
 */
const GeneratePdfButton: React.FC = (): JSX.Element => {

    const { currentScheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const componentRef: React.MutableRefObject<any> = useRef<HTMLElement>();

    const emptySch: boolean = Object.values(currentScheduleContent).every(day => day.length === 0);

    const handlePrint: (() => void) | undefined = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'PDF | Plan Zajęć',
        onAfterPrint: () => reset(),
    });

    const { date, widthState, show, reset, generatingCounter } = useGeneratePdfLine(handlePrint);

    return (
        <Fragment>
            <SchedulePdfButtonGenerator
                onClick = {generatingCounter}
                disabled = {emptySch}
                title = {emptySch ? 'Wygenerowanie pustego planu zajęć nie jest możliwe' : 'Wygeneruj plan zajęć w formie PDF'}
            >
                Wygeneruj plan w formie pliku PDF
            </SchedulePdfButtonGenerator>
            <SchedulePdfInfoText>
                Generowanie planu zajmuje średnio 10 sekund (zależne od ilości przedmiotów w bazie danych).
            </SchedulePdfInfoText>
            <GeneratePdfComponent
                grabber = {componentRef}
                date = {date}
            />
            <EstimateTimeCounterBar
                visibility = {show}
                width = {widthState}
            />
        </Fragment>
    );
};

export default GeneratePdfButton;