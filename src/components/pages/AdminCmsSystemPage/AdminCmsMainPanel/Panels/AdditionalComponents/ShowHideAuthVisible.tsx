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

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { showProtectedField, visibleIcon } = require('./../HomePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    handleVisible: () => void;
    ifVisible: boolean;
}

/**
 * @details Component that generates the button visibility of sensitive data in input fields.
 *
 * @param handleVisible { () => boolean } - state changing function (visible/invisible).
 * @param ifVisible { boolean } - actual state (visible/invisible).
 */
const ShowHideAuthVisible: React.FC<PropsProvider> = ({ handleVisible, ifVisible }): JSX.Element => {
    return (
        <button
            type = 'button'
            onClick = {handleVisible}
            className = {showProtectedField}
        >
            <FontAwesomeIcon
                icon = {[ 'fas', `${ifVisible ? 'eye-slash' : 'eye'}` ]}
                className = {visibleIcon}
            />
        </button>
    );
}

export default ShowHideAuthVisible;