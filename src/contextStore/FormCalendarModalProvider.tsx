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
import { v4 as uuidv4 } from 'uuid';

/**
 * Object of constants describing the minimum and maximum dimensions of the text field in the form.
 */
export const TEXTFIELD_SIZE: { [value: string]: number } = {
    MIN_LENGTH: 10,
    MAX_LENGTH: 80
}

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
    [value: string]: boolean;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface FormCalendarModalType {
    date: string;
    setDate: Dispatch<SetStateAction<string>>;
    entriesCount: number;
    setEntriesCount: Dispatch<SetStateAction<number>>;
    entries: { [value: string]: string }[];
    setEntries: Dispatch<SetStateAction<{ [value: string]: string; }[]>>;
    errors: { [value: string]: boolean };
    setErrors: Dispatch<SetStateAction<StateProvider>>;
    validateAll: () => StateProvider;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const FormCalendarModalContext = createContext<Partial<FormCalendarModalType>>({});

/**
 * @details Store component used for the calendar modal in the CMS system. The component has validation of data entered in
 *          the form (function stored in the page, inherited by all wrapped nodes).
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const FormCalendarModalProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const [ errors, setErrors ] = useState<StateProvider>({ date: false, time: false, message: false });

    const [ date, setDate ] = useState<string>('');
    const [ entriesCount, setEntriesCount ] = useState<number>(1);
    const [ entries, setEntries ] = useState<{ [value: string]: string }[]>(Array.from({ length: entriesCount }, () => ({
        _id: uuidv4(), start: '', message: '', importantLevel: 'low'
    })));

    const validateAll = (): StateProvider => {
        let dateBool = false, timeBool = false, messageBool = false;
        const allTimes = entries.filter((entrie: { [value: string]: string }) => entrie.start === '');
        const allMessages = entries.filter((entrie: { [value: string]: string }) => (
            entrie.message === '' || entrie.message.length < 10
        ));

        if (date === '') {
            dateBool = true;
        }
        if (allTimes.length !== 0) {
            timeBool = true;
        }
        if (allMessages.length !== 0) {
            messageBool = true;
        }

        return { dateBool, timeBool, messageBool };
    }

    return (
        <FormCalendarModalContext.Provider
            value = {{
                date, setDate,
                entriesCount, setEntriesCount,
                entries, setEntries,
                errors, setErrors,
                validateAll
            }}
        >
            {children}
        </FormCalendarModalContext.Provider>
    );
}

export default FormCalendarModalProvider;