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
import { a_rs } from '../../../styles/reset.styles';

export const DevToolsInfoContainer = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--lightGray);
    margin: 80px 0 60px;
    padding: 40px 0;
`;

export const DevToolsInfoWrapper = styled.div`
    display: flex;
    width: var(--widthVertical);
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.4;
    color: var(--darkBlueColor);
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        width: 100%;
        margin: 0 30px;
    }
`;

export const DevToolsLogosContainer = styled.div`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 1250px) {
        margin-bottom: 40px;
    }
`;

export const DevToolsLogoAnchor = styled(a_rs)`
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 5rem;
    color: var(--navyBlueColor);
`;

export const DevToolsTextContentContainer = styled.div`
    padding-left: 30px;
    @media only screen and (max-width: 1250px) {
        text-align: justify;
        padding-left: 0;
    }
`;

export const DevToolsMainContent = styled.div`
    strong {
        font-weight: 500;
        text-decoration: none;
        color: var(--navyBlueColor);
        transition: .2s;
    }
`;

export const DevToolsGithubLink = styled(a_rs)`
    color: var(--navyBlueColor);
    font-weight: 500;
`;

export const DevToolsOuterIcon = styled.div`
    display: inline-block;
    position: relative;
    top: 2px;
    margin-left: 4px;
`;