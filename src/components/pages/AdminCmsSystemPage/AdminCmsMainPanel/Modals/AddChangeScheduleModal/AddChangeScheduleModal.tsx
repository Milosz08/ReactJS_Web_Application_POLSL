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

import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import { FormScheduleModalContext, FormScheduleModalTypes } from '../../../../../../contextStore/FormScheduleModalProvider';

import GROUPS_STATIC from '../../../../../../constants/allGroups';
import axiosInstance from '../../../../../../helpers/request';
import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';
import { SubjectsProvider } from '../../../../../layouts/Subjects/Subjects';

const UniversalHeader = React.lazy(() => import('../../../../../layouts/UniversalHeader/UniversalHeader'));
const SelectSubjectList = React.lazy(() => import('./SelectSubjectList'));

const {
    modalContainer, modalWrapper, modalOpen, modalAddWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
    newChangeEntrie, formCalendarButtons, restoreWindow, subjectFormSend
} = require('./../AddChangeCalendarModal/AddChangeCalendarModal.module.scss');

/**
 * Structure of the data types of the object entered into the API with the data entered by the user.
 */
interface NewObjectTypes {
    _id?: string;
    title: string;
    group: string;
    day: string | undefined;
    type: string;
    room: string;
    start: string;
    end: string;
    pzeInfo: { [value: string]: string };
}

/**
 * @details Component generating a modal with a form for entering/editing an item in the item list database.
 *          The component has no input validation (validation is in React Context along with input field states).
 */
const AddChangeScheduleModal = (): JSX.Element => {

    const { scheduleModal, setScheduleModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
    const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const {
        scheduleForm, setScheduleForm, allSubjects, validateAll, setErrors
    } = useContext<Partial<FormScheduleModalTypes>>(FormScheduleModalContext);

    const ifModalOpen = scheduleModal!.ifOpen && scheduleModal!.type !== MODAL_TYPES.REMOVE ? modalOpen : '';
    const headerContent = `Kreator ${scheduleModal!.type !== MODAL_TYPES.EDIT ? 'dodawania' : 'edytowania'} przedmiotu w dniu`;

    const editExistValue = async (newObject: NewObjectTypes) => {
        console.log(scheduleModal!.id);
        const copy = [ ...dataFetchFromServer.scheduleSubjects ];
        await axiosInstance.put(`subject-schedule/${scheduleModal!.id}`, newObject);
        const index = copy.findIndex((x: SubjectsProvider) => x._id === scheduleModal!.id);
        if (index >= 0) {
            copy[index] = newObject;
            setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: copy });
        }
    }

    const addNewValue = async (newObject: NewObjectTypes) => {
        const copy = [ ...dataFetchFromServer.scheduleSubjects ];
        const res = await axiosInstance.post('subject-schedule', newObject);
        const newSubjectInSchedule = res.data;
        copy.push(newSubjectInSchedule);
        setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: copy });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const objErrors = validateAll!();
        if (!objErrors.hourStartBool && !objErrors.hourStartEnd) {
            const copy = [ ...allSubjects! ];
            const { title, group, type, start, end, room } = scheduleForm!;
            const findOneSubject = copy.find((subject: SubjectsProvider) => subject.title === scheduleForm!.title);
            // eslint-disable-next-line array-callback-return
            const findPzePlatform = findOneSubject!.classesPlatforms.find((platform: { [value: string]: string }) => {
                if (platform.type === '' || platform.type === 'Wszystkie Zajęcia') {
                    return findOneSubject!.classesPlatforms[0].place;
                } else if (platform.type === scheduleForm!.type) {
                    return platform;
                }
            });
            const newObject: NewObjectTypes = {
                _id: scheduleModal!.id, title, group, day: scheduleModal!.day, type, start, end, room,
                pzeInfo: { platform: findPzePlatform!.place, pzeLink: findPzePlatform!.link }
            };
            const addNewObject: NewObjectTypes = {
                title, group, day: scheduleModal!.day, type, start, end, room,
                pzeInfo: { platform: findPzePlatform!.place, pzeLink: findPzePlatform!.link }
            };
            if (scheduleModal!.type === MODAL_TYPES.EDIT) {
                editExistValue(newObject);
            } else {
                addNewValue(addNewObject);
            }
            updateLogsDateAsync('schedule', process.env.REACT_APP_SCHEDULE_ID);
            restoreValues();
        } else {
            setErrors!({ hourStart: objErrors.hourStartBool, hourEnd: objErrors.hourEndBool });
        }
    }

    const restoreValues = (): void => {
        setScheduleForm!({
            title: allSubjects![0]?.title,
            group: GROUPS_STATIC.NORMAL_GROUPS[0].field,
            type: allSubjects![0]?.classesPlatforms[0].type,
            room: '',
            start: '',
            end: ''
        });
        setScheduleModal!({ ...scheduleModal!, id: '', ifOpen: false });
    }

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, modalAddWrapper)}>
                <UniversalHeader
                    iconP = {[ 'fas', scheduleModal!.type !== 'edit' ? 'folder-plus' : 'edit' ]}
                    content = {headerContent}
                    ifCloseButtonVisible = {false}
                    addHeaderDayIndicator = {scheduleModal!.day}
                />
                <form className = {newChangeEntrie} onSubmit = {handleSubmit} noValidate>
                    <SelectSubjectList/>
                    <div className = {formCalendarButtons}>
                        <button
                            type = 'button'
                            onClick = {restoreValues}
                            className = {restoreWindow}
                        >
                            Odrzuć zmiany
                        </button>
                        <button className = {subjectFormSend}>
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddChangeScheduleModal;