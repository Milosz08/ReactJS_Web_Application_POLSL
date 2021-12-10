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
import { DefaultButton, ModalBackground, ModalContainer } from '../../../../styles/mixins.styles';
import { BsArrowRight, BsTrash } from 'react-icons/all';
import { button_rs } from '../../../../styles/reset.styles';

export const DeleteContentModalContainer = styled.section`
    ${ModalBackground({ _width: 1000 })};
`;

export const DeleteContentModalWrapper = styled.div`
    ${ModalContainer({ _width: 1000 })};
    padding: 40px 40px 20px;
    @media only screen and (max-width: 1030px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const DeleteContentIconsContainer = styled.div`
    display: flex;
    justify-content: center;
    font-size: 4.5rem;
    color: var(--darkGrayTint1);
`;

export const DeleteContentIconsTrash = styled(BsTrash)`
    color: var(--darkOrangeColor);
`;

export const DeleteContentIconsArrow = styled(BsArrowRight)`
    color: var(--navyBlueColor);
    margin: 0 10px;
`;

export const DeleteContentTitle = styled.h3`
    text-align: center;
    margin-top: 30px;
    font-size: 2.2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    strong {
        color: var(--darkOrangeColor);
        font-weight: inherit;
    }
`;

export const DeleteContentDatabaseID = styled.p`
    margin: 10px 0 40px;
    text-align: center;
    color: var(--darkGrayTint2);
    font-weight: 400;
`;

export const DeleteContentButtonsContainer = styled('div')<{ ifExtraMargin?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 40px auto ${({ ifExtraMargin }) => ifExtraMargin ? '30px' : 0};
    width: 80%;
`;

export const NotDeleteContentButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 300px;
    margin-bottom: 20px;
`;

export const DeleteContentButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 500, _ifEmpty: true })};
    width: 300px;
    margin-bottom: 20px;
`;

export const CustomContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CustomContentAsideText = styled.p`
    font-size: 1.2rem;
    color: var(--darkGrayTint1);
`;

export const CustomContentRemoveElementTitle = styled.h3`
    font-size: 1.5rem;
    text-align: center;
    color: var(--navyBlueColor);
    font-weight: 500;
    margin: 10px 0;
`;

export const CustomContentRemoveElementContent = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 30px;
    text-align: center;
    color: var(--navyBlueColor);
    overflow-wrap: break-word;
    margin: 10px 0;
    width: 100%;
`;

export const DeleteMultipleCalendarElementsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 20px;
`;

export const DeleteSingleCalendarElement = styled('div')<{ colorCSS: string }>`
    position: relative;
    flex-basis: 40%;
    border: 1px solid var(--darkGrayTint2);
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.3rem;
    padding: 20px 20px 25px;
    color: ${({ colorCSS }) => `var(--${colorCSS}Color)`};
    margin: 40px 30px 0;
    max-width: 500px;
    width: 100%;
`;

export const DeleteSingleCalendarDateElement = styled('div')<{ colorCSS: string }>`
    position: absolute;
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    right: -8px;
    bottom: -15px;
    border-radius: 5px;
    padding: 2px 10px 3px;
    background-color: ${({ colorCSS }) => `var(--${colorCSS}Color)`};
    color: var(--cleanWhiteColor);
    font-weight: 400;
    font-size: 1.1rem;
`;

export const DeleteUserMessagesNotReadableIndicator = styled('strong')<{ colorCSS: string }>`
    color: var(${({ colorCSS }) => `--${colorCSS}Color`});
    font-weight: 500;
`;