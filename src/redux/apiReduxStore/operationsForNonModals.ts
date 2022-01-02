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
import CryptoJS, { AES } from 'crypto-js';

import Utils from '../../helpers/functionsAndClasses/utils';
import { ROLES } from '../../helpers/functionsAndClasses/LoginValidator';

import GROUPS_STATIC from '../../helpers/structs/allGroups';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';
import { FOOTER_OPTIONS } from '../../helpers/structs/footerOptions.config';

import { FooterFormTypes } from './dataTypes';
import { apiGetContentFromDB, apiReducerTypes, covidTypes, searchByType, updateSections } from './types';

import { ApiActionsGet, ApiActionsSort } from './actions';

const { addReduxStoreElement, updateReduxStoreElement } = ApiActionsGet;
const { filteredScheduleSubjects } = ApiActionsSort;

/**
 * Class responsible for providing methods that communicate with the database
 * (redux thunk) for non related modal elements.
 */
export class DbNonModalOp {

    private static hashKey: string = process.env.REACT_APP_HASH_CODE || '';

    /**
     * Universal method responsible for retrieving all selected records from the database
     * and saving them in the stor via reducer function.
     *
     * @param endpoint { API_ENDPOINTS } - api element endpoint.
     * @param elementKey { apiGetContentFromDB } - added element key in store object.
     * @param groupCookies { any? } - optional cookies handler (for schedule elements).
     */
    public static getAllUniversalElements = (
        endpoint: API_ENDPOINTS | string, elementKey: apiGetContentFromDB, groupCookies?: any
    ) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.get(endpoint);
            data.forEach((element: typeof data) => {
                if (elementKey === apiGetContentFromDB.USER_MESSAGES) {
                    element.userIdentity = Utils.decrData(element.userIdentity);
                    element.userMessage = Utils.decrData(element.userMessage);
                    element.userChoice = FOOTER_OPTIONS.find(option => option.value === element.userChoice)!.name;
                }
                dispatch(addReduxStoreElement(element, elementKey, elementKey === apiGetContentFromDB.SCHEDULE));
            });
            DbNonModalOp.cookiesScheduleHandler(groupCookies, dispatch, elementKey);
        };
    };

    /**
     * The method responsible for handling additional cookies for schedule.
     *
     * @param cookie { any } - optional cookies handler (for schedule elements).
     * @param dispatcherCallback { any } - redux dispatcher callback function.
     * @param elementKey { apiGetContentFromDB } - added element key in store object.
     */
    private static cookiesScheduleHandler(cookie: any, dispatcherCallback: any, elementKey: apiGetContentFromDB) {
        if (elementKey === apiGetContentFromDB.SCHEDULE) {
            if (Boolean(cookie)) {
                const [ normal, eng, sk ] = Utils.cookieDecrData(cookie).split(',');
                dispatcherCallback(filteredScheduleSubjects(normal, eng, sk));
            } else {
                const { NORMAL_GROUPS, ENG_GROUPS, SK_GROUPS } = GROUPS_STATIC;
                dispatcherCallback(filteredScheduleSubjects(NORMAL_GROUPS[0], ENG_GROUPS[0], SK_GROUPS[0]));
            }
        }
    };

    /**
     * Method responsible for adding a new element to the redux state, unrelated to the modal.
     *
     * @param elementToAdd { object } - object element to add.
     * @param elementKey { apiGetContentFromDB } - added element key in store object.
     * @param endpoint { API_ENDPOINTS } - api element endpoint.
     * @param headers { any } - backend api token necessary to connect with database.
     */
    public static addSingleNonModalElement = (
        elementToAdd: object, elementKey: apiGetContentFromDB, endpoint: API_ENDPOINTS, headers: any
    ) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.post(endpoint, elementToAdd, { headers });
            if (elementKey === apiGetContentFromDB.USER_MESSAGES) {
                data.userIdentity = CryptoJS.enc.Utf8.stringify(AES.decrypt(data.userIdentity, this.hashKey));
                data.userMessage = CryptoJS.enc.Utf8.stringify(AES.decrypt(data.userMessage, this.hashKey));
                data.userChoice = FOOTER_OPTIONS.find(option => option.value === data.userChoice)!.name;
            }
            dispatch(addReduxStoreElement(data, elementKey));
        };
    };

    /**
     * Method responsible for updating exist element to the redux state, unrelated to the modal.
     *
     * @param elementToUpdate { object } - object element to update.
     * @param elementKey { apiGetContentFromDB } - added element key in store object.
     * @param type { covidTypes } - typeof covid warning block.
     * @param endpoint { API_ENDPOINTS } - api element endpoint.
     * @param headers { any } - backend api token necessary to connect with database.
     * @param searchBy { searchByType } - type of search element (by default search by ID).
     */
    public static editSingleNonModalElement = (
        elementToUpdate: object, elementKey: apiGetContentFromDB, type: covidTypes, endpoint: API_ENDPOINTS,
        headers: any, searchBy: searchByType = searchByType.ID
    ) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.put(`${endpoint}/${type}`, elementToUpdate, { headers });
            dispatch(updateReduxStoreElement(data, elementKey, type, '', searchBy));
        };
    };

    /**
     * Method responsible for updating exist credential element to the redux state, unrelated to the modal.
     *
     * @param role { ROLES } - system role (administrator/user itp.).
     * @param username { string } - role username.
     * @param password { string } - role password.
     * @param token { string } - role token (not used in user credentials).
     * @param headers { any } - backend api token necessary to connect with database.
     */
    public static updateCredentialsFromCms = (role: ROLES, { username, password, token }: { [key: string]: string }, headers: any) => {
        return async () => {
            const { data } = await axiosInstance.get(`${API_ENDPOINTS.AUTHENTICATIONS}/${role}`);
            await axiosInstance.put(`${API_ENDPOINTS.AUTHENTICATIONS}/${role}`, {
                _id: data._id, role: Number(role), username, password, token: token || '',
            }, { headers });
        };
    };

    /**
     * Method responsible for change last update section based data from API.
     *
     * @param fieldType { updateSections | string } - type of update section.
     */
    public static updateLastUpdateField = (fieldType: updateSections | string) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.get(`${API_ENDPOINTS.LAST_UPDATE}/${fieldType}`);
            dispatch(updateReduxStoreElement(data, apiReducerTypes.LAST_UPDATES, fieldType, '', searchByType.LAST_UPDATE));
        };
    };

    /**
     * Method responsible for marking a message from the user as read.
     *
     * @param elementID { string } - single footer form object ID.
     * @param formContent { FooterFormTypes } - single footer form object.
     * @param ifClicked { boolean } - flag decided, if message was read.
     * @param headers { any } - backend api token necessary to connect with database.
     */
    public static editReadFooterFormMessageIndicator = (
        elementID: string, formContent: FooterFormTypes, ifClicked: boolean, headers: any
    ) => {
        return async (dispatch: (prop: any) => void) => {
            formContent.ifClicked = ifClicked;
            formContent.userChoice = FOOTER_OPTIONS.find(option => option.name === formContent.userChoice)!.value;
            await axiosInstance.put(`${API_ENDPOINTS.FOOTER_FORM}/${elementID}`, formContent, { headers });
            formContent.userChoice = FOOTER_OPTIONS.find(option => option.value === formContent.userChoice)!.name;
            dispatch(updateReduxStoreElement(formContent, apiGetContentFromDB.USER_MESSAGES, elementID, ''));
        };
    };

}