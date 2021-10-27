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

import apiTypes, { updateSections } from './types';
import { CovidWarningsTypes, FooterFormTypes, LastUpdateTypes } from './dataTypes';

interface ReturnedToReducer {
    type: apiTypes;
    payload?: {
        [name: string]: any;
    };
}

export const addFooterMessage = (footerMessageObject: FooterFormTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_FOOTERFORM_DATA,
    payload: {
        footerMessageObject
    }
});

export const sendFooterMessage = (getfooterMessage: { [value: string]: string }): ReturnedToReducer => ({
    type: apiTypes.SEND_SINGLE_FOOTERFORM_DATA,
    payload: {
        getfooterMessage
    }
});

export const addCovidWarningLevel = (covidWarningLevels: CovidWarningsTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_COVID_DATA,
    payload: {
        covidWarningLevels
    }
});

export const addLastUpdate = (lastUpdate: LastUpdateTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_LAST_UPDATE,
    payload: {
        lastUpdate
    }
});

export const updateSelectedState = (updateStateType: updateSections): ReturnedToReducer => ({
    type: apiTypes.UPDATE_SINGLE_LAST_UPDATE,
    payload: {
        updateStateType
    }
});