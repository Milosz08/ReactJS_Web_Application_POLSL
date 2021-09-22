/**
 * @file GlobalModalsStateProvider.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component with Context Store (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
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
 * @details Store component for global modals (saving schedule preferences to Cookie object, notification of end of
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