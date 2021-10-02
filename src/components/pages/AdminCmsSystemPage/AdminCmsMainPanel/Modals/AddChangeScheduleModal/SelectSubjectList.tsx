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

import React, { Fragment, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { FormScheduleModalContext, FormScheduleModalTypes } from '../../../../../../contextStore/FormScheduleModalProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import { ModalsStateContext, ModalStateType, MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';

import STATIC_OPTIONS from '../../../../../../constants/inputOptions';
import GROUPS_STATIC, { NormalGroupsTypes } from '../../../../../../constants/allGroups';

const TimeInputsModal = React.lazy(() => import('./TimeInputsModal'));

const {
    titleSelectWrapper, typeSelectWrapper, groupSelectWrapper, groupAndTimeContainer, titleAndTypeContainer,
    timeSelectWrapper, turnOffContainer, selectArrowIcon, selectWrapper, roomInputWrapper
} = require('./AddChangeScheduleModal.module.scss');

/**
 * @details Component that generates input fields in the data entry form to add/edit an item.
 */
const SelectSubjectList = (): JSX.Element => {

    const { scheduleForm, setScheduleForm, allSubjects } = useContext<Partial<FormScheduleModalTypes>>(FormScheduleModalContext);
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { scheduleModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

    const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;
    const filteredSubject = allSubjects!.find((subject: any) => subject.title === scheduleForm!.title);

    const generateOptionsInSelect = allSubjects!.map((subject: any) => (
        <option key = {`${subject.title}__${uuidv4()}`}>{subject.title}</option>
    ));

    const generateTypeOfSubjectOptions = () => {
        if (filteredSubject) {
            const { type } = filteredSubject!.classesPlatforms[0];
            if (type === '' || type.toLocaleLowerCase() === 'wszystkie zajęcia') {
                // eslint-disable-next-line array-callback-return
                return STATIC_OPTIONS.TYPE_OPTIONS.map((type: string) => {
                    if (type.toLocaleLowerCase() !== 'wszystkie zajęcia') {
                        return (
                            <option key = {type} value = {type}>{type}</option>
                        );
                    }
                });
            } else {
                return filteredSubject!.classesPlatforms.map((platform: any) => (
                    <option key = {platform.type} value = {platform.type}>{platform.type}</option>
                ));
            }
        } else {
            return '';
        }
    }

    const generateGroupsOptions = () => {
        if (scheduleForm!.title?.toLocaleLowerCase() !== 'język angielski') {
            const generateOptions = NORMAL_GROUPS.map((group: NormalGroupsTypes) => (
                <option
                    value = {group.field}
                    key = {group.field}
                >Grupa {group.text}</option>
            ))
            return (
                <Fragment>
                    {generateOptions}
                    <option key = 'all' value = 'all'>Wszyscy</option>
                </Fragment>
            );
        } else {
            return ENG_GROUPS.map((group: string) => (
                <option
                    value = {group}
                    key = {group}
                >Grupa {group.toUpperCase()}
                </option>
            ));
        }
    }

    const hourRestructurised = (hour: string): string => {
        const replaceStr = hour.replace(':', '');
        const hourInt = parseInt(replaceStr);
        return hourInt < 10 && hourInt !== 0 ? `0${hour}` : hour;
    }

    useEffect(() => {
        if (scheduleModal!.id) {
            const { scheduleSubjects } = dataFetchFromServer;
            const shellingObject = scheduleSubjects.find((subject: any) => subject._id === scheduleModal!.id);
            if (shellingObject !== undefined) {
                let { title, group, room, type, start, end } = shellingObject;
                if (scheduleModal!.type === MODAL_TYPES.EDIT) {
                    setScheduleForm!({
                        title, group, type, room, start: hourRestructurised(start), end: hourRestructurised(end)
                    });
                } else if (scheduleModal!.type === MODAL_TYPES.ADD) {
                    setScheduleForm!({
                        title: allSubjects![0].title,
                        group: GROUPS_STATIC.NORMAL_GROUPS[0].field,
                        type: allSubjects![0].classesPlatforms[0].type,
                        room: '',
                        start: '',
                        end: ''
                    });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ allSubjects, scheduleModal ]);

    const selectGroup = (): string => {
        if (scheduleForm!.title?.toLocaleLowerCase() === 'język angielski') {
            return GROUPS_STATIC.ENG_GROUPS[0];
        } else {
            return GROUPS_STATIC.NORMAL_GROUPS[0].field;
        }
    }

    const selectType = () => {
        if (allSubjects!.length !== 0) {
            const oneSubject = allSubjects!.find((subject: any) => subject.title === scheduleForm!.title);
            const { classesPlatforms } = oneSubject!;
            if (classesPlatforms[0].type === '' || classesPlatforms[0].type === 'Wszystkie Zajęcia') {
                return 'Wykłady';
            } else {
                return oneSubject!.classesPlatforms[0].type;
            }
        } else {
            return 'Wykłady';
        }
    }

    useEffect(() => {
        setScheduleForm!({ ...scheduleForm, group: selectGroup(), type: selectType() });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ scheduleForm!.title ]);

    const classTurnOff = scheduleModal!.type === MODAL_TYPES.EDIT ? turnOffContainer : '';

    return (
        <Fragment>
            <div className = {titleAndTypeContainer}>
                <div className = {classnames(titleSelectWrapper, classTurnOff)}>
                    <div className = {selectWrapper}>
                        <select
                            value = {scheduleForm!.title}
                            onChange = {({ target }) => setScheduleForm!({ ...scheduleForm, title: target.value })}
                        >
                            {generateOptionsInSelect}
                        </select>
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'chevron-down' ]}
                            className = {selectArrowIcon}
                        />
                    </div>
                    <p>
                        Pole nie jest możliwe do edycji. Jeśli chcesz wprowadzić nowy przedmiot, kliknij w przycisk
                        "dodaj nowy przedmiot".
                    </p>
                </div>
                <div className = {typeSelectWrapper}>
                    <div className = {selectWrapper}>
                        <select
                            value = {scheduleForm!.type}
                            onChange = {({ target }) => setScheduleForm!({ ...scheduleForm, type: target.value })}
                        >
                            {generateTypeOfSubjectOptions()}
                        </select>
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'chevron-down' ]}
                            className = {selectArrowIcon}
                        />
                    </div>
                </div>
            </div>

            <div className = {groupAndTimeContainer}>
                <div className = {groupSelectWrapper}>
                    <div className = {selectWrapper}>
                        <select
                            value = {scheduleForm!.group}
                            onChange = {({ target }) => setScheduleForm!({ ...scheduleForm, group: target.value })}
                        >
                            {generateGroupsOptions()}
                        </select>
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'chevron-down' ]}
                            className = {selectArrowIcon}
                        />
                    </div>
                </div>
                <div className = {roomInputWrapper} >
                    <input
                        type = 'text'
                        value = {scheduleForm!.room}
                        onChange = {({ target }) => setScheduleForm!({ ...scheduleForm, room: target.value })}
                    />
                </div>
                <div className = {timeSelectWrapper}>
                    <TimeInputsModal/>
                </div>
            </div>
        </Fragment>
    );
}

export default SelectSubjectList;