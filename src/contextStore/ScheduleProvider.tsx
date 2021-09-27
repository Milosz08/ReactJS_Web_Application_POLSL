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