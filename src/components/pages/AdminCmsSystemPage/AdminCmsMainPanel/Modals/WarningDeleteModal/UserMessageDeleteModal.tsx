import React, { useContext } from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';

import { ModalsStateContext } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext } from '../../../../../../contextStore/MainStoreContext';

import { MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';
import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";

import { insertUserChoice } from "../../Panels/UserMessagePanel";

const {
   modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, messageTypeBox, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

/**
 * Komponent generujący modal z wiadomością o usuwaniu wiadomości wysłanej od użytkownika. Jeśli zostanie zatwierdzony,
 * wiadomość przy pomocy API usuwana jest z bazy danych.
 */
const UserMessageDeleteModal = () => {

   const { messageModal, setMessageModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);

   const { footerForms } = dataFetchFromServer;
   const ifModalOpen = messageModal.ifOpen && messageModal.type === MODAL_TYPES.REMOVE ? modalOpen : '';

   const generateInfos = () => {
      const userRecord = footerForms.find((message: any) => message._id === messageModal.id);
      if(userRecord !== undefined) {
         return ({
            user: userRecord.userIdentity,
            type: insertUserChoice(userRecord.userChoice),
            message: userRecord.userMessage,
         });
      }
      return { user: '', type: '', message: '' };
   }

   const handleRemoveMessage = async () => {
      await axiosInstance.delete(`footer-form/${messageModal.id}`);
      const copy = [...footerForms];
      const messagesAfterRemove = copy.filter(object => object._id !== messageModal.id);
      setDataFetchFromServer({ ...dataFetchFromServer, footerForms: messagesAfterRemove });
      setMessageModal({ ...messageModal, ifOpen: false });
   }

   return (
      <div className = {classnames(modalContainer, ifModalOpen)}>
         <div className = {classnames(modalWrapper, dangerColorWrapper)}>
            <UniversalHeader
               iconP = {['fas', 'exclamation-triangle']}
               content = 'Usuwanie Wiadomości'
               ifCloseButtonVisible = {false}
            />
            <div className = {modalWarningInfo}>
               Czy na pewno chcesz usunąć wiadomość typu <strong>{generateInfos().type}</strong> <br/>
               od użytkownika <strong>{generateInfos().user}</strong> o treści:
               <p  className = {messageTypeBox}>{generateInfos().message}</p>
               z bazy danych? Operacji tej nie można cofnąć.
            </div>
            <div className = {modalWarningButtons}>
               <button onClick = {handleRemoveMessage}>Tak, usuń wiadomość</button>
               <button
                  onClick = {() => setMessageModal({ ...messageModal, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default UserMessageDeleteModal;