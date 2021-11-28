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
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import useMultipleRef from '../../../helpers/hooks/useMultipleRef';
import { ROLES } from '../../../helpers/functionsAndClasses/LoginValidator';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../redux/sessionReduxStore/initialState';

export interface ChangeCredentialsContextTypes {
    roles: {
        role: ROLES;
        setRole: Dispatch<SetStateAction<ROLES>>
    }
    errors: {
        errors: { [key: string]: boolean };
        setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>
    }
    credentialsRef: { [key: string]: React.MutableRefObject<any> };
}

export const ChangeCredentialsContext = createContext<Partial<ChangeCredentialsContextTypes>>({ });

interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Store Component responsible for distribute state around ChangeCredentials subcomponents.
 */
const ChangeCredentialsStoreProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const [ role, setRole ] = useState<ROLES>(adminAuthStatus.identity);
    const [ login, pass, passRepeat, token, adminPass ] = useMultipleRef(6);
    const [ errors, setErrors ] = useState<{ [key: string]: boolean }>({
        login: false, pass: false, passRepeat: false, token: false, adminPass: false
    });

    useEffect(() => {
        setRole(adminAuthStatus.identity);
    }, [ adminAuthStatus.identity ]);

    return (
        <ChangeCredentialsContext.Provider
            value = {{
                roles: { role, setRole },
                errors: { errors, setErrors },
                credentialsRef: { login, pass, passRepeat, token, adminPass },
            }}
        >
            {children}
        </ChangeCredentialsContext.Provider>
    );
};

export default ChangeCredentialsStoreProvider;