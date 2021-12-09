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

import { button_rs } from '../../../../styles/reset.styles';
import { BsArrowRight, BsEnvelopeOpen } from 'react-icons/all';

import { BorderWithPseudoElement, DefaultButton, ModalBackground, ModalContainer } from '../../../../styles/mixins.styles';

export const ViewContentModalContainer = styled.section`
    ${ModalBackground({ _width: 1000 })};
`;

export const ViewContentModalWrapper = styled.div`
    ${ModalContainer({ _width: 1000 })};
    padding: 40px;
    @media only screen and (max-width: 1030px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const ViewContentIconsContainer = styled.div`
    display: flex;
    justify-content: center;
    font-size: 4.5rem;
    color: var(--darkGrayTint1);
`;

export const ViewContentIconsOpenMail = styled(BsEnvelopeOpen)`
    color: var(--greenColor);
`;

export const ViewContentIconsArrow = styled(BsArrowRight)`
    color: var(--navyBlueColor);
    margin: 0 10px;
`;

export const ViewContentTitleHeader = styled.h3`
    text-align: center;
    font-weight: 500;
    color: var(--navyBlueColor);
    margin: 30px 0 10px;
    font-size: 2.2rem;
    strong {
        color: var(--darkOrangeColor);
        font-weight: inherit;
    }
`;

export const ViewContentElement = styled.div`
    margin-top: 10px;
    text-align: center;
    color: var(--darkGrayTint2);
    font-weight: 400;
    font-size: 1.2rem;
    strong {
        color: var(--navyBlueColor);
        font-weight: 500;
    }
`;

export const ViewContentElementContent = styled.div`
    ${BorderWithPseudoElement({
        _color: 'var(--darkGrayTint2)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: 'Treść wiadomości',
        _fontSize: '1rem',
        _fontWeight: 500
    })};
    width: 100%;
    max-width: 800px;
    font-size: 1.2rem;
    text-align: center;
    color: var(--navyBlueColor);
    margin-top: 30px;
    font-weight: 500;
    overflow-wrap: break-word;
    ::before {
        font-weight: 400;
        top: -12px;
    }
`;

export const ViewContentButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px auto 0;
    width: 80%;
`;

export const CloseModalContentButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 300px;
`;