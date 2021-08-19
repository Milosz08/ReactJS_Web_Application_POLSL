/**
 * @file ScheduleDeleteModal.tsx
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

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreContext';

import UniversalHeader from '../../../../../layouts/UniversalHeader/UniversalHeader';
import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';

const {
   modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, deleteSchedule, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

/**
 * @details Modal generating component that allows one subject in schedule to be removed. The component connects to the API
 *          and with its help removes the content from the database and local state.
 */
const ScheduleDeleteModal = (): JSX.Element => {

   const { scheduleModal, setScheduleModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const { scheduleSubjects } = dataFetchFromServer;
   const ifModalOpen = scheduleModal!.ifOpen && scheduleModal!.type === MODAL_TYPES.REMOVE ? modalOpen : '';

   const generateInfos = (): { [value: string]: string } => {
      const scheduleRecord = scheduleSubjects.find((message: any) => message._id === scheduleModal!.id);
      if(scheduleRecord !== undefined) {
         return ({ day: scheduleRecord.day, subject: scheduleRecord.title });
      }
      return { day: '', subject: '' };
   }

   const handleRemoveMessage = async (): Promise<any> => {
      await axiosInstance.delete(`subject-schedule/${scheduleModal!.id}`);
      const copy = [...scheduleSubjects];
      const scheduleAfterRemove = copy.filter(object => object._id !== scheduleModal!.id);
      setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: scheduleAfterRemove });
      setScheduleModal!({ ...scheduleModal!, ifOpen: false });
      await updateLogsDateAsync('schedule', process.env.REACT_APP_SCHEDULE_ID);
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
               Czy na pewno chcesz usunąć przedmiot z dnia {' '}
               <strong className = {deleteSchedule}>{generateInfos().day}</strong> o nazwie:
               <p>{generateInfos().subject}</p>
               z bazy danych? Operacji tej nie można cofnąć.
            </div>
            <div className = {modalWarningButtons}>
               <button onClick = {handleRemoveMessage}>Tak, usuń przedmiot</button>
               <button
                  onClick = {() => setScheduleModal!({ ...scheduleModal!, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default ScheduleDeleteModal;