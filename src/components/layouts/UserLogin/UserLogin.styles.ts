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
import { button_rs, input_rs } from '../../../styles/reset.styles';
import { DefaultButton, StandardTextInput } from '../../../styles/mixins.styles';

export const UserLoginContainer = styled.section`
    display: flex;
    justify-content: center;
    margin-top: -80px;
    @media only screen and (max-width: 750px) {
        margin-top: -230px;
        position: relative;
        z-index: 2;
    }
`;

export const UniversalLoginForm = styled('form')<{ ifVisible: boolean }>`
    display: ${props => props.ifVisible ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    width: 350px;
    @media only screen and (max-width: 375px) {
        width: calc(100%);
    }
`;

export const UniversalCredentialsInput = styled(input_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({ _ifError: props.ifError, _paddingRight: 50, _spaceUpDown: 12 })};
    font-size: 1.2rem;
    padding: 8px 11px 10px 15px;
    margin-bottom: 5px;
`;

export const UserLoginSubmitButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 100%;
    margin-top: 20px;
`;