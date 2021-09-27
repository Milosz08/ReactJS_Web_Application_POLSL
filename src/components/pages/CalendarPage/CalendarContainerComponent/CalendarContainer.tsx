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

import React, { Fragment, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../contextStore/MainStoreProvider';
import { IMPORTANT_VALUES } from '../../AdminCmsSystemPage/AdminCmsMainPanel/Modals/WarningDeleteModal/CalendarDeleteModal';
import getSingleDateObjects from '../../../../constants/getSingleDateObjects';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));
const CalendarStructure = React.lazy(() => import('../CalendarStructure'));

const { universalHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
    underInfo, mobileInfo, calendarStructureAndModal, closeModal, dateInfoModal, modalActive, oneCalendarTask,
    taskMessage, taskHour, noActivities, emptyIcon, low, medium, high
} = require('./CalendarContainer.module.scss');

/**
 * @details Component responsible for generating calendar structure (logic and data pulling from the main store).
 */
const CalendarContainer = (): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { calendarRecords } = dataFetchFromServer;

    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ date, setDate ] = useState<Date>(new Date());

    const toggleModalVisible = openModal ? classnames(dateInfoModal, modalActive) : dateInfoModal;
    const { day, month } = getSingleDateObjects(date);

    const generateTasksPerDay = () => {
        const selectClass = (value: string) => {
            switch (value) {
                case IMPORTANT_VALUES.LOW:
                    return low;
                case IMPORTANT_VALUES.MEDIUM:
                    return medium;
                case IMPORTANT_VALUES.HIGH:
                    return high;
            }
        }

        const filteredRecord = calendarRecords.find((record: any) => (
            record.day === date.getDate() && record.month === date.getMonth() && record.year === date.getFullYear()
        ));

        if (filteredRecord !== undefined) {
            return (
                filteredRecord.items.map((item: any) => (
                    <div className = {classnames(oneCalendarTask, selectClass(item.importantLevel))} key = {item.message}>
                        <h2 className = {taskMessage}>{item.message}</h2>
                        <span className = {classnames(taskHour, selectClass(item.importantLevel))}>Start: {item.start}</span>
                    </div>
                ))
            );
        } else {
            return (
                <div className = {noActivities}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'exclamation-circle' ]}
                        className = {emptyIcon}
                    />
                    Brak aktywności
                </div>
            );
        }
    };

    return (
        <Fragment>
            <section className = {universalHeader}>
                <UniversalHeader
                    iconP = {[ 'fas', 'calendar-alt' ]}
                    content = 'Kalendarz Studenta'
                    ifCloseButtonVisible = {false}
                />
                <p className = {underInfo}>
                    Interaktywny kalendarz z ważnymi datami. Kalendarz posiada możliwość nawigacji przy pomocy
                    strzałek (pojedyncza przenosi o miesiąc, podwójna przenosi o rok). Po kliknięciu w środkowy
                    panel daty kalendarz umożliwia szybki skok do miesiąca/roku/dekady. Kolor żółty na kafelku
                    kalendarza wskazuje aktualny dzień tygodnia.
                </p>
                <p className = {mobileInfo}>
                    Na urządzeniu moblinym kalendarz jest w formie zmimifikowanej. Aby zobaczyć, jakie aktywności
                    kryją się pod poszczególnymi dniami tygonia, kliknik w kafelek, aby otworzyć Modal.
                </p>
            </section>
            <div className = {calendarStructureAndModal}>
                <div className = {toggleModalVisible}>
                    <h2>Aktywności</h2>
                    <span>w dniu: {day}/{month}/{date.getFullYear()}</span>
                    {generateTasksPerDay()}
                    <button
                        className = {closeModal}
                        onClick = {() => setOpenModal(false)}
                        title = 'Zamknij okno'
                    />
                </div>
                <CalendarStructure setOpenModal = {setOpenModal} setDate = {setDate}/>
            </div>
        </Fragment>
    );
};

export default CalendarContainer;