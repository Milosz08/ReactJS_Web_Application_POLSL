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

import { useDispatch } from 'react-redux';
import { PrefActions } from '../../redux/preferencesReduxStore/actions';

import { FRONT_ENDPOINTS } from '../structs/appEndpoints';
import { prefFields } from '../../redux/preferencesReduxStore/types';

/**
 * Constant that defines the time after which routing on the page is to take place (in seconds).
 */
export const ROUTER_INTERVAL_TIME = .7;

/**
 *
 */
const useChangeRoutePath = (): (gotoPath: FRONT_ENDPOINTS | string) => void => {

    const dispatcher = useDispatch();

    return (gotoPath: FRONT_ENDPOINTS | string): void => {
        if (gotoPath !== decodeURIComponent(document.location.pathname)) {
            dispatcher(PrefActions.changeRootPrefField(prefFields.ROUTE_PATH, true));
            setTimeout(() => {
                dispatcher(PrefActions.changeRootPrefField(prefFields.ROUTE_PATH, false));
            }, (ROUTER_INTERVAL_TIME + .3) * 1000);
        }
    };
};

export default useChangeRoutePath;