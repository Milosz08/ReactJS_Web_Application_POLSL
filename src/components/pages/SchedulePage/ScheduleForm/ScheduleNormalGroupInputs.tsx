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

import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';
import GROUPS_STATIC, { NormalGroupsTypes } from '../../../../constants/allGroups';

const { groupRadio, customRadio, radioInputContainer, activeRadio } = require('./ScheduleForm.module.scss');

/**
 * @details Component that generates radio inputs for general group selection.
 *          Data retrieved from context and static TS files.
 */
const ScheduleNormalGroupInputs = (): JSX.Element => {

    const { NORMAL_GROUPS } = GROUPS_STATIC;
    const { groupSelected, setGroupSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

    const generateInputStructure = NORMAL_GROUPS.map((object: NormalGroupsTypes) => {
        const activeRadioClass = groupSelected === object.text
            ? classnames(radioInputContainer, activeRadio) : radioInputContainer;

        return (
            <div key = {object.text} className = {activeRadioClass}>
                <input
                    type = 'radio'
                    id = {object.text}
                    name = 'groups'
                    onChange = {({ target }) => setGroupSelected!(target.id)}
                    checked = {groupSelected === object.text}
                    value = {object.text}
                />
                <label htmlFor = {object.text}>
                    Grupa {object.text}
                </label>
                <div className = {customRadio}/>
            </div>
        );
    });

    return (
        <div className = {groupRadio}>
            {generateInputStructure}
        </div>
    );
}

export default ScheduleNormalGroupInputs;