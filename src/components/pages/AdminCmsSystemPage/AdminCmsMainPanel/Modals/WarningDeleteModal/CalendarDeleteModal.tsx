/**
 * @file CalendarDeleteModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                uuid: "^8.3.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';

import { MainStoreContext, MainStoreProviderTypes } from "../../../../../../contextStore/MainStoreProvider";
import { ModalsStateContext, MODAL_TYPES, ModalStateType } from "../../../../../../contextStore/ModalsStateProvider";

import UniversalHeader from '../../../../../layouts/UniversalHeader/UniversalHeader';
import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';

const {
   modalContainer, modalWrapper, modalWarningInfo, modalWarningButtons, modalOpen, dangerColorWrapper,
   calendarWarnInfo, low, medium, high
} = require('./WarningDeleteModal.module.scss');

/**
 * Enumerated type that stores the importance of the calendar entries.
 */
export enum IMPORTANT_VALUES {
   LOW = 'low',
   MEDIUM = 'medium',
   HIGH = 'high'
}

/**
 * @details A modal generating component that allows the deletion of one calendar entry. The component connects to the API
 *          and with its help removes the content from the database and local state.
 */
const CalendarDeleteModal = (): JSX.Element => {

   const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
   const { calendarModal, setCalendarModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

   const ifModalOpen = calendarModal!.ifOpen && calendarModal!.type === MODAL_TYPES.REMOVE ? modalOpen : '';
   const { calendarRecords } = dataFetchFromServer;

   const handleRemoveSubject = async (): Promise<any> => {
      await axiosInstance.delete(`calendar-record/${calendarModal!.id}`);
      const copy = [...calendarRecords];
      const subjectsAfterRemove = copy.filter(object => object._id !== calendarModal!.id);
      setDataFetchFromServer({ ...dataFetchFromServer, calendarRecords: subjectsAfterRemove });
      setCalendarModal!({ ...calendarModal!, ifOpen: false });
      await updateLogsDateAsync('calendar', process.env.REACT_APP_CALENDAR_ID);
   }

   const importantClassReturn = (value: string): string => {
      switch(value) {
         case IMPORTANT_VALUES.LOW:    return low;
         case IMPORTANT_VALUES.MEDIUM: return medium;
         case IMPORTANT_VALUES.HIGH:   return high;
         default:                      throw new Error('Unexpected IMPORTANT_VALUE type');
      }
   }

   const generateInfos = (): { [value: string]: string } => {
      const calendarRecord = calendarRecords.find((object: any) => object._id === calendarModal!.id);
      if(calendarRecord !== undefined) {
         const day = calendarRecord.day < 10 ? `0${calendarRecord.day}` : calendarRecord.day;
         const month = calendarRecord.month < 10 ? `0${calendarRecord.month}` : calendarRecord.month;
         const fullDate = `${day}/${month}/${calendarRecord.year}`;
         const titles = calendarRecord.items.map((item: any) => (
            <p
               key = {uuidv4()}
               className = {classnames(calendarWarnInfo, importantClassReturn(item.importantLevel))}
            >{item.message}</p>
         ));
         return { fullDate, titles };
      }
      return { fullDate: '', titles: '' };
   }

   return (
      <div className = {classnames(modalContainer, ifModalOpen)}>
         <div className = {classnames(modalWrapper, dangerColorWrapper)}>
            <UniversalHeader
               iconP = {['fas', 'exclamation-triangle']}
               content = 'Usuwanie Aktywności'
               ifCloseButtonVisible = {false}
            />
            <div className = {modalWarningInfo}>
               Czy na pewno chcesz usunąć {generateInfos().titles.length}
               {generateInfos().titles.length > 1 ? ' wpisy' : ' wpis'} z dnia {generateInfos().fullDate} o treści:
               {generateInfos().titles}
               z bazy danych? Operacji tej nie można cofnąć.
            </div>
            <div className = {modalWarningButtons}>
               <button onClick = {handleRemoveSubject}>Tak, usuń aktywność</button>
               <button
                  onClick = {() => setCalendarModal!({ ...calendarModal!, ifOpen: false })}
               >Nie, zamknij to okno</button>
            </div>
         </div>
      </div>
   );
}

export default CalendarDeleteModal;