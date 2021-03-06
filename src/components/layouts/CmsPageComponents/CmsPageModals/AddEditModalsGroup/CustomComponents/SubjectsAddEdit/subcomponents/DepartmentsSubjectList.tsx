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

import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { DepartmentsElementsWrapper } from '../SubjectsAddEdit.styles';

const ItemsListMultipleInjection = React.lazy(() => import('../../../HighOrderComponents/ItemsListMultipleInjection'));
const SubjectDepartmentsSingleListElement = React.lazy(() => import('./SubjectDepartmentsSingleListElement'));

/**
 * Component reponsible for generate subcomponents provides adding departments into selected/added subject.
 */
const DepartmentsSubjectList: React.FC = (): JSX.Element => (
    <DepartmentsElementsWrapper>
        <ItemsListMultipleInjection
            modalType = {allModals.SUBJECT_MODAL}
            elementKey = {allModalsInputs.DEPARTMENTS}
            insertObj = {{ title: '', shortName: '', link: '' }}
            insertErrObj = {{ title: false, shortName: false, link: false }}
            CustomComponent = {SubjectDepartmentsSingleListElement}
            addContent = 'wydział'
            ifBorderInactive = {true}
            ifSmallMargins = {true}
            maxInjcts = {3}
        />
    </DepartmentsElementsWrapper>
);

export default DepartmentsSubjectList;