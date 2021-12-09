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

import { button_rs, input_rs, select_rs, textarea_rs } from '../../../styles/reset.styles';
import { StandardTextInput } from '../../../styles/mixins.styles';

export const FooterFormWrapper = styled.form``;

export const FooterFormInput = styled(input_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({
        _paddingRight: 0,
        _spaceUpDown: 8,
        _ifError: props.ifError
    })};
    font-size: 1rem;
    margin-bottom: 10px;
`;

export const FooterFormSelectContainer = styled.div`
    position: relative;
    margin-bottom: 10px;
`;

export const FooterFormSelect = styled(select_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({
        _paddingRight: 0,
        _spaceUpDown: 8,
        _ifError: props.ifError
    })};
    position: relative;
    font-size: 1rem;
    background-color: var(--cleanWhiteColor);
`;

export const ShowOptionsArrowWrapper = styled('div')<{ ifError: boolean }>`
    color: var(${props => props.ifError ? '--redColor' : '--navyBlueColor'});
    position: absolute;
    top: 1px;
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    right: 10px;
    font-size: 1.9rem;
`;

export const FooterFormTextareaStyled = styled(textarea_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({
        _paddingRight: 0,
        _spaceUpDown: 8,
        _ifError: props.ifError
    })};
    position: relative;
    font-size: 1rem;
    padding: 8px 11px;
    background-color: var(--cleanWhiteColor);
`;

export const TextareaCharsQuantity = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: .9rem;
    padding: 3px 10px 0;
    color: var(--darkGrayTint2);
    margin-bottom: 20px;
`;

export const FormSubmitButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 30px 0;
    overflow: hidden;
    background-color: var(--lightGray);
`;

export const FormSubmitButton = styled(button_rs)`
    position: relative;
    z-index: 0;
    background-color: var(--navyBlueColor);
    color: var(--cleanWhiteColor);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 5px 10px 8px 10px;
    border: 3px solid var(--navyBlueColor);
    border-radius: 4px;
`;

export const FormSubmitAsideText = styled.p`
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 250px;
    top: 0;
    padding: 5px 10px 8px;
    font-size: 1rem;
    border-radius: 6px;
    border: 2px solid var(--navyBlueColor);
    color: var(--navyBlueColor);
    transition: .6s;
`;