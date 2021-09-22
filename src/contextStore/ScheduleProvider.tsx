/**
 * @file ScheduleProvider.tsx
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
import GROUPS_STATIC from '../constants/allGroups';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface ScheduleType {
    groupSelected: string;
    setGroupSelected: Dispatch<SetStateAction<string>>;
    engSelected: string;
    setEngSelected: Dispatch<SetStateAction<string>>;
    inputField: string;
    setInputField: Dispatch<SetStateAction<string>>;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const ScheduleContext = createContext<Partial<ScheduleType>>({});

/**
 * @details React Store that stores the context of states relating to the management of the timetable (regular
 *          group selection, group selection, input field content).
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const ScheduleProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

    const [ groupSelected, setGroupSelected ] = useState<string>(NORMAL_GROUPS[0].text);
    const [ engSelected, setEngSelected ] = useState<string>(ENG_GROUPS[0]);

    const [ inputField, setInputField ] = useState<string>('');

    return (
        <ScheduleContext.Provider
            value = {{
                groupSelected, setGroupSelected,
                engSelected, setEngSelected,
                inputField, setInputField
            }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}

export default ScheduleProvider;