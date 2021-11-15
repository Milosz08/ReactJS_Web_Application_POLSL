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

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';

import { insertUserChoice } from '../../Panels/UserMessagePanel';

const {
    modalContainer, modalWrapper, modalAddWrapper, modalOpen, modalAddHeader, modalAddIcon, modalViewWrapper, marginTopAdd
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const { messageInfoContainer, userInfo, messageInfo } = require('./ViewUserMessageModal.module.scss');

/**
 * @details Component generating a modal from the CMS panel with users' messages. The modal shows the details of the
 *          message: (date of sending, name, content and type of sent message).
 */
const ViewUserMessagesModal = (): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { messageModal, setMessageModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

    const { footerForms } = dataFetchFromServer;
    const ifModalOpen = messageModal!.ifOpen && messageModal!.type === MODAL_TYPES.VIEW ? modalOpen : '';

    const generateValues = (): { [value: string]: string } => {
        const userRecord = footerForms.find((message: any) => message._id === messageModal!.id);
        if (userRecord !== undefined) {
            return {
                user: userRecord.userIdentity,
                type: insertUserChoice(userRecord.userChoice),
                message: userRecord.userMessage,
                date: userRecord.sendDate.fullDate,
                time: userRecord.sendDate.fullTime,
            }
        }
        return { user: '', type: '', message: '', date: '', time: '' };
    }

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, modalAddWrapper, modalViewWrapper)}>
                <header className = {classnames(modalAddHeader, marginTopAdd)}>
                    <h3>
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'envelope-open-text' ]}
                            className = {modalAddIcon}
                        />
                        Szczegóły wiadomości
                        <aside/>
                        <button
                            onClick = {() => setMessageModal!({ ...messageModal!, ifOpen: false })}
                            title = 'Zamknij okno'
                        >
                            <span/>
                        </button>
                    </h3>
                </header>
                <div className = {messageInfoContainer}>
                    <p className = {userInfo}>
                  <span>Wiadomość wysłana przez:
                     <strong> {generateValues().user}</strong>
                  </span>
                        <span>Data wysłania wiadomości:
                     <strong> {generateValues().date}, {generateValues().time}</strong>
                  </span>
                        <span>Typ wysłanej wiadomości:
                     <strong> {generateValues().type}</strong>
                  </span>
                    </p>
                    <p className = {messageInfo}>
                        <span>{generateValues().message}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ViewUserMessagesModal;