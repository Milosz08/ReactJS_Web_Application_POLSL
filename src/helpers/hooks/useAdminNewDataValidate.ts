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

import * as React from 'react';
import { useContext } from 'react';

import { useDispatch } from 'react-redux';
import { DbNonModalOp } from '../../redux/apiReduxStore/operationsForNonModals';

import LoginValidator, { ROLES } from '../functionsAndClasses/LoginValidator';

import {
    ChangeCredentialsContext, ChangeCredentialsContextTypes
} from '../../components/layouts/CmsPageComponents/CmsPagePanels/ChangeCredentialsCmsPage/ChangeCredentialsStoreProvider';

import { updateSections } from '../../redux/apiReduxStore/types';

/**
 * Custom hook responsible for validate and send new data about credentials (user/admin/moderator).
 * Connected with redux store and action reducer.
 *
 * @param allRef { { [value: string]: React.MutableRefObject<any> } } - fields referential values.
 */
const useAdminNewDataValidate = (allRef: { [value: string]: React.MutableRefObject<any> }): () => void => {

    const { errors: err, roles } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);
    const { login, pass: passF, passRepeat, token, adminPass } = allRef;

    const dispatcher = useDispatch();

    const clearFields = (): void => {
        Object.keys(allRef).forEach(key => {
            if (Boolean(allRef[key].current)) {
                allRef[key].current.value = '';
            }
        });
    };

    const validateDataAndReturnedBoolObject = async (vldObj: LoginValidator, ifUser: boolean): Promise<any> => {
        await vldObj.validateNewFields(adminPass.current.value, passRepeat.current.value);
        const { username: lg, password: pass, token: tk } = vldObj.get__errorFields();
        const { passRepeat: passR, adminPass: passA } = vldObj.get__extendedErrorFields();
        const valid: boolean = ifUser ? !lg && !pass && !passR && !passA : !lg && !pass && !tk && !passR && !passA;
        if (valid) {
            if(ifUser) {
                dispatcher(DbNonModalOp.updateCredentialsFromCms(ROLES.USER, {
                    username: login.current.value, password: passF.current.value
                }));
            } else {
                dispatcher(DbNonModalOp.updateCredentialsFromCms(roles!.role, {
                    username: login.current.value, password: passF.current.value, token: token.current.value
                }));
            }
            clearFields();
        } else {
            err!.setErrors({ login: lg, pass, passRepeat: passR, token: tk, adminPass: passA });
        }
    };

    return () => {
        if(!Boolean(token.current)) {
            const vld = new LoginValidator(login.current.value, passF.current.value, ROLES.ADMIN);
            validateDataAndReturnedBoolObject(vld, true);
        } else {
            const vld = new LoginValidator(login.current.value, passF.current.value, ROLES.ADMIN, token.current.value);
            validateDataAndReturnedBoolObject(vld, false);
        }
        dispatcher(DbNonModalOp.updateLastUpdateField(updateSections.AUTH));
    };
};

export default useAdminNewDataValidate;