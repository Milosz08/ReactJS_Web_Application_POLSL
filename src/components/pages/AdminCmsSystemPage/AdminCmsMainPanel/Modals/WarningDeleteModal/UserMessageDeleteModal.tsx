/**
 * @file UserMessageDeleteModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';
import { insertUserChoice } from '../../Panels/UserMessagePanel';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreContext';

import UniversalHeader from '../../../../../layouts/UniversalHeader/UniversalHeader';

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
      if(userRecord !== undefined) {
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
      const copy = [...footerForms];
      const messagesAfterRemove = copy.filter(object => object._id !== messageModal!.id);
      setDataFetchFromServer({ ...dataFetchFromServer, footerForms: messagesAfterRemove });
      setMessageModal!({ ...messageModal!, ifOpen: false });
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
                  onClick = {() => setMessageModal!({ ...messageModal!, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default UserMessageDeleteModal;