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

import { SubjectSingleListElementContainer } from '../SubjectsAddEdit.styles';

const UniversalSelectInput = React.lazy(() => import('../../../../../../UniversalSelectInput/UniversalSelectInput'));
const UniversalInputForArrays = React.lazy(() => import('../../../../../../UniversalInputWithButton/UniversalInputForArrays'));

interface PropsProvider {
    tileIdx: number;
}

/**
 * Component reponsible for generating custom content for subject classes options.
 *
 * @param tileIdx { number } - element ID.
 */
const SubjectClassesSingleListElement: React.FC<PropsProvider> = ({ tileIdx }): JSX.Element => (
    <SubjectSingleListElementContainer>
        <UniversalSelectInput
            allOptions = {CLASSES_OPTIONS.TYPES}
            defaultOption = 'typ zajęć'
            modalType = {allModals.SUBJECT_MODAL}
            arrayFieldType = {allModalsInputs.CLASSES}
            inputFieldType = {allModalsInputs.TYPE}
            itemIndex = {tileIdx}
        />
        <UniversalSelectInput
            allOptions = {CLASSES_OPTIONS.PLATFORMS}
            defaultOption = 'miejsce'
            modalType = {allModals.SUBJECT_MODAL}
            arrayFieldType = {allModalsInputs.CLASSES}
            inputFieldType = {allModalsInputs.PLACE}
            itemIndex = {tileIdx}
            extraTopBottomMargin = {true}
        />
        <UniversalInputForArrays
            modalType = {allModals.SUBJECT_MODAL}
            arrayType = {allModalsInputs.CLASSES}
            inputType = {allModalsInputs.LINK}
            arrayIdx = {tileIdx}
            inputMaxLength = {250}
            placeholder = 'Link do PZE'
        />
    </SubjectSingleListElementContainer>
);

export default SubjectClassesSingleListElement;