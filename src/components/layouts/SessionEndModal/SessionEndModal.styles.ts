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

export const SessionEndModalContainer = styled.section`
    ${ModalBackground({ _width: 1000 })};
`;

export const SessionEndModalWrapper = styled.div`
    ${ModalContainer({ _width: 1000 })};
    padding: 40px;
    @media only screen and (max-width: 1030px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const SessionEndModalTimeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const SessionEndModalTimeIconWrapper = styled.div`
    font-size: 3.5rem;
    color: var(--redColor);
    transition: .2s;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SessionEndModalTextInfo = styled.div`
    padding: 30px 70px 0;
    text-align: center;
    font-size: 1.1rem;
    color: var(--darkBlueColor);
    font-weight: 500;
    @media only screen and (max-width: 1030px) {
        padding: 30px 0 0;
    }
`;

export const SessionEndModalCountingDown = styled.div`
    margin: 40px 0 50px;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--darkBlueColor);
    @media only screen and (max-width: 1030px) {
        margin: 30px 0;
        text-align: center;
    }
`;

export const SessionEndModalButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const SessionEndButtons = () => css`
    width: 270px;
`;

export const SessionEndModalLogout = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 500, _ifEmpty: true })};
    ${SessionEndButtons};
    @media only screen and (max-width: 660px) {
        margin-bottom: 10px;
    }
`;

export const SessionEndModalStaysession = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    ${SessionEndButtons};
`;