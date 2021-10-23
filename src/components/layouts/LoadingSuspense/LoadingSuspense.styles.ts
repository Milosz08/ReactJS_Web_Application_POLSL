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

export const LoadingSuspenseContainer = styled('div')<{ ifActive: boolean }>`
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    background-color: var(--navyBlueColor);
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--cleanWhiteColor);
    opacity: ${props => props.ifActive ? 1 : 0};
    transition: .2s linear;
`;

export const InfiniteLoad = styled.svg`
    width: 360px;
    max-width: 25em;
    border-radius: 3px;
    fill: none;
    stroke: var(--darkBlueColor);
    stroke-linecap: round;
    stroke-width: 8%;
`;

export const InfiniteUse = styled('use')`
    stroke: var(--cleanWhiteColor);
    animation: loopAnimation 2s ease-in-out infinite;
    @keyframes loopAnimation {
        to {
            stroke-dashoffset: 0
        }
    }
`;