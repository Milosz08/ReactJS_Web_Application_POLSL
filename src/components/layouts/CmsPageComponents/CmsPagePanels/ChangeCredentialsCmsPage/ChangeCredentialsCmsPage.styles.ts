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

import { BorderWithPseudoElement, DefaultButton } from '../../../../../styles/mixins.styles';
import { button_rs } from '../../../../../styles/reset.styles';

export const ChangeCredentialsCmsPageContainer = styled('section')<{ disabled: boolean }>`
    ${BorderWithPseudoElement({
        _color: 'var(--darkGrayTint3)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: '',
        _fontSize: '1.2rem',
        _fontWeight: 500
    })};
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    margin: 20px 0;
    padding: 20px 0;
    border: ${props => props.disabled ? '1px solid var(--redColor)' : 'auto'};
`;

export const ChangeCredentialsDisabledArea = styled('div')<{ disabled: boolean }>`
    position: absolute;
    display: ${({ disabled }) => disabled ? 'block' : 'none'};
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 3;
    background-color: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, .2)' : 'transparent'};
    border-radius: 10px;
`;

export const ChangeCredentialsDisabledInfo = styled.p`
    position: relative;
    z-index: 4;
    flex-basis: 70%;
    text-align: center;
    color: var(--redColor);
    font-weight: 500;
    font-size: 1.1rem;
    margin: 10px 80px;
`;

export const ChangeCredentialsCmsForm = styled('form')<{ disabled: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: ${props => props.disabled ? 'grayscale(.6)' : 'none'};
    opacity: ${props => props.disabled ? .5 : 1};
`;

export const ChangeCredentialsCmsFormHeader = styled.h3`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    margin: 20px 0;
`;

export const InsertAdmiAuthPasswordParagraph = styled.p`
    margin: 20px 0 15px;
    max-width: 300px;
    color: var(--navyBlueColor);
    font-weight: 500;
`;

export const ChangeCredentialsSubmitButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    margin: 20px 0;
    padding: 10px;
    width: 200px;
`;

export const ChangeCredentialsTypesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 5px 0 20px 0;
`;