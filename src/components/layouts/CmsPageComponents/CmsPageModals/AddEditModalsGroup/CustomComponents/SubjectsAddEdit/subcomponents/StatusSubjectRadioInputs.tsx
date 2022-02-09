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
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { StatusElementsWrapper } from '../SubjectsAddEdit.styles';

const UniversalRadioInput = React.lazy(() => import('../../../../../../../reusable/UniversalRadioInput/UniversalRadioInput'));

/**
 * Component responsible for generating subcomponents provides change subject state.
 */
const StatusSubjectRadioInputs: React.FC = (): JSX.Element => {

    const { subjectsModal }: ModalsInitialTypes = useSelector(((state: RootState) => state.modalsReducer));
    const dispatcher = useDispatch();

    const [ checked, setChecked ] = useState<boolean>(subjectsModal.modalInputFields!.ifEnd);

    const handleRadioInput = (): void => {
        setChecked(prevState => !prevState);
        dispatcher(ModalsActions.changeModalSelectedInput(allModals.SUBJECT_MODAL, allModalsInputs.IF_END, !checked));
    };

    const generateRadioInputs = [ false, true ].map((el, idx) => (
        <UniversalRadioInput
            key = {idx}
            content = {el ? 'zakończony' : 'w trakcie'}
            radioProps = {{
                id: el ? 'zakończony' : 'w trakcie',
                name: 'subjectStatusFields',
                checked: checked === el,
                onChangeCallback: handleRadioInput
            }}
        />
    ));

    return (
        <StatusElementsWrapper
            $ifError = {false}
        >
            {generateRadioInputs}
        </StatusElementsWrapper>
    );
};

export default StatusSubjectRadioInputs;