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

import React, { useContext, useEffect, useState } from 'react';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';
import updateDate from '../../../../../../constants/updateLogsDateAsync';

const {
    setScheduleBreakContainer, checkboxWrapper, sendData, checkmark, checkboxContainer, active
} = require('./../SchedulePanel.module.scss');

/**
 * @details Component responsible for generating a field to change the activity of the plan activity (hiding a
 *          plan in case of science breaks).
 */
const SetScheduleBreak = (): JSX.Element => {

    const { summerBreak, setSummerBreak } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const [ checkbox, setCheckbox ] = useState<boolean>(false);
    const [ unwriteChanges, setUnwriteChanges ] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setUnwriteChanges(false);
        updateDate('schedule', process.env.REACT_APP_SCHEDULE_ID, true, checkbox);
        setSummerBreak!(checkbox);
    }

    const handleCheckbox = (): void => {
        setUnwriteChanges(true);
        setSummerBreak!(checkbox);
        setCheckbox(prevState => !prevState);
    }

    useEffect(() => {
        if (summerBreak !== undefined) {
            setCheckbox(summerBreak!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className = {setScheduleBreakContainer}>
            <form onSubmit = {handleSubmit}>
                <div className = {checkboxContainer}>
                    <div className = {checkboxWrapper}>
                        <input
                            type = 'checkbox'
                            id = 'summerBreak'
                            checked = {checkbox}
                            onChange = {handleCheckbox}
                        />
                        <span className = {checkmark}/>
                        <label htmlFor = 'summerBreak'>
                            {checkbox ? 'Plan zajęć wyłączony (brak zajęć)' : 'Plan zajęć włączony'}
                        </label>
                    </div>
                    <p>Aby wyłączyć plan zajęć (przerwa międzysemetralna, brak zajęć itp.) zaznacz pole.</p>
                </div>
                <div className = {sendData}>
                    <p className = {unwriteChanges ? active : ''}>Uwaga! Masz niezapisane zmiany.</p>
                    <button>Zapisz zmiany</button>
                </div>
            </form>
        </div>
    );
}

export default SetScheduleBreak;