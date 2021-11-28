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

import { StandardRadioInputElement, StandardRadiomarkSelector } from '../../../styles/mixins.styles';
import { input_rs } from '../../../styles/reset.styles';

export const UniversalRadioInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const UniversalRadioInputElement = styled(input_rs)<{ sizeCSS: number, colorCSS: string }>`
    ${({ sizeCSS, colorCSS }) => StandardRadioInputElement({ _size: sizeCSS ? sizeCSS : 20, _color: colorCSS })};
    
`;

export const UniversalRadioInputLabel = styled('label')<{ styleCSS: { color: string, textSize: number } }>`
    font-size: ${({ styleCSS }) => styleCSS.textSize ? `${styleCSS.textSize}rem` : '1.2rem'};
    text-transform: capitalize;
    cursor: pointer;
    color: ${({ styleCSS }) => styleCSS.color ? styleCSS.color : 'var(--navyBlueColor)'};
    font-weight: 500;
    padding-left: 10px;
`;

export const UniversalRadiomarkElement = styled('div')<{ colorCSS: string }>`
    ${({ sizeCSS, colorCSS }) => StandardRadiomarkSelector({
        _size: sizeCSS ? sizeCSS : 20, _color: colorCSS ? colorCSS : 'var(--navyBlueColor)'
    })};
    margin-top: 1px;
`;