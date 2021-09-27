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
import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';

const { radioContainer, singleRadio, radiomark } = require('./AddChangeSubjectModal.module.scss');

/**
 * @details A rendering component to a form field (modala) a radio type field to select whether the entered/modified
 *          item is completed or continues.
 */
const RadioStatusEnd = (): JSX.Element => {

    const { ifEnd, setIfEnd } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

    const handleRadioButton = (index: number): void => {
        if (index === 0) {
            setIfEnd!([ false, true ]);
        } else {
            setIfEnd!([ true, false ]);
        }
    }

    const generateStatusRadioInputs = Array.from([ 'w trakcie', 'zakończony' ]).map((status, index) => (
        <div key = {status} className = {singleRadio}>
            <input
                checked = {!ifEnd![index]}
                type = 'radio'
                id = {status}
                name = 'subjectsStatus'
                value = {status}
                onChange = {() => handleRadioButton(index)}
            />
            <label htmlFor = {status}>
                {status}
            </label>
            <div className = {radiomark}/>
        </div>
    ));

    return (
        <div className = {radioContainer}>
            {generateStatusRadioInputs}
        </div>
    );
}

export default RadioStatusEnd;