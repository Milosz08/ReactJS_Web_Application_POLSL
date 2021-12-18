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

import { HelperSingleLinkModalElement, TitleAndIconContainer } from '../HelpersLinksAddEdit.styles';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

const UniversalInputWithButton = React.lazy(() => import('../../../../../../UniversalInputWithButton/UniversalInputWithButton'));
const IconPickerComponent = React.lazy(() => import('../../../HighOrderComponents/IconPickerComponent'));

/**
 * Component responsible for generate structure for helpersLinksInputs in helpersLinksModal element.
 */
const HelpersLinksInputs: React.FC = (): JSX.Element => (
    <TitleAndIconContainer>
        <HelperSingleLinkModalElement>
            <UniversalInputWithButton
                modalType = {allModals.HELPERS_LINKS_MODAL}
                inputType = {allModalsInputs.TITLE}
                inputMaxLength = {30}
                placeholder = 'Wyświetlany tytuł linku (min 3 znaki)'
            />
        </HelperSingleLinkModalElement>
        <IconPickerComponent
            modalType = {allModals.HELPERS_LINKS_MODAL}
        />
        <HelperSingleLinkModalElement>
            <UniversalInputWithButton
                modalType = {allModals.HELPERS_LINKS_MODAL}
                inputType = {allModalsInputs.LINK}
                inputMaxLength = {200}
                placeholder = 'Link z adresem szyfrowanym https://'
            />
        </HelperSingleLinkModalElement>
    </TitleAndIconContainer>
);

export default HelpersLinksInputs;