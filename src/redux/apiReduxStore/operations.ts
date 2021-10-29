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

import axiosInstance from '../../helpers/misc/request';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import { addCovidWarningLevel, addFooterMessage, addLastUpdate, addSingleSubject, sortingIncomingElmsByName } from './actions';
import { CovidWarningsTypes, FooterFormTypes, LastUpdateTypes, SubjectsContentTypes } from './dataTypes';
import { sortAvailables } from './types';

const footerEndpoint: string = API_ENDPOINTS.FOOTER_FORM;
const covidEndpoint: string = API_ENDPOINTS.COVID_WARNINGS;
const updateEndpoint: string = API_ENDPOINTS.LAST_UPDATE;
const subjectsEndpoint: string = API_ENDPOINTS.SUBJECTS_ELMS;

/**
 *
 * @param endpoint
 */
const fetchElementFromAPI = async (endpoint: string) => {
    const { data } = await axiosInstance.get(String(endpoint));
    return data;
};

/**
 *
 */
export const getAllFooterFormElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const footerFormMessages = await fetchElementFromAPI(footerEndpoint);
        footerFormMessages.forEach((element: FooterFormTypes) => dispatch(addFooterMessage(element)));
    };
};

/**
 *
 */
export const getAllCovidWarningElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const covidWarningLevels = await fetchElementFromAPI(covidEndpoint);
        covidWarningLevels.forEach((element: CovidWarningsTypes) => dispatch(addCovidWarningLevel(element)));
    };
};

/**
 *
 */
export const getAllLastUpdateElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const lastUpdates = await fetchElementFromAPI(updateEndpoint);
        lastUpdates.forEach((element: LastUpdateTypes) => dispatch(addLastUpdate(element)));
    };
};

/**
 *
 */
export const getAllSubjectsElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const subjects = await fetchElementFromAPI(subjectsEndpoint);
        subjects.forEach((element: SubjectsContentTypes) => dispatch(addSingleSubject(element)));
        dispatch(sortingIncomingElmsByName(sortAvailables.SUBJECTS_STA));
        dispatch(sortingIncomingElmsByName(sortAvailables.SUBJECTS_DYN));
    };
};