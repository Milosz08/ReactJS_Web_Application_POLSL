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

export const CurrentURLpathContainer = styled('section')<{ changeTop: boolean, ifCmsPath: boolean }>`
    display: flex;
    justify-content: center;
    position: relative;
    top: ${props => props.changeTop ? '250px' : '220px'};
    margin-bottom: 40px;
    @media only screen and (max-width: 1250px) {
        top: ${props => props.changeTop ? '175px' : '130px'};
        font-size: .9rem;
    }
    @media only screen and (max-width: 500px) {
        display: ${props => props.ifCmsPath ? 'flex' : 'none'};
    }
`;

export const CurrentURLpathWrapper = styled('div')<{ changeTop: boolean }>`
    width: var(--widthVertical);
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1250px) {
        justify-content: center;
        width: 100%;
    }
`;

export const CurrentURLpathSingleElement = styled.span`
    color: var(--darkGray);
    font-weight: 500;
    div[role = 'link'] {
        display: inline-block;
    }
`;

export const CurrentURLpathMultipleElement = styled.span``;

export const CurrentURLSingleElementArrowWrapper = styled.span`
    margin: 0 6px;
    font-size: 1.2rem;
    position: relative;
    top: 4px;
`;