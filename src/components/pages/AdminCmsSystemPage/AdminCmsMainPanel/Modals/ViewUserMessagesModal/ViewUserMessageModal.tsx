/**
 * @file ViewUserMessageModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreContext';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';

import { insertUserChoice } from '../../Panels/UserMessagePanel';

const {
   modalContainer, modalWrapper, modalAddWrapper, modalOpen, modalAddHeader, modalAddIcon, modalViewWrapper, marginTopAdd
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const { messageModalCloseButton } = require('./../../../../../layouts/CookiesNotification/CookiesNotification.module.scss');
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
            <header className = {classnames(modalAddHeader, marginTopAdd)}>
               <h3>
                  <FontAwesomeIcon
                     icon = {['fas', 'envelope-open-text']}
                     className = {modalAddIcon}
                  />
                  Szczegóły wiadomości
                  <aside/>
                  <button
                     className = {messageModalCloseButton}
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