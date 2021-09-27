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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';

const {
    departmentsContainer, addNewDepartment, someError, removeInputField, inputContainer
} = require('./AddChangeSubjectModal.module.scss');

/**
 * @details Component rendering the possibility of introducing a new faculty/editing already entered faculties where classes
 *          are held (to the modal with the form in the administrator's CMS panel - the panel for adding/editing subjects).
 */
const DepartmentsInject = (): JSX.Element => {

    const {
        departments, setDepartments, departmentsCount, setDepartmentsCount, errors, setErrors
    } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

    const addNewValueDepartment = () => {
        if (departmentsCount! < 4) {
            setDepartmentsCount!((prevState: number) => prevState + 1);
            let updateArray = [ ...departments! ];
            updateArray.push('');
            setDepartments!(updateArray);
        }
    }

    const toggleClass = errors!.department ? someError : ''
    const generateDepartmentsInputs = Array.from({ length: departmentsCount! }, (v, i) => i).map((str, index) => {

        const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            let newStateArray = [ ...departments! ];
            newStateArray[index] = target.value;
            setErrors!({ ...errors, department: false });
            setDepartments!(newStateArray);
        }

        const handleRemoveField = () => {
            let newStateArray = [ ...departments! ];
            newStateArray.splice(index, 1);
            if (index !== -1) {
                setDepartmentsCount!((prevState: number) => prevState - 1);
                setDepartments!(newStateArray);
            }
        }

        return (
            <div key = {index} className = {inputContainer}>
                <input
                    type = 'text'
                    key = {index}
                    value = {departments![index]}
                    onChange = {handleChange}
                    placeholder = 'Wprowadź nazwę wydziału'
                />
                {index !== 0 && <button
                    type = 'button'
                    onClick = {handleRemoveField}
                    title = 'Usuń pole wprowadzania wydziału'
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'times' ]}
                        className = {removeInputField}
                    />
                </button>}
            </div>
        )
    });

    return (
        <div className = {classnames(departmentsContainer, toggleClass)}>
            {generateDepartmentsInputs}
            <button
                type = 'button'
                className = {addNewDepartment}
                onClick = {addNewValueDepartment}
                title = 'Dodaj nowy wydział'
            >Dodaj nowy wydział (max 4)
            </button>
        </div>
    );
}

export default DepartmentsInject;