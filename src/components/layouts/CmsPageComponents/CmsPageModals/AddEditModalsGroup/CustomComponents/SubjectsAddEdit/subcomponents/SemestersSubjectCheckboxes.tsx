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

import { SemestersElementsWrapper, SingleSemesterElementWrapper } from '../SubjectsAddEdit.styles';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';
import { SUBJECTS_SEMESTERS } from '../../../../../../../../helpers/structs/cmsSystem.config';

const UniversalCheckboxInput = React.lazy(() => import('../../../../../../UniversalCheckboxInput/UniversalCheckboxInput'));

/**
 * Component reponsible for generating subcomponents provides adding all semesters into added/editing subject.
 */
const SemestersSubjectCheckboxes: React.FC = (): JSX.Element => {

    const { subjectsModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { semesters } = subjectsModal.modalInputFields!;

    const dispatcher = useDispatch();

    const findElms = semesters.map((el: any) => el.identity);

    const handleCheckboxInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if(target.checked) {
            dispatcher(ModalsActions.addElementIntoArray(allModals.SUBJECT_MODAL, allModalsInputs.SEMESTERS, {
                identity: target.id, name: target.name
            }));
        } else {
            const findIdx = semesters.findIndex((el: any) => el.identity === target.id && el.name === target.name);
            dispatcher(ModalsActions.removeElementFromArray(allModals.SUBJECT_MODAL, allModalsInputs.SEMESTERS, findIdx));
        }
    };

    const generateSemesters = Array.from(Array(7).keys()).map(el => (
        <SingleSemesterElementWrapper
            key = {el}
        >
            <UniversalCheckboxInput
                ifChecked = {findElms.find((idx: number) => idx - 1 === el)}
                changeCheckedCallback = {handleCheckboxInput}
                id = {el + 1}
                name = {SUBJECTS_SEMESTERS[el]}
                labelContent = {`Semestr ${el + 1}`}
            />
        </SingleSemesterElementWrapper>
    ));

    return (
        <SemestersElementsWrapper
            $ifError = {errorField}
        >
            {generateSemesters}
        </SemestersElementsWrapper>
    );
};

export default SemestersSubjectCheckboxes;