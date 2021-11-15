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

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Constant Object defining methods for modals.
 */
export const MODAL_TYPES: { [value: string]: string } = {
    EDIT: 'edit',
    ADD: 'add',
    REMOVE: 'remove',
    VIEW: 'view',
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of modals values.
 */
export interface ModalStateProvider {
    id: string;
    title?: string;
    type: string;
    day?: string;
    ifOpen: boolean;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface ModalStateType {
    subjectModal: ModalStateProvider
    setSubjectModal: Dispatch<SetStateAction<ModalStateProvider>>
    calendarModal: ModalStateProvider
    setCalendarModal: Dispatch<SetStateAction<ModalStateProvider>>
    messageModal: ModalStateProvider
    setMessageModal: Dispatch<SetStateAction<ModalStateProvider>>
    scheduleModal: ModalStateProvider
    setScheduleModal: Dispatch<SetStateAction<ModalStateProvider>>
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const ModalsStateContext = createContext<Partial<ModalStateType>>({});

/**
 * @details React Store that stores modal states in the CMS admin panel. The state consists of 3 elements: element id,
 *          window type (edit, preview, delete or add).
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const ModalsStateProvider: React.FC<PropsProvider> = ({ children }) => {

    const { EDIT } = MODAL_TYPES;

    const [ subjectModal, setSubjectModal ] = useState<ModalStateProvider>({ id: '', title: '', type: EDIT, ifOpen: false });
    const [ calendarModal, setCalendarModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, ifOpen: false });
    const [ messageModal, setMessageModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, ifOpen: false });
    const [ scheduleModal, setScheduleModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, day: '', ifOpen: false });

    const [ widthAxiosX, setWidthAxiosX ] = useState<number>(document.body.offsetWidth);

    useEffect(() => {
        if (document.body.offsetWidth < 1000) {
            if (subjectModal.ifOpen || calendarModal.ifOpen || messageModal.ifOpen || scheduleModal.ifOpen) {
                document.body.classList.add('disable-scroll');
            } else {
                document.body.classList.remove('disable-scroll');
            }
        }
    }, [ subjectModal, calendarModal, messageModal, scheduleModal ]);

    useEffect(() => {
        const getWidthOffset = () => setWidthAxiosX(document.body.offsetWidth);
        document.addEventListener('resize', getWidthOffset);
        return () => document.removeEventListener('resize', getWidthOffset);
    }, [ widthAxiosX ]);

    return (
        <ModalsStateContext.Provider
            value = {{
                subjectModal, setSubjectModal,
                calendarModal, setCalendarModal,
                messageModal, setMessageModal,
                scheduleModal, setScheduleModal
            }}
        >
            {children}
        </ModalsStateContext.Provider>
    );
}

export default ModalsStateProvider;