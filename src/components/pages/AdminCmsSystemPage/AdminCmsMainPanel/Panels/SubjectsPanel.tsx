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

import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { MODAL_TYPES, ModalsStateContext, ModalStateType } from '../../../../../contextStore/ModalsStateProvider';

const SearchBox = React.lazy(() => import('./AdditionalComponents/SearchBox'));

const {
    panelContainer, panelActive, listNumber, listTitle, subjectStatus, modifyElement, deleteElement, fasIcon, infoIcon,
    subjectSemesters, subjectEnd, listSorting, addNewRecord, sortById, sortByName, sortBySem, sortByEnd, recordsNotExist
} = require('./Panels.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * @details Component that generates the subjects management panel in the CMS system.
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const SubjectsPanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { subjectModal, setSubjectModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

    const [ inputField, setInputField ] = useState<string>('');
    const { subjectsData } = dataFetchFromServer;

    // eslint-disable-next-line
    const filteredArray = subjectsData.filter((subject: any) => {
        if (inputField === '') {
            return subject;
        } else if (subject.title.toLocaleLowerCase().includes(inputField.toLocaleLowerCase())) {
            return subject;
        }
    });

    const generateSubjectsList = filteredArray.map((subject: any, index: any) => {
        const toggleClass = subject.ifEnd ? subjectEnd : '';

        const semestersWithoutBlanc = subject.semesters.filter((sem: string) => sem !== '');
        const generateSemesters = semestersWithoutBlanc.map((semester: string, index: number) => (
            index !== semestersWithoutBlanc.length - 1 ? `${semester}, ` : semester)
        );

        return (
            <li key = {uuidv4()}>
                <span className = {listNumber}>{index + 1}</span>
                <span className = {listTitle}>{subject.title}</span>
                <span className = {subjectSemesters}>{generateSemesters}</span>
                <span className = {classnames(subjectStatus, toggleClass)}>
          {subject.ifEnd ? 'zakończony' : 'w trakcie'}
        </span>
                <button
                    className = {modifyElement}
                    onClick = {() => setSubjectModal!({
                        id: subject._id,
                        title: subject.title,
                        type: MODAL_TYPES.EDIT,
                        ifOpen: true
                    })}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'edit' ]}
                        className = {fasIcon}
                        title = 'Modyfikuj rekord'
                    />
                </button>
                <button
                    className = {deleteElement}
                    onClick = {() => setSubjectModal!({ id: subject._id, type: MODAL_TYPES.REMOVE, ifOpen: true })}
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

    const toggleClass = activeNavElm === 2 ? panelActive : '';

    return (
        <div className = {classnames(panelContainer, toggleClass)}>
            <h2>Dodawanie, Usuwanie i Modyfikowanie przedmiotów</h2>
            <SearchBox
                inputField = {inputField}
                setInputField = {setInputField}
                placeholderProp = 'Przedmiot'
            />
            <ul>
                <li className = {listSorting}>
                    <span className = {sortById}>id</span>
                    <span className = {sortByName}>nazwa przemiotu</span>
                    <span className = {sortBySem}>semestry</span>
                    <span className = {sortByEnd}>status</span>
                </li>
                {generateSubjectsList}
                {subjectsData.length === 0 && <div className = {recordsNotExist}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'info-circle' ]}
                        className = {infoIcon}
                    />
                    <p>Brak wprowadzonych przedmiotów</p>
                </div>}
                <button
                    className = {addNewRecord}
                    onClick = {() => setSubjectModal!({ ...subjectModal!, type: MODAL_TYPES.ADD, ifOpen: true })}
                >
                    Dodaj nowy przedmiot
                </button>
            </ul>
        </div>
    );
}

export default SubjectsPanel;