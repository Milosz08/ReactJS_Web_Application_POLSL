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

import GROUPS_STATIC from '../../../../constants/allGroups';
import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';

const { englishRadio, customRadio, radioInputContainer, activeRadio } = require('./ScheduleForm.module.scss');

/**
 * @details Component that generates radio inputs to choose from the English group. Data retrieved
 *          from context and static TS files.
 */
const ScheduleEngInputs = (): JSX.Element => {

    const { ENG_GROUPS } = GROUPS_STATIC;
    const { engSelected, setEngSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

    const generateInputStructure = ENG_GROUPS.map((record: string): JSX.Element => {
        const activeRadioInput = engSelected === record ? classnames(radioInputContainer, activeRadio) : radioInputContainer;

        return (
            <div key = {record} className = {activeRadioInput}>
                <input
                    type = 'radio'
                    id = {record}
                    name = 'eng'
                    onChange = {e => setEngSelected!(e.target.id)}
                    checked = {engSelected === record}
                    value = {engSelected}
                />
                <label htmlFor = {record}>
                    Grupa {record.toLocaleUpperCase()}
                </label>
                <div className = {customRadio}/>
            </div>
        );
    });

    return (
        <div className = {englishRadio}>
            {generateInputStructure}
        </div>
    );
}

export default ScheduleEngInputs;