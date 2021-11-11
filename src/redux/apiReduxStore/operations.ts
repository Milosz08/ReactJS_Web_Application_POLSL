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
import GROUPS_STATIC from '../../helpers/structs/allGroups';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import {
    addCovidWarningLevel, addFooterMessage, addLastUpdate, addSingleCalendarRecord, addSingleScheduleSubject,
    addSingleSubject, filteredScheduleSubjects, sortingIcomingElmsByDate, sortingIncomingElmsByName
} from './actions';

import {
    CalendarContentTypes, CovidWarningsTypes, FooterFormTypes, LastUpdateTypes, ScheduleContentTypes, SubjectsContentTypes
} from './dataTypes';

import { sortAvailables } from './types';
import { decrypt } from 'react-crypt-gsm';

const footerEndpoint: string = API_ENDPOINTS.FOOTER_FORM;
const covidEndpoint: string = API_ENDPOINTS.COVID_WARNINGS;
const updateEndpoint: string = API_ENDPOINTS.LAST_UPDATE;
const subjectsEndpoint: string = API_ENDPOINTS.SUBJECTS_ELMS;
const scheduleEndpoint: string = API_ENDPOINTS.SCHEDULE_SUBJECTS;
const calendarEndpoint: string = API_ENDPOINTS.CALENDAR_RECORDS;

/**
 *
 *
 * @param endpoint
 */
const fetchElementFromAPI = async (endpoint: string) => {
    const { data } = await axiosInstance.get(String(endpoint));
    return data;
};

export const getAllFooterFormElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const footerFormMessages = await fetchElementFromAPI(footerEndpoint);
        footerFormMessages.forEach((element: FooterFormTypes) => dispatch(addFooterMessage(element)));
    };
};

export const getAllCovidWarningElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const covidWarningLevels = await fetchElementFromAPI(covidEndpoint);
        covidWarningLevels.forEach((element: CovidWarningsTypes) => dispatch(addCovidWarningLevel(element)));
    };
};

export const getAllLastUpdateElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const lastUpdates = await fetchElementFromAPI(updateEndpoint);
        lastUpdates.forEach((element: LastUpdateTypes) => dispatch(addLastUpdate(element)));
    };
};

export const getAllSubjectsElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const subjects = await fetchElementFromAPI(subjectsEndpoint);
        subjects.forEach((element: SubjectsContentTypes) => dispatch(addSingleSubject(element)));
        dispatch(sortingIncomingElmsByName(sortAvailables.SUBJECTS));
    };
};

export const getAllScheduleElements = (groupCookies: any) => {
    return async (dispatch: (prop: any) => void) => {
        const scheduleSubjects = await fetchElementFromAPI(scheduleEndpoint);
        scheduleSubjects.forEach((element: ScheduleContentTypes) => dispatch(addSingleScheduleSubject(element)));
        const cookieDecryptData = ({ content, tag }: any) => (
            decrypt({ content, tag: new Uint8Array(tag.data) })
        );
        if(Boolean(groupCookies)) {
            const [ normal, eng, sk ] = cookieDecryptData(groupCookies).split(',');
            dispatch(filteredScheduleSubjects(normal, eng, sk));
        } else {
            const { NORMAL_GROUPS, ENG_GROUPS, SK_GROUPS } = GROUPS_STATIC;
            dispatch(filteredScheduleSubjects(NORMAL_GROUPS[0], ENG_GROUPS[0], SK_GROUPS[0]));
        }
    };
};

export const getAllCalendarElements = () => {
    return async (dispatch: (prop: any) => void) => {
        const calendar = await fetchElementFromAPI(calendarEndpoint);
        calendar.forEach((element: CalendarContentTypes) => dispatch(addSingleCalendarRecord(element)));
        dispatch(sortingIcomingElmsByDate(sortAvailables.CALENDAR));
    };
};