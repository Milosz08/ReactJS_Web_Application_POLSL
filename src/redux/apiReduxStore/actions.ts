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

import apiTypes, { sortAvailables, updateSections } from './types';

import {
    CalendarContentTypes,
    CovidWarningsTypes,
    FooterFormTypes,
    HelpersLinksContentTypes,
    LastUpdateTypes,
    ScheduleContentTypes,
    SubjectsContentTypes
} from './dataTypes';

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

export const addSingleSubject = (singleSubjectData: SubjectsContentTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_SUBJECT_DATA,
    payload: {
        singleSubjectData
    }
});

export const sortingIncomingElmsByName = (...typeElmsArray: sortAvailables[]): ReturnedToReducer => ({
    type: apiTypes.SORT_BY_NAME,
    payload: {
        typeElmsArray
    }
});

export const addSingleScheduleSubject = (singleScheduleSubject: ScheduleContentTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_SCHEDULE_SUBJECT,
    payload: {
        singleScheduleSubject
    }
});

export const addSingleCalendarRecord = (singleCalendarRecord: CalendarContentTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_CALENDAR_RECORD,
    payload: {
        singleCalendarRecord
    }
});

export const sortingIcomingElmsByDate = (...typeElmsArray: sortAvailables[]): ReturnedToReducer => ({
    type: apiTypes.SORT_BY_DATE,
    payload: {
        typeElmsArray
    }
});

export const filteredScheduleSubjects = (normalGroup: string, engGroup: string, skGroup: string): ReturnedToReducer => ({
    type: apiTypes.FILTERED_SCHEDULE_SUBJECTS,
    payload: {
        normalGroup, engGroup, skGroup
    }
});

export const addSingleHelpersLink = (singleHelpersLink: HelpersLinksContentTypes): ReturnedToReducer => ({
    type: apiTypes.GET_SINGLE_HELPERS_LINKS,
    payload: {
        singleHelpersLink
    }
});