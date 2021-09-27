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

import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../contextStore/ModalsStateProvider';

import DAYS_AND_MONTHS from '../../../../../constants/daysAndMonths';
import { IMPORTANT_VALUES } from '../Modals/WarningDeleteModal/CalendarDeleteModal';

const SearchBox = React.lazy(() => import('./AdditionalComponents/SearchBox'));

const {
    listNumber, listDate, modifyElement, fasIcon, deleteElement, listSorting, sortById, addNewRecord, sortByDate,
    sortByImportant, sortByCount, listCount, listImportant, importantDot, lowLevel, mediumLevel, highLevel,
    recordsNotExist, infoIcon, panelContainer, panelActive
} = require('./Panels.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * @details Component that generates the management of calendar entries (CMS admin panel).
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const CalendarPanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const [ inputField, setInputField ] = useState<string>('');
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { calendarModal, setCalendarModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
    const { calendarRecords } = dataFetchFromServer;

    // eslint-disable-next-line array-callback-return
    const filteredArray = calendarRecords.filter((calendarRecord: any) => {
        const fullDate = `${calendarRecord.day}/0${calendarRecord.month + 1}/${calendarRecord.year}`
        if (inputField === '') {
            return calendarRecord;
        } else if (fullDate.includes(inputField)) {
            return calendarRecord;
        }
    });

    const convertDate = (monthCallback: number) => {
        return DAYS_AND_MONTHS.MONTHS.find((month: any) => month.id === monthCallback);
    }

    const generateSubjectsList = filteredArray.map((entry: any, index: number) => {
        const generateImportantDots = entry.items.map((dot: any) => {
            const returnCSSstyles = () => {
                switch (dot.importantLevel) {
                    case IMPORTANT_VALUES.LOW:
                        return lowLevel;
                    case IMPORTANT_VALUES.MEDIUM:
                        return mediumLevel;
                    case IMPORTANT_VALUES.HIGH:
                        return highLevel;
                    default:
                        return undefined;
                }
            }
            return <div className = {`${importantDot} ${returnCSSstyles()}`} key = {uuidv4()}/>;
        });

        return (
            <li key = {uuidv4()}>
                <span className = {listNumber}>{index + 1}</span>
                <span className = {listDate}>{entry.day} {convertDate(entry.month)!.name} {entry.year}</span>
                <span className = {listCount}>{entry.items.length}</span>
                <span className = {listImportant}>{generateImportantDots}</span>
                <button
                    className = {modifyElement}
                    onClick = {() => setCalendarModal!({ id: entry._id, type: MODAL_TYPES.EDIT, ifOpen: true })}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'edit' ]}
                        className = {fasIcon}
                        title = 'Modyfikuj rekord'
                    />
                </button>
                <button
                    className = {deleteElement}
                    onClick = {() => setCalendarModal!({ id: entry._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'times' ]}
                        className = {fasIcon}
                        title = 'Usuń rekord'
                    />
                </button>
            </li>
        );
    });

    const toggleClass = activeNavElm === 4 ? panelActive : '';

    return (
        <div className = {classnames(panelContainer, toggleClass)}>
            <h2>Dodawanie, Usuwanie i Modyfikowanie wpisów kalendarza</h2>
            <SearchBox
                inputField = {inputField}
                setInputField = {setInputField}
                placeholderProp = '(dd/mm/yyyy)'
            />
            <ul>
                <li className = {listSorting}>
                    <span className = {sortById}>id</span>
                    <span className = {sortByDate}>data</span>
                    <span className = {sortByCount}>ilość</span>
                    <span className = {sortByImportant}>ważność</span>
                </li>
                {generateSubjectsList}
                {calendarRecords.length === 0 && <div className = {recordsNotExist}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'info-circle' ]}
                        className = {infoIcon}
                    />
                    <p>Brak wpisów kalendarza</p>
                </div>}
                <button
                    className = {addNewRecord}
                    onClick = {() => setCalendarModal!({ ...calendarModal!, type: MODAL_TYPES.ADD, ifOpen: true })}
                >Dodaj nowy wpis/wpisy
                </button>
            </ul>
        </div>
    );
}

export default CalendarPanel;