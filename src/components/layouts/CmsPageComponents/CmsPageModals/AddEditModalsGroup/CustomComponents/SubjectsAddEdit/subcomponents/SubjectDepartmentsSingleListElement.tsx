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

import {
    SubjectSingleListElementContainer, SubjectSingleListElementWrapper, SubjectSingleListTitleAndShortWrapper,
} from '../SubjectsAddEdit.styles';

const UniversalInputForArrays = React.lazy(() => import('../../../../../../../reusable/UniversalInputWithButton/UniversalInputForArrays'));

interface PropsProvider {
    tileIdx: number;
}

/**
 * Component reponsible for generating custom inputs structure for insert departments in subject modal.
 *
 * @param tileIdx { number } - element ID.
 */
const SubjectDepartmentsSingleListElement: React.FC<PropsProvider> = ({ tileIdx }): JSX.Element => (
    <SubjectSingleListElementContainer
        disableFlex = {true}
    >
        <SubjectSingleListTitleAndShortWrapper>
            <UniversalInputForArrays
                modalType = {allModals.SUBJECT_MODAL}
                arrayType = {allModalsInputs.DEPARTMENTS}
                inputType = {allModalsInputs.TITLE}
                arrayIdx = {tileIdx}
                inputMaxLength = {50}
                placeholder = 'Nazwa wydziału'
            />
            <UniversalInputForArrays
                modalType = {allModals.SUBJECT_MODAL}
                arrayType = {allModalsInputs.DEPARTMENTS}
                inputType = {allModalsInputs.SHORT}
                arrayIdx = {tileIdx}
                inputMaxLength = {5}
                placeholder = 'Skrót'
                ifExtraRightLeft = {true}
            />
        </SubjectSingleListTitleAndShortWrapper>
        <SubjectSingleListElementWrapper
            extraMargin = {true}
        >
            <UniversalInputForArrays
                modalType = {allModals.SUBJECT_MODAL}
                arrayType = {allModalsInputs.DEPARTMENTS}
                inputType = {allModalsInputs.LINK}
                arrayIdx = {tileIdx}
                inputMaxLength = {250}
                placeholder = 'Link do PZE'
            />
        </SubjectSingleListElementWrapper>
    </SubjectSingleListElementContainer>
);

export default SubjectDepartmentsSingleListElement;