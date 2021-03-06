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

export const EstimateTimeCounterBarContainer = styled('aside')<{ ifActive: boolean }>`
    position: relative;
    width: 100%;
    height: 7px;
    border-radius: 10px;
    background-color: var(--lightGray);
    font-size: 1.2rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    text-align: center;
    display: ${props => props.ifActive ? 'block' : 'none'};
    margin-top: ${props => props.ifActive ? '15px' : 0};
    margin-bottom: 20px;
`;

export const EstimateTimeCounterBarLine = styled.span`
    display: block;
    margin-top: 15px;
`;

export const EstimateTimeCounterBarActiveElement = styled('div').attrs<{ widthCSS: number }>(props => ({
    style: {
        width: `${props.widthCSS}%`
    }
}))`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 10px;
    background-color: var(--navyBlueColor);
    transition: .5s;
`;