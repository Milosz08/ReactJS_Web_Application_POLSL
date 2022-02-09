/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
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

export const UniversalInfoSectionContainer = styled('section')<{ $marginTop: number, $marginBottom: number }>`
    position: relative;
    width: 100%;
    border: 1px solid var(--lightGrayTint1);
    border-radius: 10px;
    overflow: hidden;
    padding: 20px 30px 30px;
    margin-top: ${({ $marginTop }) => Boolean($marginTop || $marginTop === 0) ? $marginTop : 50}px;
    margin-bottom: ${({ $marginBottom }) => $marginBottom || 0}px;
`;

export const UniversalInfoSectionHeader = styled('h3')<{ leadingColor: string }>`
    color: var(--${({ leadingColor }) => leadingColor || 'navyBlueColor'});
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 15px;
`;

export const UniversalInfoSectionBorderElement = styled('div')<{ leadingColor: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background-color: var(--${({ leadingColor }) => leadingColor || 'navyBlueColor'});
`;

export const UniversalInfoSectionTextContent = styled.div`
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--darkBlack);
    line-height: 1.3;
    strong {
        font-weight: 600;
    }
`;