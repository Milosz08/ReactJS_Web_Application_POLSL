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

import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';
import STATIC_OPTIONS from '../../../../../../constants/inputOptions';

const { checkboxContainer, someError, singleCheckboxField, checkmark } = require('./AddChangeSubjectModal.module.scss');

/**
 * @details A checkbox rendering component for selecting the semesters in which the subject is conducted (to
 *          the modal with the form in the admin's CMS panel - the subject adding / editing panel).
 */
const CheckboxSemesters = (): JSX.Element => {

    const { SEMESTERS } = STATIC_OPTIONS;
    const {
        semesters, setSemesters, errors, setErrors
    } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

    const toggleClass = errors!.checkbox ? someError : '';

    const generateSemestersCheckboxInputs = SEMESTERS.map((sem, index) => {

        const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            let updateArray = [ ...semesters! ];
            target.checked ? updateArray[index] = target.value : updateArray[index] = '';
            setErrors!({ ...errors, checkbox: false });
            setSemesters!(updateArray);
        }

        return (
            <div key = {sem} className = {singleCheckboxField}>
                <input
                    checked = {sem === semesters![index]}
                    type = 'checkbox'
                    id = {sem}
                    value = {sem}
                    onChange = {handleChange}
                />
                <label htmlFor = {sem}>{`Semestr ${index + 1}`}</label>
                <div className = {checkmark}/>
            </div>
        )
    });

    return (
        <div className = {classnames(checkboxContainer, toggleClass)}>
            {generateSemestersCheckboxInputs}
        </div>
    );
}

export default CheckboxSemesters;