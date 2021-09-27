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

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface LoginSessionProviderTypes {
    adminAuth: boolean;
    setAdminAuth: Dispatch<SetStateAction<boolean>>;
    userAuth: boolean;
    setUserAuth: Dispatch<SetStateAction<boolean>>;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const LoginSessionContext = createContext<Partial<LoginSessionProviderTypes>>({});

/**
 * @details Component that stores the store with information about an active user and administrator session. Values from
 *          Hooks are passed to all domain components wrapped with provider.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const LoginSessionProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const [ adminAuth, setAdminAuth ] = useState<boolean>(false);
    const [ userAuth, setUserAuth ] = useState<boolean>(false);

    return (
        <LoginSessionContext.Provider
            value = {{
                adminAuth, setAdminAuth,
                userAuth, setUserAuth,
            }}
        >
            {children}
        </LoginSessionContext.Provider>
    );
}

export default LoginSessionProvider;