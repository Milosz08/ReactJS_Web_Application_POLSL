import React, {useContext} from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';

import { MODAL_TYPES, ModalsStateContext } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext } from '../../../../../../contextStore/MainStoreContext';

import UniversalHeader from '../../../../../layouts/UniversalHeader/UniversalHeader';
import updateLogsDateAsync from "../../../../../../constants/updateLogsDateAsync";

const {
   modalContainer, modalWrapper, modalOpen, modalWarningInfo, modalWarningButtons, deleteSchedule, dangerColorWrapper
} = require('./WarningDeleteModal.module.scss');

const ScheduleDeleteModal = () => {

   const { scheduleModal, setScheduleModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);

   const { scheduleSubjects } = dataFetchFromServer;
   const ifModalOpen = scheduleModal.ifOpen && scheduleModal.type === MODAL_TYPES.REMOVE ? modalOpen : '';

   const generateInfos = () => {
      const scheduleRecord = scheduleSubjects.find((message: any) => message._id === scheduleModal.id);
      if(scheduleRecord !== undefined) {
         return ({ day: scheduleRecord.day, subject: scheduleRecord.title });
      }
      return { day: '', subject: '' };
   }

   const handleRemoveMessage = async () => {
      await axiosInstance.delete(`subject-shedule/${scheduleModal.id}`);
      const copy = [...scheduleSubjects];
      const scheduleAfterRemove = copy.filter(object => object._id !== scheduleModal.id);
      setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: scheduleAfterRemove });
      setScheduleModal({ ...scheduleModal, ifOpen: false });
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
                  onClick = {() => setScheduleModal({ ...scheduleModal, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default ScheduleDeleteModal;