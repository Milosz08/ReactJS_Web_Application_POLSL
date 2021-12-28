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