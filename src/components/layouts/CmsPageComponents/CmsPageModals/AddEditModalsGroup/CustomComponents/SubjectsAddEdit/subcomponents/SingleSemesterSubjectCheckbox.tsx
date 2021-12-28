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

import { SUBJECTS_SEMESTERS } from '../../../../../../../../helpers/structs/cmsSystem.config';
import useValidateAddEditCmsModal from '../../../../../../../../helpers/hooks/useValidateAddEditCmsModal';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { SingleSemesterElementWrapper } from '../SubjectsAddEdit.styles';

const UniversalCheckboxInput = React.lazy(() => import('../../../../../../UniversalCheckboxInput/UniversalCheckboxInput'));

interface PropsProvider {
    idx: number;
    ifActive: boolean;
}

/**
 * Component responsible for generating single semester checkbox element.
 *
 * @param idx { number } - semester index.
 * @param ifActive { boolean } - flag decided, if semester is active (from redux store).
 */
const SingleSemesterSubjectCheckbox: React.FC<PropsProvider> = ({ idx, ifActive }): JSX.Element => {

    const { subjectsModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { semesters } = subjectsModal.modalInputFields!;

    const { clearSelectedInput } = useValidateAddEditCmsModal(allModals.SUBJECT_MODAL);
    const dispatcher = useDispatch();

    const handleCheckboxInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if(target.checked) {
            dispatcher(ModalsActions.addElementIntoArray(allModals.SUBJECT_MODAL, allModalsInputs.SEMESTERS, {
                identity: Number(target.id) + 1, name: target.name
            }));
        } else {
            const findMathIdx = semesters.findIndex((el: any) => el.identity === Number(target.id) + 1);
            dispatcher(ModalsActions.removeElementFromArray(allModals.SUBJECT_MODAL, allModalsInputs.SEMESTERS, findMathIdx));
        }
        clearSelectedInput(allModalsInputs.SEMESTERS);
    };

    return (
        <SingleSemesterElementWrapper
            key = {idx}
        >
            <UniversalCheckboxInput
                ifChecked = {ifActive}
                changeCheckedCallback = {handleCheckboxInput}
                id = {idx}
                name = {SUBJECTS_SEMESTERS[idx]}
                labelContent = {`Semestr ${idx + 1}`}
            />
        </SingleSemesterElementWrapper>
    );
};

export default SingleSemesterSubjectCheckbox;