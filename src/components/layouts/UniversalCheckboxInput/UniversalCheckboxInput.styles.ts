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
import { input_rs } from '../../../styles/reset.styles';

export const UniversalCheckboxInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const CheckboxInput = styled(input_rs)<{ checkboxSize?: number, checkboxColor?: string }>`
    position: relative;
    width: ${({ checkboxSize }) => checkboxSize || 35}px;
    height: ${({ checkboxSize }) => checkboxSize || 35}px;
    z-index: 3;
    opacity: 0;
    cursor: pointer;
    :checked ~ div {
        border-radius: 5px;
        border: 1px solid  ${({ checkboxColor }) => checkboxColor || 'var(--navyBlueColor)'};
        background-color: ${({ checkboxColor }) => checkboxColor || 'var(--navyBlueColor)'};
        ::after {
            display: block;
        }
    }
`;

export const CheckboxCheckmark = styled('div')<{ ifError: boolean, checkmarkSize?: number }>`
    position: absolute;
    height: ${({ checkmarkSize }) => checkmarkSize || 20}px;
    width: ${({ checkmarkSize }) => checkmarkSize || 20}px;
    border-radius: 5px;
    border: 1px solid var(${({ ifError }) => ifError ? '--redColor' : '--darkGray'});
    transition: .2s;
    ::after {
        content: '';
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid var(--cleanWhiteColor);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;

export const CheckFieldLabel = styled.label`
    flex-grow: 1;
    font-size: 1rem;
    line-height: 1.2;
    color: var(--darkGray);
    cursor: pointer;
`;