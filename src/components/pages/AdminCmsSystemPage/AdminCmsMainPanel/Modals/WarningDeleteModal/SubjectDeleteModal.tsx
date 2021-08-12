import React, { useContext } from 'react';
import axiosInstance from '../../../../../../helpers/request';
import classnames from "classnames";

import { ModalsStateContext } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext } from '../../../../../../contextStore/MainStoreContext';

import { MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';
import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";
import updateLogsDateAsync from "../../../../../../constants/updateLogsDateAsync";

const {
   modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

/**
 * Komponent generujący modal po naciśnięciu przycisku usuwania przedmiotu. Komponent komunikuje się z API i po
 * zatwierdzeniu przez administratora usuwany jest z bazy danych.
 */
const SubjectDeleteModal = () => {

   const { subjectModal, setSubjectModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);

   const { subjectsData } = dataFetchFromServer;
   const ifModalOpen = subjectModal.ifOpen && subjectModal.type === MODAL_TYPES.REMOVE ? modalOpen : '';

   const getSearchSubjectTitle = () => {
      const subjectDataFilter = subjectsData.find((subject: any) => subject._id === subjectModal.id);
      if(subjectDataFilter !== undefined) {
         return subjectDataFilter.title;
      } else {
         return '';
      }
   }

   const handleRemoveSubject = async () => {
      await axiosInstance.delete(`subjects-data/${subjectModal.id}`);
      const subjectsAfterRemove = [...subjectsData].filter((subject: any) => subject._id !== subjectModal.id);
      setDataFetchFromServer({ ...dataFetchFromServer, subjectsData: subjectsAfterRemove });
      setSubjectModal({ ...subjectModal, ifOpen: false });
      await updateLogsDateAsync('subjects', process.env.REACT_APP_SUBJECTS_ID);
   }

   const handleExitModal = () => setSubjectModal({ id: '', type: MODAL_TYPES.EDIT, ifOpen: false });

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