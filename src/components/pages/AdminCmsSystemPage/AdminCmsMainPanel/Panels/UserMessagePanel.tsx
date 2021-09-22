/**
 * @file UserMessagePanel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                uuid: "^8.3.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/24/2021
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
 *          Uses the global stora and will use asynchronous functions to communicate with the API (delete messages
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