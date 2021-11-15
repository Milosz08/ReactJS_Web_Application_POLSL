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
 * Interface defining the type of state values.
 */
interface StateProvider {
    modalOpen: boolean;
    counter: number;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface GlobalModalsStateTypes {
    onSaveOpenModal: boolean;
    setOnSaveOpenModal: Dispatch<SetStateAction<boolean>>
    adminSessionInfo: StateProvider;
    setAdminSessionInfo: Dispatch<SetStateAction<StateProvider>> | any
    lastActivity: number;
    setLastActivity: Dispatch<SetStateAction<number>>
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const GlobalModalsStateContext = createContext<Partial<GlobalModalsStateTypes>>({});

/**
 * @details Store component for global modals (saving schedule preferencesReduxStore to Cookie object, notification of end of
 *          active session time, etc.).
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const GlobalModalsStateProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const [ onSaveOpenModal, setOnSaveOpenModal ] = useState<boolean>(false);
    const [ adminSessionInfo, setAdminSessionInfo ] = useState<StateProvider>({ modalOpen: false, counter: 0 });
    const [ lastActivity, setLastActivity ] = useState<number>(0);

    return (
        <GlobalModalsStateContext.Provider
            value = {{
                onSaveOpenModal, setOnSaveOpenModal,
                adminSessionInfo, setAdminSessionInfo,
                lastActivity, setLastActivity
            }}
        >
            {children}
        </GlobalModalsStateContext.Provider>
    );
}

export default GlobalModalsStateProvider;