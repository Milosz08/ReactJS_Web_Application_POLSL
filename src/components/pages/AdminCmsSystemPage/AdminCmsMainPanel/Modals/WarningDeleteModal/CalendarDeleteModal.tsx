import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../../../../../../helpers/request';

import { MainStoreContext } from "../../../../../../contextStore/MainStoreContext";
import { ModalsStateContext } from "../../../../../../contextStore/ModalsStateProvider";

import { MODAL_TYPES } from "../../../../../../contextStore/ModalsStateProvider";
import classnames from "classnames";
import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";

const {
   modalContainer, modalWrapper, modalWarningInfo, modalWarningButtons, modalOpen,
} = require('./WarningDeleteModal.module.scss');

/**
 *
 */
const CalendarDeleteModal = () => {

   const { calendarModal, setCalendarModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);

   const ifModalOpen = calendarModal.ifOpen && calendarModal.type === MODAL_TYPES.REMOVE ? modalOpen : '';
   const { calendarRecords } = dataFetchFromServer

   const handleRemoveSubject = async () => {
      await axiosInstance.delete(`calendar-record/${calendarModal.id}`);
      const copy = [...calendarRecords];
      const subjectsAfterRemove = copy.filter(object => object._id !== calendarModal.id);
      setDataFetchFromServer({ ...dataFetchFromServer, calendarRecords: subjectsAfterRemove });
      setCalendarModal({ ...calendarModal, ifOpen: false });
   }

   const generateInfos = () => {
      const calendarRecord = calendarRecords.filter((object: any) => object._id === calendarModal.id);

      if(calendarRecord.length !== 0) {
         const day = calendarRecord[0].day < 10 ? `0${calendarRecord[0].day}` : calendarRecord[0].day;
         const month = calendarRecord[0].month < 10 ? `0${calendarRecord[0].month}` : calendarRecord[0].month;
         const fullDate = `${day}/${month}/${calendarRecord[0].year}`;
         const titles = calendarRecord[0].items.map((item: any) => <p key = {uuidv4()}>{item.message}</p>);

         return { fullDate, titles };
      }
      return { fullDate: '', titles: '' };
   }

   return (
      <div className = {classnames(modalContainer, ifModalOpen)}>
         <div className = {modalWrapper}>
            <UniversalHeader
               iconP = {['fas', 'exclamation-triangle']}
               content = 'Usuwanie Aktywności'
               ifCloseButtonVisible = {false}
            />
            <div className = {modalWarningInfo}>
               Czy na pewno chcesz usunąć wpis/y z dnia {generateInfos().fullDate}
               {generateInfos().titles}
               z bazy danych? Operacji tej nie można cofnąć.
            </div>
            <div className = {modalWarningButtons}>
               <button onClick = {handleRemoveSubject}>Tak, usuń aktywność</button>
               <button
                  onClick = {() => setCalendarModal({ ...calendarModal, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default CalendarDeleteModal;