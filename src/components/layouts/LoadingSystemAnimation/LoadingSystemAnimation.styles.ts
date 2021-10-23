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

export const LoadingSystemAnimationContainer = styled('div')<{ ifActive: boolean }>`
    position: relative;
    min-height: 500px;
    width: var(--widthVertical);
    margin-top: 200px;
    display: ${props => props.ifActive ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const InifiteLoadVector = styled.svg`
    width: 280px;
    max-width: 25em;
    border-radius: 3px;
    fill: none;
    stroke: var(--darkGrayTint3);
    stroke-linecap: round;
    stroke-width: 8%;
`;

export const InfiniteLoadVectorUse = styled('use')`
    stroke: var(--navyBlueColor);
    animation: loopAnimation 2s ease-in-out infinite;
    @keyframes loopAnimation {
        to {
            stroke-dashoffset: 0
        }
    }
`;