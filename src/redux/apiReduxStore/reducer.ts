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
import ApiReducerUtils from './apiReducerUtils';

/**
 * The reducer function responsible for managing state for the ReduxApi tree.
 *
 * @param state { apiInitialState } - ReduxApi tree state.
 * @param action { any } - object stored action: type and payload.
 */
const apiReducer = (state = apiInitialState, action: any) => {
    switch (action.type) {

        case apiTypes.ADD_DB_ELEMENT_THUNK: {
            const { elementToSend, elementType, addSchedule } = action.payload;
            if(addSchedule) {
                const schedules = ApiReducerUtils.subjectsInSeparateArrays(state.scheduleContent, elementToSend);
                return { ...state, [elementType]: schedules };
            }
            return { ...state, [elementType]: [ ...state[elementType], elementToSend ] };
        }

        case apiTypes.EDIT_DB_ELEMENT_THUNK: {
            const { elementToSend, elementType, elementID, searchBy } = action.payload;
            const newState = state[elementType];
            const findSearchIdx = state[elementType].findIndex((el: typeof elementType) => el[searchBy] === elementID);
            if(findSearchIdx === -1) {
                return state;
            }
            newState[findSearchIdx] = elementToSend;
            return { ...state, [elementType]: newState };
        }

        case apiTypes.DELETE_DB_ELEMENT_THUNK: {
            const { elementType, elementID } = action.payload;
            const apiStateElement = state[elementType];
            const elementsWithoutRemoving = apiStateElement.filter((el: any) => el._id !== elementID);
            return { ...state, [elementType]: elementsWithoutRemoving };
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

        default: {
            return state;
        }
    }
};

export default apiReducer;