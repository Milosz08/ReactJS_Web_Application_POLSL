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

import apiTypes, { searchByType, sortAvailables } from './types';

interface ReturnedToReducer {
    type: apiTypes;
    payload?: {
        [name: string]: any;
    };
}

/**
 * Static class that stores methods responsible for basic handling of API
 * paths communicating with the database.
 */
export class ApiActionsGet {

    /**
     * Method responsible for calling the reducer function that adds a new element to the list.
     *
     * @param elementToSend { object } - element to include into state.
     * @param elementType { string } - object key, informs where redux should put element.
     * @param addSchedule { boolean? } - flag, decided if current element is schedule subject.
     */
    public static addReduxStoreElement = (
        elementToSend: object, elementType: string, addSchedule = false
    ): ReturnedToReducer => ({
        type: apiTypes.ADD_DB_ELEMENT_THUNK,
        payload: {
            elementToSend, elementType, addSchedule
        }
    });

    /**
     * Method responsible for calling the reducer function that edits the selected list item.
     *
     * @param elementToSend { object } - element to include into state.
     * @param elementType { string } - object key, informs where redux should update element.
     * @param elementID { string | null } - element ID (from database).
     * @param searchBy { searchByType? } - search element in redux reducer (by default, search by ID).
     */
    public static updateReduxStoreElement = (
        elementToSend: object, elementType: string, elementID: string | null, searchBy = searchByType.ID
    ): ReturnedToReducer => ({
        type: apiTypes.EDIT_DB_ELEMENT_THUNK,
        payload: {
            elementToSend, elementType, elementID, searchBy
        }
    });

    /**
     * Method responsible for calling the reducer function that removes the selected item from the list.
     *
     * @param elementType { string } - object key, informs where redux should delete element.
     * @param elementID { string | null } - element ID (from database).
     */
    public static deleteReduxStoreElement = (elementType: string, elementID: string | null): ReturnedToReducer => ({
        type: apiTypes.DELETE_DB_ELEMENT_THUNK,
        payload: {
            elementType, elementID
        }
    });
}


/**
 * Static class that stores methods responsible for sorting retrieved items from the database.
 */
export class ApiActionsSort {

    /**
     * Method responsible for calling the reducer function that sorts the selected item based on the title.
     *
     * @param typeElmsArray { sortAvailables[] } - all sorts to implements.
     */
    public static sortingIncomingElmsByName = (...typeElmsArray: sortAvailables[]): ReturnedToReducer => ({
        type: apiTypes.SORT_BY_NAME,
        payload: {
            typeElmsArray
        }
    });

    /**
     * Method responsible for calling the reducer function that sorts the selected item based on the date.
     *
     * @param typeElmsArray { sortAvailables[] } - all sorts to implements.
     */
    public static sortingIcomingElmsByDate = (...typeElmsArray: sortAvailables[]): ReturnedToReducer => ({
        type: apiTypes.SORT_BY_DATE,
        payload: {
            typeElmsArray
        }
    });

    /**
     * Method responsible for calling the reducer function that sorts the subjects in the schedule.
     *
     * @param normalGroup { string } - schedule single subject group param.
     * @param engGroup { string } - schedule single subject group param.
     * @param skGroup { string } - schedule single subject group param.
     */
    public static filteredScheduleSubjects = (normalGroup: string, engGroup: string, skGroup: string): ReturnedToReducer => ({
        type: apiTypes.FILTERED_SCHEDULE_SUBJECTS,
        payload: {
            normalGroup, engGroup, skGroup
        }
    });
}