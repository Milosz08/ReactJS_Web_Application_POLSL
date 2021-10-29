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

import { initialState } from './initialState';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import axiosInstance from '../../helpers/misc/request';
import ConvertTimeUTC from '../../helpers/functionsAndClasses/convertTimeUTC';

const {
    GET_SINGLE_FOOTERFORM_DATA, SEND_SINGLE_FOOTERFORM_DATA, GET_SINGLE_COVID_DATA, GET_SINGLE_LAST_UPDATE,
    UPDATE_SINGLE_LAST_UPDATE, GET_SINGLE_SUBJECT_DATA, FILTERED_SUBJECTS_LIST, SORT_BY_NAME
} = apiTypes;

const apiReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case GET_SINGLE_FOOTERFORM_DATA: {
            const { footerMessageObject } = action.payload;
            return { ...state, footerFormMessages: [ ...state.footerFormMessages, footerMessageObject ] };
        }

        case SEND_SINGLE_FOOTERFORM_DATA: {
            const { getfooterMessage } = action.payload;
            const postData = async (): Promise<any> => {
                const { userNickname: userIdentity, userMessage, typeOfMessage: userChoice } = getfooterMessage;
                const sendObject = {
                    userIdentity, userChoice, userMessage
                };
                const { data } = await axiosInstance.post(API_ENDPOINTS.FOOTER_FORM, sendObject);
                state.footerFormMessages.push(data);
            };
            postData();
            return state;
        }

        case GET_SINGLE_COVID_DATA: {
            const { covidWarningLevels } = action.payload;
            if(state.covidWarningLevels.length === 3) {
                return state;
            }
            return { ...state, covidWarningLevels: [ ...state.covidWarningLevels, covidWarningLevels ] };
        }

        case GET_SINGLE_LAST_UPDATE: {
            const { lastUpdate } = action.payload;
            return { ...state, lastUpdate: [ ...state.lastUpdate, lastUpdate ] };
        }

        case UPDATE_SINGLE_LAST_UPDATE: {
            const { updateStateType } = action.payload;
            let newState = [ ...state.lastUpdate ];
            const findIndexType = newState.findIndex(el => el.updateDateFor === updateStateType);
            if(findIndexType === -1) {
                throw new Error(`ERROR! Redux reducer error! Set new state not found!`);
            } else {
                newState[findIndexType].updateDate = new ConvertTimeUTC().getAllDateElms();
                const updateDatabaseClaster = async () => {
                    await axiosInstance.put(`${API_ENDPOINTS.LAST_UPDATE}/${updateStateType}`, newState[findIndexType]);
                };
                updateDatabaseClaster();
            }
            return { ...state, lastUpdate: newState };
        }

        case GET_SINGLE_SUBJECT_DATA: {
            const { singleSubjectData } = action.payload;
            return { ...state,
                subjectsContent: [ ...state.subjectsContent, singleSubjectData ],
                searchedSubjects: [ ...state.searchedSubjects, singleSubjectData ]
            };
        }

        case FILTERED_SUBJECTS_LIST: {
            const { filterCrit } = action.payload;
            // eslint-disable-next-line array-callback-return
            const subjectsNewState = [...state.subjectsContent].filter(el => {
                if (filterCrit === '') {
                    return el;
                } else if (el.title.toLocaleLowerCase().includes(filterCrit.toLocaleLowerCase())) {
                    return el;
                }
            })
            return { ...state, searchedSubjects: subjectsNewState };
        }

        case SORT_BY_NAME: {
            const { typeElmsArray } = action.payload;
            typeElmsArray.forEach((el: any) => {
                state[el].sort((a: any, b: any) => a.title.localeCompare(b.title));
            });
            return state;
        }

        default: {
            return state;
        }
    }
};

export default apiReducer;