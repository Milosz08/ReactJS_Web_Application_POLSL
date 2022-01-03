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

import styled, { css } from 'styled-components';
import { DefaultButton, ModalBackground, ModalContainer } from '../../../styles/mixins.styles';
import { button_rs } from '../../../styles/reset.styles';

const ButtonsMediaQueries = () => css`
    width: 300px;
    margin: 5px 0;
    font-size: .9rem;
`;

export const CookiesNotificationContainer = styled.section`
    ${ModalBackground({ _width: 800 })};
`;

export const CookiesNotificationWrapper = styled.div`
    ${ModalContainer({ _width: 800 })};
    padding: 10px 40px 30px;
`;

export const CookiesMainSectionContainer = styled.section`
    margin: 40px 0;
    font-size: 1.2rem;
    line-height: 1.3;
    text-align: justify;
    color: var(--darkBlueColor);
    font-weight: 500;
    @media only screen and (max-width: 830px) {
        font-size: 1rem;
        margin: 30px 0;
    }
`;

export const CookiesButtonsContainerStyle = styled.div`
    display: flex;
    justify-content: space-around;
    @media only screen and (max-width: 830px) {
        flex-wrap: wrap;
    }
`;

export const ReadPrivacyPolicy = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.1rem', _fontWeight: 500, _ifEmpty: true })};
    @media only screen and (max-width: 830px) {
        ${ButtonsMediaQueries()};
    }
`;

export const PrivacyPolicyAgree = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.1rem', _fontWeight: 400, _ifEmpty: false })};
    @media only screen and (max-width: 830px) {
        ${ButtonsMediaQueries()}
    }
`;