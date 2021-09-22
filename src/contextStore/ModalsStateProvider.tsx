/**
 * @file ModalsStateProvider.tsx
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

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import './../styles/index.scss';

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