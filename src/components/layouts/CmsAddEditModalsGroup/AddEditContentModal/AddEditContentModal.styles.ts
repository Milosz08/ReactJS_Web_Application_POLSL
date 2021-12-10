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

import styled from 'styled-components';

import { DefaultButton, ModalBackground, ModalContainer } from '../../../../styles/mixins.styles';
import { button_rs } from '../../../../styles/reset.styles';

export const AddEditContentModalContainer = styled.section`
    ${ModalBackground({ _width: 1200 })};
`;

export const AddEditContentModalWrapper = styled.div`
    ${ModalContainer({ _width: 1200 })};
    padding: 10px 40px 20px;
    @media only screen and (max-width: 1230px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const AddEditContentModalButtonsContainer = styled('div')<{ ifExtraMargin?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 40px auto ${({ ifExtraMargin }) => ifExtraMargin ? '40px' : 0};
    max-width: 800px;
    width: 100%;
`;

export const AddEditContentUnsaveChangesButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 500, _ifEmpty: true })};
    width: 300px;
    margin-bottom: 20px;
`;

export const AddEditContentSaveChangesButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 300px;
    margin-bottom: 20px;
`;