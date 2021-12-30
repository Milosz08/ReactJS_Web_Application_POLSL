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

import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

const UniversalTimeInput = React.lazy(() => import('../../../../../../UniversalTimeInput/UniversalTimeInput'));

interface PropsProvider {
    field: allModalsInputs;
    disableComponent: boolean;
}

/**
 * Component reponsible for generating single time input field (for schedule modal).
 *
 * @param field { allModalsInputs } - selected modal input tile (start or end).
 * @param disableComponent { boolean } - flag decided, if inputs should be disabled.
 */
const SingleTimeScheduleSubjectElement: React.FC<PropsProvider> = ({ field, disableComponent }): JSX.Element => {

    const { scheduleModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const dispatcher = useDispatch();

    const inputField = scheduleModal.modalInputFields![field];
    const errorField = scheduleModal.modalInputErrorsFields![field];

    const handleChangeTime = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if (!disableComponent) {
            dispatcher(ModalsActions.changeModalSelectedInput(allModals.SCHEDULE_MODAL, field, target.value));
        }
    };

    return (
        <>
            <UniversalTimeInput
                timeValue = {inputField}
                changeCallback = {handleChangeTime}
                ifError = {errorField}
                disabledInput = {disableComponent}
            />
        </>
    );
};

export default SingleTimeScheduleSubjectElement;