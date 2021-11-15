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

import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../contextStore/ModalsStateProvider';

const SearchBox = React.lazy(() => import('./AdditionalComponents/SearchBox'));

const {
    panelContainer, panelActive, recordsNotExist, infoIcon, listSorting, sortById, sortByName, sortByType,
    listNumber, listTitle, typeOfMessageCSS, modifyElement, fasIcon, deleteElement
} = require('./Panels.module.scss');

/**
 * @details A function that returns the appropriate value of the selection string (in Polish) based
 *          on the entered value in English (static).
 *
 * @param choice { string } - wybór z pola select.
 */
export const insertUserChoice = (choice: string): string => {
    switch (choice) {
        case 'sheduleModify':
            return 'Modyfikacja planu zajęć';
        case 'pageError':
            return 'Błąd na stronie';
        case 'calendarNewDate':
            return 'Modyfikacja kalendarza';
        default:
            return 'Inne zgłoszenie';
    }
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * Interface defining the type of FooterForm values.
 */
interface FooterFormProvider {
    _id: string,
    userIdentity: string,
    userChoice: string,
    userMessage: string,
    sendDate: {
        fullDate: string,
        fullTime: string
    },
    __v: number
}

/**
 * @details A component that renders the panel in the CMS system, which enables viewing and deleting messages from users.
 *          Uses the global stora and will use asynchronous functionsAndClasses to communicate with the API (delete messages
 *          from the database).
 *
 * @param activeNavElm { number } - currently active panel.
 */
const UserMessagesPanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { setMessageModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

    const [ inputField, setInputField ] = useState<string>('');
    const { footerForms } = dataFetchFromServer;

    const toggleClass = activeNavElm === 5 ? panelActive : '';

    const filteredList = footerForms.filter((form: FooterFormProvider): FooterFormProvider | null => {
        const typeOfMessage = insertUserChoice(form.userChoice).toLocaleLowerCase();
        if (inputField === '') {
            return form;
        } else if (typeOfMessage.includes(inputField.toLocaleLowerCase())) {
            return form;
        }
        return null;
    });

    const generateMessagesList = filteredList.map((message: { [value: string]: string }, index: number) => (
        <li key = {uuidv4()}>
            <span className = {listNumber}>{index + 1}</span>
            <span className = {listTitle}>{message.userIdentity}</span>
            <span className = {typeOfMessageCSS}>{insertUserChoice(message.userChoice)}</span>
            <button
                className = {modifyElement}
                onClick = {() => setMessageModal!({ id: message._id, type: MODAL_TYPES.VIEW, ifOpen: true })}
            >
                <FontAwesomeIcon
                    icon = {[ 'fas', 'envelope-open-text' ]}
                    className = {fasIcon}
                    title = 'Kliknij, aby zobaczyć szczegóły'
                />
            </button>
            <button
                className = {deleteElement}
                onClick = {() => setMessageModal!({ id: message._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
            >
                <FontAwesomeIcon
                    icon = {[ 'fas', 'times' ]}
                    className = {fasIcon}
                    title = 'Usuń wiadmość'
                />
            </button>
        </li>
    ));

    return (
        <div className = {classnames(panelContainer, toggleClass)}>
            <h2>Przeglądanie i Usuwanie wiadmości użytkowników</h2>
            <SearchBox
                inputField = {inputField}
                setInputField = {setInputField}
                placeholderProp = 'Typ'
            />
            <ul>
                {footerForms.length !== 0 && <li className = {listSorting}>
                    <span className = {sortById}>id</span>
                    <span className = {sortByName}>imię/nick</span>
                    <span className = {sortByType}>typ</span>
                </li>}
                {generateMessagesList}
                {footerForms.length === 0 && <div className = {recordsNotExist}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'info-circle' ]}
                        className = {infoIcon}
                    />
                    <p>Brak wiadomości</p>
                </div>}
            </ul>
        </div>
    );
}

export default UserMessagesPanel;