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

import apiTypes, { apiGetContentFromDB } from './types';

import { apiInitialState, ApiInitialTypes } from './initialState';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import axiosInstance from '../../helpers/misc/request';
import CryptoJS, { AES } from 'crypto-js';
import { FOOTER_OPTIONS } from '../../helpers/structs/footerOptions.config';
import ApiReducerUtils from './apiReducerUtils';
import Utils from '../../helpers/functionsAndClasses/utils';

/**
 *
 *
 * @param state
 * @param action
 */
const apiReducer = (state = apiInitialState, action: any) => {
    switch (action.type) {

        case apiTypes.GET_SINGLE_ELEMENT_FROM_DB: {
            const { value, elementType } = action.payload;
            let returnedState: ApiInitialTypes = state;
            switch (elementType) {
                case apiGetContentFromDB.SCHEDULE:
                    const schedules = ApiReducerUtils.subjectsInSeparateArrays(state.scheduleContent, value);
                    returnedState = { ...state, [elementType]: schedules };
                    break;
                case apiGetContentFromDB.USER_MESSAGES:
                    const { _id, ifClicked, userIdentity, userMessage, userChoice, servletTime } = value;
                    returnedState = { ...state, [elementType]: [ ...state[elementType], {
                        _id, ifClicked, servletTime,
                        userIdentity: Utils.decrData(userIdentity), userMessage: Utils.decrData(userMessage),
                        userChoice: FOOTER_OPTIONS.find(option => option.value === userChoice)!.name
                    }]};
                    break;
                case apiGetContentFromDB.COVID:
                    if (state.covidWarningLevels.length < 3) {
                        returnedState = { ...state, [elementType]: [ ...state[elementType], value ] };
                    }
                    break;
                default:
                    returnedState = { ...state, [elementType]: [ ...state[elementType], value ] };
            }
            return returnedState;
        }

        case apiTypes.SEND_SINGLE_FOOTERFORM_DATA: {
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

        case apiTypes.SORT_BY_NAME: {
            const { typeElmsArray } = action.payload;
            typeElmsArray.forEach((el: any) => {
                state[el].sort((a: any, b: any) => a.title.localeCompare(b.title));
            });
            return state;
        }

        case apiTypes.SORT_BY_DATE: {
            const { typeElmsArray } = action.payload;
            state[typeElmsArray]
                .sort((a: any, b: any) => a.day - b.day)
                .sort((a: any, b: any) => a.month - b.month)
                .sort((a: any, b: any) => a.year - b.year);
            return state;
        }

        case apiTypes.FILTERED_SCHEDULE_SUBJECTS: {
            const { normalGroup, engGroup, skGroup } = action.payload;
            const sheduleSubjectsIntoSeparateDays = ApiReducerUtils.moveSheduleSubjectsIntoSeparateDays(
                state.scheduleContent, normalGroup, engGroup, skGroup
            );
            return { ...state, currentScheduleContent: sheduleSubjectsIntoSeparateDays };
        }

        case apiTypes.UPDATE_COVID_DATA: {
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

        case apiTypes.UPDATE_CREDENTIALS: {
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

        case apiTypes.UPDATE_ELEMENTS_DATE: {
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

        case apiTypes.REMOVING_CMS_CONTENT: {
            const { elementID, modalType, modState } = action.payload;
            const apiStateElement = state[modState[modalType].apiReducerObjectKey];
            const elementsWithoutRemoving = apiStateElement.filter((el: any) => el._id !== elementID);
            const updateDatabaseCluster = async () => {
                await axiosInstance.delete(`${modState[modalType].apiActionsPath}/${elementID}`);
            };
            updateDatabaseCluster();
            return { ...state, [modState[modalType].apiReducerObjectKey]: elementsWithoutRemoving };
        }

        case apiTypes.UPDATE_FOOTERFORM_CLICKED: {
            const { elementID, ifClicked } = action.payload;
            let newState = [ ...state.footerFormMessages ];
            const elementIndex: number = state.footerFormMessages.findIndex(el => el._id === elementID);
            const singleMess = newState[elementIndex];
            singleMess.ifClicked = ifClicked;
            singleMess.userChoice = FOOTER_OPTIONS.find(option => option.name === singleMess.userChoice)!.value;
            const updateDatabaseCluster = async () => {
                await axiosInstance.put(`${API_ENDPOINTS.FOOTER_FORM}/${elementID}`, singleMess);
            };
            updateDatabaseCluster();
            return { ...state, footerFormMessages: newState };
        }

        default: {
            return state;
        }
    }
};

export default apiReducer;