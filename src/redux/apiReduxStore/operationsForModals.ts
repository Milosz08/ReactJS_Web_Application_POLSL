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

import { ApiActionsGet } from './actions';

import { allModals } from '../modalsReduxStore/types';
import { ModalsInitialTypes } from '../modalsReduxStore/initialState';

const {  addReduxStoreElement, updateReduxStoreElement, deleteReduxStoreElement } = ApiActionsGet;

/**
 * Class responsible for providing methods that communicate with the database
 * (redux thunk) for modal related elements.
 */
export class DbModalOp {

    /**
     * Method that communicates with the database, responsible for adding a new record and calling
     * the reducer function. Method for modals related elements.
     *
     * @param modState { ModalsInitialTypes } - initial state of modal redux store.
     * @param modalType { allModals } - type of modal.
     * @param elementToAdd { object } - object element to add.
     */
    public static addSingleElementFromCms = (modState: ModalsInitialTypes, modalType: allModals, elementToAdd: object) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.post(modState[modalType].apiActionsPath, elementToAdd);
            dispatch(addReduxStoreElement(data, modState[modalType].apiReducerObjectKey));
        };
    };

    /**
     * Method that communicates with the database, responsible for editing an existing record and
     * calling the reducer function. Method for modals related elements.
     *
     * @param modState { ModalsInitialTypes } - initial state of modal redux store.
     * @param modalType { allModals } - type of modal.
     * @param elementToUpdate { object } - object element to updated.
     * @param elementID { string } - updated element database identifier.
     */
    public static editSingleElementFromCms = (
        modState: ModalsInitialTypes, modalType: allModals, elementToUpdate: object, elementID: string | null
    ) => {
        return async (dispatch: (prop: any) => void) => {
            const { data } = await axiosInstance.put(`${modState[modalType].apiActionsPath}/${elementID}`, elementToUpdate);
            dispatch(updateReduxStoreElement(data, modState[modalType].apiReducerObjectKey, elementID));
        };
    };

    /**
     * Method that communicates with the database, responsible for deleting the selected record and
     * calling the reducer function. Method for modals related elements.
     *
     * @param modState { ModalsInitialTypes } - initial state of modal redux store.
     * @param modalType { allModals } - type of modal.
     * @param elementID { string } - deleted element database identifier.
     * @param day { string? } - subject delete day indicator.
     */
    public static deleteSingleElementFromCms = (
        modState: ModalsInitialTypes, modalType: allModals, elementID: string | null, day: string = ''
    ) => {
        return async (dispatch: (prop: any) => void) => {
            await axiosInstance.delete(`${modState[modalType].apiActionsPath}/${elementID}`);
            dispatch(deleteReduxStoreElement(modState[modalType].apiReducerObjectKey, elementID, day));
        };
    };
}