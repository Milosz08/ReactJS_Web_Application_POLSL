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

import { AES } from 'crypto-js';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { allModals, allModalsActions } from '../../redux/modalsReduxStore/types';

/**
 * Custom hook responsible for generating an object to communicate with the database
 * API based on the passed parameter.
 *
 * @param modalType { allModals } - type of object to be generated
 * @param actionType { allModalsActions } - database action.
 * @param elementID { string | null } - element ID (used onlu in EDIT_MODE).
 */
const useGenerateDatabaseObjects = (modalType: allModals, actionType: allModalsActions, elementID: string | null) => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const fields = modalsInitialState[modalType].modalInputFields!;
    const hashKey: string = process.env.REACT_APP_HASH_CODE || '';

    const generateObject = () => {
        switch (modalType) {
            case allModals.HELPERS_LINKS_MODAL:
                return {
                    helperTitle: fields.title,
                    helperLink: AES.encrypt(fields.link, hashKey).toString(),
                    helperIcon: {
                        family: 'FontAwesomeIcons', name: fields.icon
                    }
                };
            default:
                return {};
        }
    };

    return () => {
        if (actionType === allModalsActions.EDIT_ELEMENT) {
            const data = generateObject();
            data['_id'] = elementID;
            return data;
        }
        return generateObject();
    }
};

export default useGenerateDatabaseObjects;