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
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/misc/request';
import { insertUserChoice } from '../../Panels/UserMessagePanel';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';

const UniversalHeader = React.lazy(() => import('../../../../../layouts/UniversalHeader/UniversalHeader'));

const {
    modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, messageTypeBox, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

/**
 * @details Modal generating component with a message to delete a message sent from the user. If approved, the
 *          message is removed from the database using the API.
 */
const UserMessageDeleteModal = (): JSX.Element => {

    const { messageModal, setMessageModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
    const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const { footerForms } = dataFetchFromServer;
    const ifModalOpen = messageModal!.ifOpen && messageModal!.type === MODAL_TYPES.REMOVE ? modalOpen : '';

    const generateInfos = (): { [value: string]: string } => {
        const userRecord = footerForms.find((message: any) => message._id === messageModal!.id);
        if (userRecord !== undefined) {
            return ({
                user: userRecord.userIdentity,
                type: insertUserChoice(userRecord.userChoice),
                message: userRecord.userMessage,
            });
        }
        return { user: '', type: '', message: '' };
    }

    const handleRemoveMessage = async (): Promise<any> => {
        await axiosInstance.delete(`footer-form/${messageModal!.id}`);
        const copy = [ ...footerForms ];
        const messagesAfterRemove = copy.filter(object => object._id !== messageModal!.id);
        setDataFetchFromServer({ ...dataFetchFromServer, footerForms: messagesAfterRemove });
        setMessageModal!({ ...messageModal!, ifOpen: false });
    }

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, dangerColorWrapper)}>
                {/*<UniversalHeader*/}
                {/*    iconP = {[ 'fas', 'exclamation-triangle' ]}*/}
                {/*    content = 'Usuwanie Wiadomości'*/}
                {/*    ifCloseButtonVisible = {false}*/}
                {/*/>*/}
                <div className = {modalWarningInfo}>
                    Czy na pewno chcesz usunąć wiadomość typu <strong>{generateInfos().type}</strong> <br/>
                    od użytkownika <strong>{generateInfos().user}</strong> o treści:
                    <p className = {messageTypeBox}>{generateInfos().message}</p>
                    z bazy danych? Operacji tej nie można cofnąć.
                </div>
                <div className = {modalWarningButtons}>
                    <button onClick = {handleRemoveMessage}>Tak, usuń wiadomość</button>
                    <button
                        onClick = {() => setMessageModal!({ ...messageModal!, ifOpen: false })}
                    >Nie, zamknij to okno
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserMessageDeleteModal;