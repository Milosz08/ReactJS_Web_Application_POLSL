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
import { a_rs } from '../../../styles/reset.styles';

const BasicDivAndAnchorStructure = (_color: string) => css`
    padding: 15px 20px;
    color: var(--${_color}Color);
    font-weight: ${_color === 'white' ? 200 : 500};
`;

export const CovidInfoContainer = styled('section')<{ $colorValue: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--widthVertical);
    background-color: ${({ $colorValue }) => `var(--${$colorValue}Color)`};
    margin: 0 auto;
    border-radius: 10px;
    transform: translateY(-30px);
    position: relative;
    z-index: 1;
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        max-width: 900px;
        padding: 10px 0;
    }
    @media only screen and (max-width: 940px) {
        max-width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const SecurityLevel = styled('div')<{ $colorValue: string }>`
    ${({ $colorValue }) => BasicDivAndAnchorStructure($colorValue)};
    font-size: 2rem;
    font-weight: 500;
    min-width: 300px;
    @media only screen and (max-width: 843px) {
        max-width: 300px;
    }
`;

export const CovidMoreInformations = styled(a_rs)<{ $colorValue: string }>`
    ${({ $colorValue }) => BasicDivAndAnchorStructure($colorValue)};
    display: inline-block;
`;

export const CovidInfoBlocksContainer = styled.div`
    display: flex;
    @media only screen and (max-width: 843px) {
        flex-direction: column;
    }
`;

export const CovidSingleInfoBlock = styled('div')<{ $colorValue: string }>`
    ${({ $colorValue }) => BasicDivAndAnchorStructure($colorValue)};
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-size: .9rem;
    font-weight: 400;
`;

export const CovidSingleInfoDescription = styled.span`
    padding: 0 20px;
`;

export const CovidSingleInfoRiskNumber = styled.span`
    padding: 0 10px;
    font-size: 2.5rem;
    font-weight: 500;
    @media only screen and (max-width: 843px) {
        flex-direction: column;
    }
`;