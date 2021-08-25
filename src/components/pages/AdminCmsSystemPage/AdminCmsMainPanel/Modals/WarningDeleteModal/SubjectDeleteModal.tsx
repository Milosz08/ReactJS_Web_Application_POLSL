/**
 * @file SubjectDeleteModal.tsx
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
import axiosInstance from '../../../../../../helpers/request';
import classnames from 'classnames';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';

import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';

const UniversalHeader = React.lazy(() => import('../../../../../layouts/UniversalHeader/UniversalHeader'));

const {
   modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

/**
 * @details Modal generating component that allows one subject to be removed. The component connects to the API and with
 *          its help removes the content from the database and local state.
 */
const SubjectDeleteModal = (): JSX.Element => {

   const { subjectModal, setSubjectModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const { subjectsData } = dataFetchFromServer;
   const ifModalOpen = subjectModal!.ifOpen && subjectModal!.type === MODAL_TYPES.REMOVE ? modalOpen : '';

   const getSearchSubjectTitle = (): string => {
      const subjectDataFilter = subjectsData.find((subject: any) => subject._id === subjectModal!.id);
      if(subjectDataFilter !== undefined) {
         return subjectDataFilter.title;
      } else {
         return '';
      }
   }

   const handleRemoveSubject = async (): Promise<any> => {
      await axiosInstance.delete(`subjects-data/${subjectModal!.id}`);
      const subjectsAfterRemove = [...subjectsData].filter((subject: any) => subject._id !== subjectModal!.id);
      setDataFetchFromServer({ ...dataFetchFromServer, subjectsData: subjectsAfterRemove });
      setSubjectModal!({ ...subjectModal!, ifOpen: false });
      await updateLogsDateAsync('subjects', process.env.REACT_APP_SUBJECTS_ID);
   }

   const handleExitModal = () => setSubjectModal!({ id: '', type: MODAL_TYPES.EDIT, ifOpen: false });

   return (
      <div className = {classnames(modalContainer, ifModalOpen)}>
         <div className = {classnames(modalWrapper, dangerColorWrapper)}>
            <UniversalHeader
               iconP = {['fas', 'exclamation-triangle']}
               content = 'Usuwanie Przedmiotu'
               ifCloseButtonVisible = {false}
            />
            <div className = {modalWarningInfo}>
               Czy na pewno chcesz usunąć przedmiot
               <p>{getSearchSubjectTitle()}</p>
               z bazy danych? Operacji tej nie można cofnąć.
            </div>
            <div className = {modalWarningButtons}>
               <button onClick = {handleRemoveSubject}>Tak, usuń przedmiot</button>
               <button onClick = {handleExitModal}>Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default SubjectDeleteModal;