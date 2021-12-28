/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { DefaultButton, ModalBackground, ModalContainer, ModalScrollWrapper } from '../../../../../../styles/mixins.styles';
import { button_rs } from '../../../../../../styles/reset.styles';

export const AddEditContentModalContainer = styled.section`
    ${ModalBackground({ _width: 1200 })};
`;

export const AddEditContentModalWrapper = styled.div`
    ${ModalContainer({ _width: 1200 })};
`;

export const AddEditModalScrollWrapper = styled.div`
    ${ModalScrollWrapper({ _width: 1200 })};
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
    @media only screen and (max-width: 677px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const AddEditContentSaveChangesButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 300px;
    margin-bottom: 20px;
    @media only screen and (max-width: 677px) {
        width: 100%;
    }
`;

export const AddEditCustomContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    @media only screen and (max-width: 1250px) {
        margin-right: 0;
    }
`;