/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React, { useContext } from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';

import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';

const UniversalHeader = React.lazy(() => import('../../../../../layouts/UniversalHeader/UniversalHeader'));

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
        if (scheduleRecord !== undefined) {
            return ({ day: scheduleRecord.day, subject: scheduleRecord.title });
        }
        return { day: '', subject: '' };
    }

    const handleRemoveMessage = async (): Promise<any> => {
        console.log(scheduleModal!.id);
        await axiosInstance.delete(`subject-schedule/${scheduleModal!.id}`);
        const copy = [ ...scheduleSubjects ];
        const scheduleAfterRemove = copy.filter(object => object._id !== scheduleModal!.id);
        setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: scheduleAfterRemove });
        setScheduleModal!({ ...scheduleModal!, id: '', ifOpen: false });
        await updateLogsDateAsync('schedule', process.env.REACT_APP_SCHEDULE_ID);
    }

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, dangerColorWrapper)}>
                <UniversalHeader
                    iconP = {[ 'fas', 'exclamation-triangle' ]}
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
                    >Nie, zamknij to okno
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ScheduleDeleteModal;