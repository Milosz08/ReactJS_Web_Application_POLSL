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
import classnames from 'classnames';
import { GlobalModalsStateContext, GlobalModalsStateTypes } from '../../../../contextStore/GlobalModalsStateProvider';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const {
    scheduleSaveContainer, scheduleSaveWrapper, active, scheduleSaveContent, whenCloseWindow, show
} = require('./AcceptScheduleChoiceModal.module.scss');

/**
 * A constant that describes the number of seconds after which the modal will close automatically.
 */
const COUNTING_VALUE: number = 3;

/**
 * @details Component responsible for generating the modal with information about the saved timetable selection to the cookie
 *          file. After installing the component, a timer is started automatically, which after counting down the time
 *          according to the constant "COUNTING_VALUE" closes the modal.
 */
const AcceptScheduleChoiceModal = (): JSX.Element => {

    const { onSaveOpenModal, setOnSaveOpenModal } = useContext<Partial<GlobalModalsStateTypes>>(GlobalModalsStateContext);

    const [ counting, setCounting ] = useState<number>(COUNTING_VALUE);
    const [ containerVisible, setContainerVisible ] = useState<string>('');
    const [ animShow, setAnimShow ] = useState<string>('');

    useEffect(() => {
        if (onSaveOpenModal) {
            let count: number = COUNTING_VALUE;
            let index: NodeJS.Timeout;
            const asyncLoadingBar = () => {
                setCounting(--count);
                if (count === 0) {
                    clearInterval(index);
                    setOnSaveOpenModal!(false);
                    setAnimShow('');
                    setTimeout(() => setContainerVisible(''), 200);
                }
            }
            index = setInterval(asyncLoadingBar, 1000);
            setContainerVisible(show);
            setTimeout(() => setAnimShow(active), 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ onSaveOpenModal ]);

    return (
        <div className = {classnames(scheduleSaveContainer, containerVisible, animShow)}>
            <div className = {classnames(scheduleSaveWrapper, animShow)}>
                <UniversalHeader
                    iconP = {[ 'fas', 'info-circle' ]}
                    content = 'Informacja'
                    ifCloseButtonVisible = {false}
                />
                <span className = {scheduleSaveContent}>
               Twój wybór został zapisany. Przy kolejnym wejściu na stronę, aplikacja automatycznie ustawi
               wybrane przez Ciebie preferencje.
            </span>
                <span className = {whenCloseWindow}>
               Okno zamknie się automatycznie za: <strong>{counting}</strong>
            </span>
            </div>
        </div>
    );
}

export default AcceptScheduleChoiceModal;