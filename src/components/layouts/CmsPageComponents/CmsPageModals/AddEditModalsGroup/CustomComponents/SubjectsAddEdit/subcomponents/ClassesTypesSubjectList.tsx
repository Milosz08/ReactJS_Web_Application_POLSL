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

import { CLASSES_OPTIONS } from '../../../../../../../../helpers/structs/cmsSystem.config';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { SubjectsTypesElementsWrapper } from '../SubjectsAddEdit.styles';

const ItemsListMultipleInjection = React.lazy(() => import('../../../HighOrderComponents/ItemsListMultipleInjection'));
const SubjectClassesSingleListElement = React.lazy(() => import('./SubjectClassesSingleListElement'));

/**
 * Component responsible for generate subcomponents which provides add classes types into selected/added subject.
 */
const ClassesTypesSubjectList: React.FC = (): JSX.Element => (
    <SubjectsTypesElementsWrapper>
        <ItemsListMultipleInjection
            modalType = {allModals.SUBJECT_MODAL}
            elementKey = {allModalsInputs.CLASSES}
            insertObj = {{ type: 'typ zajęć', place: 'miejsce', link: '' }}
            insertErrObj = {{ type: false, place: false, link: false }}
            CustomComponent = {SubjectClassesSingleListElement}
            addContent = 'typ zajęć'
            ifBorderInactive = {true}
            ifSmallMargins = {true}
            maxInjcts = {CLASSES_OPTIONS.TYPES.length}
        />
    </SubjectsTypesElementsWrapper>
);

export default ClassesTypesSubjectList;