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

import { useState } from 'react';

import ROUTING_PATH_NAMES from '../structs/routingPathNames';
import ConvertTimeUTC, { DATE_OR_TIME } from '../functionsAndClasses/convertTimeUTC';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { allModals } from '../../redux/modalsReduxStore/types';

/**
 * Reusable Custom hook responsible for custom logic for generate progress bar filled.
 *
 * @param generateCallback { (() => void) | undefined } - callback function run on end clock intervals.
 * @param modalType
 * @param estimateTime { ?number } - counting time value (in seconds).
 * @param content { ?string } - custom browser title.
 * @param restorePathname { ?string } - browser title after reset timer.
 */
const useGenerateLoadingLine = (
    generateCallback: (() => void) | undefined, modalType: allModals | null = null, estimateTime: number = 100,
    content: string = 'Generowanie Planu', restorePathname: string = ROUTING_PATH_NAMES.SCHEDULE_PAGE
) => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const [ date, setDate ] = useState<string>('');
    const [ show, setShow ] = useState<boolean>(false);
    const [ widthState, setWidthState ] = useState<number>(0);

    const reset = (): void => {
        document.title = restorePathname;
        setShow(false);
        setWidthState(0);
    };

    const generatingCounter = (): void => {
        let count: number = 0;
        let index: NodeJS.Timeout;
        const date = new ConvertTimeUTC();
        const asyncLoadingBar = (): void => {
            setWidthState(++count);
            document.title = `${Math.floor(count / estimateTime * 100)}% | ${content}`;
            if (count === estimateTime) {
                clearInterval(index);
                if (generateCallback) {
                    generateCallback();
                    setDate(`${date.getAllDateElms(DATE_OR_TIME.DATE_TYPE)} ${date.getAllDateElms(DATE_OR_TIME.TIME_TYPE)}`);
                }
            }
        }
        if (Boolean(modalType)) {
            if (Object.values(modalsInitialState[modalType!].modalInputErrorsFields!).every(v => !v)) {
                index = setInterval(asyncLoadingBar, 100);
                setShow(true);
            }
        } else {
            index = setInterval(asyncLoadingBar, 100);
            setShow(true);
        }
    };

    return { date, widthState, show, reset, generatingCounter };
};

export default useGenerateLoadingLine;