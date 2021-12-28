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

import useFindMatchingElement from '../../../../../../../helpers/hooks/useFindMatchingElement';
import useAutoFilledModalEdit from '../../../../../../../helpers/hooks/useAutoFilledModalEdit';

import { useDispatch } from 'react-redux';
import { apiReducerTypes } from '../../../../../../../redux/apiReduxStore/types';
import { ModalsActions } from '../../../../../../../redux/modalsReduxStore/actions';
import { SubjectsContentTypes } from '../../../../../../../redux/apiReduxStore/dataTypes';
import { initialStateForModalsInputs } from '../../../../../../../redux/modalsReduxStore/singleInitialStates';
import { allModals, allModalsInputs, modalInputHeader } from '../../../../../../../redux/modalsReduxStore/types';

import { AddEditCustomContentContainer } from '../../AddEditContentModal/AddEditContentModal.styles';
import { SemestersAndStatusWrapper, SemestersStatusAndDepartmentsWrapper } from './SubjectsAddEdit.styles';

const TitleAndIconSubjectInputs = React.lazy(() => import('./subcomponents/TitleAndIconSubjectInputs'));
const SemestersSubjectCheckboxes = React.lazy(() => import('./subcomponents/SemestersSubjectCheckboxes'));
const StatusSubjectRadioInputs = React.lazy(() => import('./subcomponents/StatusSubjectRadioInputs'));
const DepartmentsSubjectList = React.lazy(() => import('./subcomponents/DepartmentsSubjectList'));
const ClassesTypesSubjectList = React.lazy(() => import('./subcomponents/ClassesTypesSubjectList'));

/**
 * Component responsible for generating structure of all subject modal subcomponent.
 */
const SubjectsAddEdit: React.FC = (): JSX.Element => {

    const matchElm: SubjectsContentTypes | any = useFindMatchingElement(allModals.SUBJECT_MODAL, apiReducerTypes.SUBJECTS);
    const dispatcher = useDispatch();

    const { addElementIntoArray } = ModalsActions;
    const { SUBJECT_MODAL } = allModals;
    const { TITLE, ICON, IF_END, SEMESTERS, CLASSES, DEPARTMENTS } = allModalsInputs;

    const { semesters: sm, departments: dpt, classesPlatforms: clp } = initialStateForModalsInputs[SUBJECT_MODAL].normal;
    const { departments: dptE, classesPlatforms: clpE } = initialStateForModalsInputs[SUBJECT_MODAL].errors;

    const loadAdditionalContent = (): void => {
        if(matchElm) {
            matchElm!.semesters.forEach((_: any) => {
                dispatcher(ModalsActions.addElementIntoArray(SUBJECT_MODAL, SEMESTERS, sm[0]));
            });
            matchElm!.departments.forEach((_: any) => {
                dispatcher(addElementIntoArray(SUBJECT_MODAL, DEPARTMENTS, dpt[0]));
                dispatcher(addElementIntoArray(SUBJECT_MODAL, DEPARTMENTS, dptE[0], modalInputHeader.ERROR));
            });
            matchElm!.classesPlatforms.forEach((_: any) => {
                dispatcher(addElementIntoArray(SUBJECT_MODAL, CLASSES, clp[0]));
                dispatcher(addElementIntoArray(SUBJECT_MODAL, CLASSES, clpE[0], modalInputHeader.ERROR));
            });
        }
    };

    const filledArr = matchElm ? [
        matchElm.title, matchElm.icon.name, matchElm.ifEnd, matchElm.semesters, matchElm.departments, matchElm.classesPlatforms
    ] : [ '', '', '', '', '', '' ];
    useAutoFilledModalEdit(SUBJECT_MODAL, [ TITLE, ICON, IF_END, SEMESTERS, DEPARTMENTS, CLASSES ], filledArr, loadAdditionalContent);

    return (
        <AddEditCustomContentContainer>
            <TitleAndIconSubjectInputs/>
            <SemestersStatusAndDepartmentsWrapper>
                <SemestersAndStatusWrapper>
                    <SemestersSubjectCheckboxes/>
                    <StatusSubjectRadioInputs/>
                </SemestersAndStatusWrapper>
                <DepartmentsSubjectList/>
            </SemestersStatusAndDepartmentsWrapper>
            <ClassesTypesSubjectList/>
        </AddEditCustomContentContainer>
    );
};

export default SubjectsAddEdit;