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

import apiTypes from './types';

import { apiInitialState } from './initialState';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import axiosInstance from '../../helpers/misc/request';
import { CurrentScheduleContentTypes } from './dataTypes';
import CryptoJS, { AES } from 'crypto-js';
import { FOOTER_OPTIONS } from '../../helpers/structs/footerOptions.config';

const {
    GET_SINGLE_FOOTERFORM_DATA, SEND_SINGLE_FOOTERFORM_DATA, GET_SINGLE_COVID_DATA, GET_SINGLE_LAST_UPDATE, SORT_BY_DATE,
    GET_SINGLE_SUBJECT_DATA, SORT_BY_NAME, GET_SINGLE_SCHEDULE_SUBJECT, GET_SINGLE_CALENDAR_RECORD, FILTERED_SCHEDULE_SUBJECTS,
    GET_SINGLE_HELPERS_LINKS, UPDATE_COVID_DATA, UPDATE_CREDENTIALS, UPDATE_ELEMENTS_DATE, REMOVING_CMS_CONTENT
} = apiTypes;

const apiReducer = (state = apiInitialState, action: any) => {
    switch (action.type) {

        case GET_SINGLE_FOOTERFORM_DATA: {
            const { footerMessageObject } = action.payload;
            const decryptedData = {
                _id: footerMessageObject._id,
                ifClicked: footerMessageObject.ifClicked,
                userIdentity: CryptoJS.enc.Utf8.stringify(AES.decrypt(footerMessageObject.userIdentity, '')),
                userMessage: CryptoJS.enc.Utf8.stringify(AES.decrypt(footerMessageObject.userMessage, '')),
                userChoice: FOOTER_OPTIONS.find(option => option.value === footerMessageObject.userChoice)!.name,
                servletTime: footerMessageObject.servletTime,
            };
            return { ...state, footerFormMessages: [ ...state.footerFormMessages, decryptedData ] };
        }

        case SEND_SINGLE_FOOTERFORM_DATA: {
            const { getfooterMessage } = action.payload;
            const postData = async (): Promise<any> => {
                const { userNickname: userIdentity, userMessage, typeOfMessage: userChoice } = getfooterMessage;
                const sendObjectEncrypted = {
                    userIdentity: AES.encrypt(userIdentity, '').toString(),
                    userChoice,
                    userMessage: AES.encrypt(userMessage, '').toString(),
                };
                const { data } = await axiosInstance.post(API_ENDPOINTS.FOOTER_FORM, sendObjectEncrypted);
                state.footerFormMessages.push({
                    ...data,
                    userIdentity: CryptoJS.enc.Utf8.stringify(AES.decrypt(data.userIdentity, '')),
                    userMessage: CryptoJS.enc.Utf8.stringify(AES.decrypt(data.userMessage, '')),
                    userChoice: FOOTER_OPTIONS.find(option => option.value === data.userChoice)!.name
                });
            };
            postData();
            return state;
        }

        case GET_SINGLE_COVID_DATA: {
            const { covidWarningLevels } = action.payload;
            if (state.covidWarningLevels.length === 3) {
                return state;
            }
            return { ...state, covidWarningLevels: [ ...state.covidWarningLevels, covidWarningLevels ] };
        }

        case GET_SINGLE_LAST_UPDATE: {
            const { lastUpdate } = action.payload;
            return { ...state, lastUpdate: [ ...state.lastUpdate, lastUpdate ] };
        }

        case GET_SINGLE_SUBJECT_DATA: {
            const { singleSubjectData } = action.payload;
            return { ...state, subjectsContent: [ ...state.subjectsContent, singleSubjectData ] };
        }

        case SORT_BY_NAME: {
            const { typeElmsArray } = action.payload;
            typeElmsArray.forEach((el: any) => {
                state[el].sort((a: any, b: any) => a.title.localeCompare(b.title));
            });
            return state;
        }

        case GET_SINGLE_SCHEDULE_SUBJECT: {
            const { singleScheduleSubject } = action.payload;
            const insertingSubjects = state.scheduleContent;
            Object.keys(state.scheduleContent).forEach((key: string, idx: number) => {
                if (idx === singleScheduleSubject.day) {
                    insertingSubjects[key].push(singleScheduleSubject);
                    return;
                }
            });
            return { ...state, scheduleContent: insertingSubjects };
        }

        case GET_SINGLE_CALENDAR_RECORD: {
            const { singleCalendarRecord } = action.payload;
            return { ...state, calendarContent: [ ...state.calendarContent, singleCalendarRecord ] };
        }

        case SORT_BY_DATE: {
            const { typeElmsArray } = action.payload;
            state[typeElmsArray]
                .sort((a: any, b: any) => a.day - b.day)
                .sort((a: any, b: any) => a.month - b.month)
                .sort((a: any, b: any) => a.year - b.year);
            return state;
        }

        case FILTERED_SCHEDULE_SUBJECTS: {
            const { normalGroup, engGroup, skGroup } = action.payload;
            const normalAndSkGroup = `${skGroup},${normalGroup}`;
            let middlewareObject: { [value: string]: CurrentScheduleContentTypes[] } = {
                monday: [], tuesday: [], wednesday: [], thursday: [], friday: []
            };
            Object.keys(state.scheduleContent).forEach(day => {
                const middlewareArray = state.scheduleContent[day].filter(el => (
                    el.group === normalAndSkGroup || el.group === normalGroup|| el.group === engGroup || el.group === 'wszyscy'
                ));
                middlewareArray.forEach(el => {
                    const [ hourStart, minuteStart ] = el.subjectHours.start.split(':');
                    const [ hourEnd, minuteEnd ] = el.subjectHours.end.split(':');
                    middlewareObject[day].push({
                        title: el.title,
                        type: el.subjectInfo.type,
                        place: el.subjectInfo.subjectsPze.place,
                        room: el.subjectInfo.room,
                        pzeLink: el.subjectInfo.subjectsPze,
                        hours: {
                            start: Number(hourStart + minuteStart + '00'),
                            end: Number(hourEnd + minuteEnd + '00'),
                            fullStart: el.subjectHours.start,
                            fullEnd: el.subjectHours.end,
                        }
                    });
                });
                middlewareObject[day].sort((a: any, b: any) => a.hours.start - b.hours.end);
            });
            return { ...state, currentScheduleContent: middlewareObject };
        }

        case GET_SINGLE_HELPERS_LINKS: {
            const { singleHelpersLink } = action.payload;
            return { ...state, helpersLinks: [ ...state.helpersLinks, singleHelpersLink ] };
        }

        case UPDATE_COVID_DATA: {
            const { position, value } = action.payload;
            let newState = [ ...state.covidWarningLevels ];
            const findIndexType = newState.findIndex(el => el.type === position);
            if (findIndexType === -1) {
                throw new Error(`ERROR! Redux reducer error! Set new state not found!`);
            } else {
                newState[findIndexType].actualRiskNumber = value;
                const updateDatabaseCluster = async () => {
                    await axiosInstance.put(`${API_ENDPOINTS.COVID_WARNINGS}/${position}`, newState[findIndexType]);
                };
                updateDatabaseCluster();
            }
            return { ...state, covidWarningLevels: newState };
        }

        case UPDATE_CREDENTIALS: {
            const { role, credentialFields } = action.payload;
            const { username, password, token } = credentialFields;
            const updateDatabaseCluster = async () => {
                const { data } = await axiosInstance.get(`${API_ENDPOINTS.AUTHENTICATIONS}/${role}`);
                await axiosInstance.put(`${API_ENDPOINTS.AUTHENTICATIONS}/${role}`, {
                    _id: data._id, role: Number(role), username, password, token: token || '',
                });
            };
            updateDatabaseCluster();
            return state;
        }

        case UPDATE_ELEMENTS_DATE: {
            const { section } = action.payload;
            let newState = [ ...state.lastUpdate ];
            const findSectionIndex = newState.findIndex(el => el.updateDateFor === section);
            if (findSectionIndex === -1) {
                throw new Error(`ERROR! Redux reducer error! Set new state not found!`);
            } else {
                const updateDatabaseCluster = async () => {
                    const sendObj = { updateDateFor: section };
                    const { data } = await axiosInstance.put(`${API_ENDPOINTS.LAST_UPDATE}/${section}`, sendObj);
                    newState[findSectionIndex] = data;
                };
                updateDatabaseCluster();
            }
            return { ...state, lastUpdate: newState };
        }

        case REMOVING_CMS_CONTENT: {
            const { elementID, modalType, modState } = action.payload;
            const apiStateElement = state[modState[modalType].apiReducerObjectKey];
            const elementsWithoutRemoving = apiStateElement.filter((el: any) => el._id !== elementID);
            const updateDatabaseCluster = async () => {
                await axiosInstance.delete(`${modState[modalType].apiActionsPath}/${elementID}`);
            };
            updateDatabaseCluster();
            return { ...state, [modState[modalType].apiReducerObjectKey]: elementsWithoutRemoving };
        }

        default: {
            return state;
        }
    }
};

export default apiReducer;