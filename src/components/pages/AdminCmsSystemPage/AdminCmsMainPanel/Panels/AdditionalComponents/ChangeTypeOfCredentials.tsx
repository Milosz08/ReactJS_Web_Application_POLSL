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
import { CREDENTIALS } from './ChangeCredentials';
import classnames from 'classnames';

const { changeAuthTypeContainer, authRadio } = require('./../HomePanel.module.scss');
const { radiomark, singleRadio } = require('./../../Modals/AddChangeSubjectModal/AddChangeSubjectModal.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    credential: number;
    callback: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component responsible for toggling authentication change for administrator/moderator account
 *          (available only from level 2 - main system administrator level).
 *
 * @param credential { enum } - authentication level.
 * @param callback { Dispatch<SetStateAction<number>> } - change the authentication level.
 */
const ChangeTypeOfCredentials: React.FC<PropsProvider> = ({ credential, callback }) => (
    <div className = {changeAuthTypeContainer}>
        <div className = {classnames(singleRadio, authRadio)}>
            <input
                type = 'radio'
                id = 'range2'
                name = 'rangeFields'
                checked = {credential === CREDENTIALS.MODERATOR}
                onChange = {() => callback(CREDENTIALS.MODERATOR)}
            />
            <label htmlFor = 'range2'>Moderator</label>
            <div className = {radiomark}/>
        </div>
        <div className = {classnames(singleRadio, authRadio)}>
            <input
                type = 'radio'
                id = 'range1'
                name = 'rangeFields'
                checked = {credential === CREDENTIALS.ADMIN}
                onChange = {() => callback(CREDENTIALS.ADMIN)}
            />
            <label htmlFor = 'range1'>Administrator</label>
            <div className = {radiomark}/>
        </div>
    </div>
);

export default ChangeTypeOfCredentials;