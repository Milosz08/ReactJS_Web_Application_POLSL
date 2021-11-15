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
import { StandardTextInput } from '../../../styles/mixins.styles';

export const PasswordInputFieldContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const PasswordInputFieldInput = styled(input_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({ _ifError: props.ifError, _paddingRight: 50, _spaceUpDown: 12 })};
    font-size: 1.2rem;
    padding: 8px 11px 10px 15px;
`;

export const PasswordToggleButton = styled(button_rs)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    line-height: 80%;
    right: 8px;
    height: 80%;
    width: 35px;
    font-size: 1.3rem;
    color: var(--darkGrayTint1);
`;