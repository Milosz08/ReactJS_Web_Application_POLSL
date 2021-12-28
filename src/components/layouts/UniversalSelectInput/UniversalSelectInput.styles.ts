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
import { MdKeyboardArrowDown } from 'react-icons/all';

import { select_rs } from '../../../styles/reset.styles';
import { StandardTextInput } from '../../../styles/mixins.styles';

export const UniversalSelectInputContainer = styled.label<{ extraTopBottomMargin: boolean }>`
    position: relative;
    z-index: 0;
    margin-right: 10px;
    @media only screen and (max-width: 540px) {
        margin: ${({ extraTopBottomMargin }) => extraTopBottomMargin ? '10px' : 0} 0
        ${({ extraTopBottomMargin }) => extraTopBottomMargin ? '10px' : 0};
    }
`;

export const UniversalSelectInputElement = styled(select_rs)<{ ifError: boolean }>`
    ${({ ifError }) => StandardTextInput({ _ifError: ifError, _paddingRight: 50, _spaceUpDown: 10 })};
    font-size: 1.1rem;
    text-transform: capitalize;
    background-color: transparent;
`;

export const UniversalSelectInputArrow = styled(MdKeyboardArrowDown)`
    position: absolute;
    z-index: -1;
    top: 7px;
    right: 7px;
    font-size: 2rem;
    color: var(--navyBlueColor);
`;