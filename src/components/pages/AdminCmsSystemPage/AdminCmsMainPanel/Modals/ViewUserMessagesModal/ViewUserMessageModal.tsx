import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";

import { MODAL_TYPES, ModalsStateContext } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext } from '../../../../../../contextStore/MainStoreContext';

import { insertUserChoice } from '../../Panels/UserMessagePanel';

const {
   modalContainer, modalWrapper, modalAddWrapper, modalOpen, modalAddHeader, modalAddIcon, modalViewWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
   messageModalCloseButton
} = require('./../../../../../layouts/CookiesNotification/CookiesNotification.module.scss');
const { messageInfoContainer, userInfo, messageInfo } = require('./ViewUserMessageModal.module.scss');

/**
 * Komponent generujący modal z panelu CMS z wiadomościa użytkowników. Modal pokazuje szczegóły dotyczące wiadomości:
 * (data wysłania, imię, treść oraz typ wysłanej wiadomości).
 */
const ViewUserMessagesModal = () => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { messageModal, setMessageModal } = useContext<any>(ModalsStateContext);

   const { footerForms } = dataFetchFromServer;
   const ifModalOpen = messageModal.ifOpen && messageModal.type === MODAL_TYPES.VIEW ? modalOpen : '';

   const generateValues = () => {
      const userRecord = footerForms.find((message: any) => message._id === messageModal.id);
      if(userRecord !== undefined) {
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
            <header className = {modalAddHeader}>
               <h3>
                  <FontAwesomeIcon
                     icon = {['fas', 'envelope-open-text']}
                     className = {modalAddIcon}
                  />
                  Szczegóły wiadomości
                  <aside/>
                  <button
                     className = {messageModalCloseButton}
                     onClick = {() => setMessageModal({ ...messageModal, ifOpen: false })}
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
                     <strong>{generateValues().type}</strong>
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