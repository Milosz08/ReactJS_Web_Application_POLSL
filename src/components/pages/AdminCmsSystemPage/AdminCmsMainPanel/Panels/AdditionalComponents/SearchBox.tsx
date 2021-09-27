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

import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

const { insertDataInputField } = require('./../Panels.module.scss');

/**
 * Constant representing the ID value of the input field
 */
const INPUT_ID = uuidv4();

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    inputField: string;
    setInputField: Dispatch<SetStateAction<string>>;
    placeholderProp: string;
}

/**
 * @details Component that renders a search field, where the state of the input is passed in props along with a function
 *          that changes this state and the value in the placeholder.
 *
 * @param inputField { string } - value in input.
 * @param setInputField { Dispatch<SetStateAction<string>> } - function that changes state in input field.
 * @param placeholderProp { string } - value in the placeholder.
 */
const SearchBox: React.FC<PropsProvider> = ({ inputField, setInputField, placeholderProp }): JSX.Element => {
    return (
        <label
            htmlFor = {`${placeholderProp}__id_${INPUT_ID}`}
            className = {insertDataInputField}
        >
            <div>
                <input
                    type = 'text'
                    placeholder = {placeholderProp}
                    value = {inputField}
                    onChange = {({ target }) => setInputField(target.value)}
                    id = {`${placeholderProp}__id_${INPUT_ID}`}
                />
                <button
                    onClick = {() => setInputField('')}
                    title = 'Wyczyść pole'
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'trash-alt' ]}
                    />
                </button>
            </div>
        </label>
    );
}

export default SearchBox;