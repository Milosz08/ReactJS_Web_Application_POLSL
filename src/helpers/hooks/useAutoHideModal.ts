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

import { useDispatch } from 'react-redux';
import { ReturnedToReducer } from '../../redux/preferencesReduxStore/actions';

/**
 * Custom hook responsible for auto-closed preferences modal, based on listener parameter.
 *
 * @param esimateTime { number } - time to close modal (is seconds).
 * @param callbackDispatcher { (value: boolean) => ReturnedToReducer } - redux reducer function closing modal.
 * @param listener { boolean } - modal redux listener boolean value.
 */
const useAutoHideModal = (esimateTime: number, callbackDispatcher: (value: boolean) => ReturnedToReducer, listener: boolean) => {

    const [ estimate, setEstimate ] = useState<number>(esimateTime);
    const dispatcher = useDispatch();

    useEffect(() => {
        let intervalIndex: NodeJS.Timeout;
        let counter = esimateTime;
        if (listener) {
            const asyncCounting = (): void => {
                setEstimate(counter--);
                if (counter < 0) {
                    dispatcher(callbackDispatcher(false));
                    setEstimate(0);
                    clearInterval(intervalIndex);
                }
            };
            intervalIndex = setInterval(asyncCounting, 1000);
        }
        return () => {
            clearInterval(intervalIndex);
            setTimeout(() => setEstimate(esimateTime), 1000);
        }
    }, [ callbackDispatcher, esimateTime, listener ]);

    return estimate;
};

export default useAutoHideModal;