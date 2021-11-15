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
import axiosInstance from '../../../../../../helpers/misc/request';
import classnames from 'classnames';

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import { FormScheduleModalContext, FormScheduleModalTypes } from '../../../../../../contextStore/FormScheduleModalProvider';

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
    const { setAllSubjects } = useContext<Partial<FormScheduleModalTypes>>(FormScheduleModalContext);

    const { subjectsData, scheduleSubjects } = dataFetchFromServer;
    const ifModalOpen = subjectModal!.ifOpen && subjectModal!.type === MODAL_TYPES.REMOVE ? modalOpen : '';

    const getSearchSubjectTitle = (): string => {
        const subjectDataFilter = subjectsData.find((subject: any) => subject._id === subjectModal!.id);
        if (subjectDataFilter !== undefined) {
            return subjectDataFilter.title;
        } else {
            return '';
        }
    }

    const handleRemoveSubject = async (): Promise<any> => {
        await axiosInstance.delete(`subjects-data/${subjectModal!.id}`);
        const subjectsAfterRemove = [ ...subjectsData ].filter((subject: any) => subject._id !== subjectModal!.id);
        const findSubject = [ ...subjectsData ].find((subject: any) => subject._id === subjectModal!.id);
        const scheduleAfterDeleteRecord = [ ...scheduleSubjects ].filter((item: any) => item.title !== findSubject.title);
        const scheduleFindTitle = [ ...scheduleSubjects ].find((schedule: any) => schedule.title === findSubject.title);
        setAllSubjects!(subjectsAfterRemove);
        setDataFetchFromServer({
            ...dataFetchFromServer,
            subjectsData: subjectsAfterRemove, scheduleSubjects: scheduleAfterDeleteRecord
        });
        setSubjectModal!({ ...subjectModal!, ifOpen: false });
        if (scheduleFindTitle !== undefined) {
            await axiosInstance.delete(`subject-schedule/${scheduleFindTitle._id}`);
            await updateLogsDateAsync('schedule', process.env.REACT_APP_SCHEDULE_ID);
        }
        await updateLogsDateAsync('subjects', process.env.REACT_APP_SUBJECTS_ID);

    }

    const handleExitModal = () => setSubjectModal!({ id: '', type: MODAL_TYPES.EDIT, ifOpen: false });

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, dangerColorWrapper)}>
                {/*<UniversalHeader*/}
                {/*    iconP = {[ 'fas', 'exclamation-triangle' ]}*/}
                {/*    content = 'Usuwanie Przedmiotu'*/}
                {/*    ifCloseButtonVisible = {false}*/}
                {/*/>*/}
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