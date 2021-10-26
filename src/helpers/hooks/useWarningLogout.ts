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

import { useEffect, useState } from 'react';

import { MODAL_REMAIN_SECONDS } from '../../components/layouts/SessionSequencer/SessionSequencer.config';

/**
 *
 *
 * @param modalListener { boolean } -
 * @param initialValue { number } -
 * @param logoutCallback { () => void } -
 */
const useWarningLogout = (modalListener: boolean, initialValue: number, logoutCallback: () => void): [ number, string ] => {

    const allIcons: string[] = [ 'FaHourglassStart', 'FaHourglassHalf', 'FaHourglassEnd' ]

    const [ timer, setTimer ] = useState<number>(initialValue);
    const [ hourGlassFill, setHourGlassFill ] = useState<string>(allIcons[0]);

    useEffect(() => {
        let intervalIndex: NodeJS.Timeout;
        let hourglassIntervalIndex: NodeJS.Timeout;
        let counter: number = 0;
        let toLogoutCounter: number = MODAL_REMAIN_SECONDS;

        if(modalListener) {
            const hourglassAsyncAnimation = () => {
                if(counter++ !== 3) {
                    setHourGlassFill(allIcons[counter - 1]);
                } else {
                    counter = 0;
                }
            };
            const logOutAsyncCounting = () => {
                if (toLogoutCounter % 5 === 0) {
                    new Audio(`${process.env.PUBLIC_URL}/audio/session-warning.mp3`).play().then(r => r);
                }
                document.title = `Uwaga! Pozostało ${toLogoutCounter} sekund do wylogowania!`;
                setTimer(toLogoutCounter--);
                if (toLogoutCounter < 0) {
                    logoutCallback();
                    setTimer(initialValue);
                    toLogoutCounter = 0;
                    clearInterval(intervalIndex);
                    clearInterval(hourglassIntervalIndex);
                }
            };
            intervalIndex = setInterval(logOutAsyncCounting, 1000);
            hourglassIntervalIndex = setInterval(hourglassAsyncAnimation, 1000);
        }

        return () => {
            clearInterval(intervalIndex);
            clearInterval(hourglassIntervalIndex);
            setTimeout(() => setTimer(initialValue), 1000);
        }
    }, [ logoutCallback, modalListener ]);

    return [ timer, hourGlassFill ];
};

export default useWarningLogout;