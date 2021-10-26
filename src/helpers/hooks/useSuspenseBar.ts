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
import { ROUTER_INTERVAL_TIME } from './useChangeRoutePath';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';

/**
 * Custom hook responsible for appearing and populating page load
 * progress bar when routing changes.
 */
const useSuspenseBar = () => {

    const { routePathActive }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const [ widthState, setWidthState ] = useState<number>(0);

    useEffect(() => {
        const asyncCounting = (): void => {
            if (routePathActive) {
                let count: number = 0;
                let index: NodeJS.Timeout;
                const asyncLoadingBar = () => {
                    count++;
                    setWidthState(count);
                    if (count === 100) {
                        clearInterval(index);
                    }
                }
                index = setInterval(asyncLoadingBar, ROUTER_INTERVAL_TIME * 10);
            }
        };
        asyncCounting();
        setWidthState(0);
    }, [ routePathActive ]);

    return [ routePathActive, widthState ];
};

export default useSuspenseBar;