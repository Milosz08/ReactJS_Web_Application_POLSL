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

import { SemestersElementsWrapper } from '../SubjectsAddEdit.styles';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';

const SingleSemesterSubjectCheckbox = React.lazy(() => import('./SingleSemesterSubjectCheckbox'));

/**
 * Component reponsible for generating subcomponents provides adding all semesters into added/editing subject.
 */
const SemestersSubjectCheckboxes: React.FC = (): JSX.Element => {

    const { subjectsModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const findElms = subjectsModal.modalInputFields!.semesters.map((el: any) => Number(el.identity));
    const errorField = subjectsModal.modalInputErrorsFields!.semesters;

    const generateSemesters = Array.from(Array(7).keys()).map(el => (
        <SingleSemesterSubjectCheckbox
            key = {el}
            idx = {el}
            ifActive = {Boolean(findElms.find((idx: number) => idx === Number(el) + 1))}
        />
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