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
import { FiClock } from 'react-icons/all';

import { input_rs } from '../../../styles/reset.styles';
import { StandardTextInput } from '../../../styles/mixins.styles';

export const UniversalTimeInputContainer = styled.div`
    position: relative;
    width: 150px;
`;

export const UniversalTimeInputElement = styled(input_rs)<{ $ifError: boolean }>`
    ${({ $ifError }) => StandardTextInput({ _ifError: $ifError, _paddingRight: 50, _spaceUpDown: 10 })};
    position: relative;
    z-index: 2;
    font-size: 1.1rem;
    padding: 6px 12px 8px 15px;
    appearance: none;
    background-color: transparent;
    ::-webkit-calendar-picker-indicator {
        opacity: 0;
        cursor: pointer;
    }
`;

export const UniversalTimeClockIcon = styled(FiClock)<{ $ifError: boolean }>`
    position: absolute;
    z-index: 0;
    color: var(${({ $ifError }) => $ifError ? '--redColor' : '--navyBlueColor'});
    font-size: 1.4rem;
    top: 9px;
    right: 14px;
`;