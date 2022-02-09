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

import { TitleAndIconContainer } from '../../HelpersLinksAddEdit/HelpersLinksAddEdit.styles';
import { SubjectSingleModalAutoGrowElement } from '../SubjectsAddEdit.styles';

const IconPickerComponent = React.lazy(() => import('../../../HighOrderComponents/IconPickerComponent'));
const UniversalInputWithButton = React.lazy(() => import('../../../../../../../reusable/UniversalInputWithButton/UniversalInputWithButton'));

/**
 * Component responsible for inserting title and custom icon into new/editable subject element.
 */
const TitleAndIconSubjectInputs: React.FC = (): JSX.Element => (
    <TitleAndIconContainer>
        <IconPickerComponent
            modalType = {allModals.SUBJECT_MODAL}
        />
        <SubjectSingleModalAutoGrowElement>
            <UniversalInputWithButton
                modalType = {allModals.SUBJECT_MODAL}
                inputType = {allModalsInputs.TITLE}
                inputMaxLength = {50}
                placeholder = 'Tytuł przedmiotu (min 3 znaki)'
            />
        </SubjectSingleModalAutoGrowElement>
    </TitleAndIconContainer>
);

export default TitleAndIconSubjectInputs;