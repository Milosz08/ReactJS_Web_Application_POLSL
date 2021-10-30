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

export const EstimateCounterContainer = styled.section`
    display: flex;
    justify-content: center;
`;

export const EstimateCounterWrapper = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: var(--widthVertical);
    margin: 50px 0;
    border: 1px solid var(--darkGrayTint2);
    border-radius: 10px;
    @media only screen and (max-width: 1250px) {
        margin: 50px 30px;
    }
`;

export const EstimateCounterHeader = styled.h2`
    position: absolute;
    top: -17px;
    padding: 0 15px;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--darkGrayTint2);
    background-color: var(--cleanWhiteColor);
    strong {
        font-weight: 500;
        color: var(--navyBlueColor);
    }
    @media only screen and (max-width: 843px) {
        font-size: 1.1rem;
        top: -13px;
    }
`;

export const DesktopDateContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    display: flex;
    font-size: 2.5rem;
    font-stretch: condensed;
    margin: 30px 0;
    @media only screen and (max-width: 1022px) {
        font-size: 2rem;
    }
    @media only screen and (max-width: 843px) {
        display: none;
    }
`;

export const DesktopDateSpan = styled.span`
    margin: 0 10px;
    font-weight: 300;
    color: var(--navyBlueColor);
    strong {
        font-weight: 500;
        color: var(--orangeColor);
    }
`;

export const MobileDateConainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    display: none;
    padding: 25px 0;
    @media only screen and (max-width: 1022px) {
        font-size: 2rem;
    }
    @media only screen and (max-width: 843px) {
        display: block;
    }
`;

export const MobileDateSpan = styled.span`
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;