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
import { a_rs, button_rs } from '../../../styles/reset.styles';

export const MobileDownNavContainer = styled.nav`
    position: fixed;
    z-index: 999;
    bottom: 0;
    display: none;
    align-items: flex-end;
    width: 100%;
    height: 45px;
    background-color: var(--lightGrayTint1);
    @media only screen and (max-width: 500px) {
        display: flex;
    }
`;

export const ActiveIndicator = styled('span')<{ position: number }>`
    position: absolute;
    z-index: 1;
    top: 0;
    width: calc(100% / 5);
    height: 4px;
    background-color: var(--navyBlueColor);
    transition: .2s;
    transform: translateX(${props => props.position}%);
`;

export const MobileDownNavSingleElementContainer = styled(button_rs)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 5);
    position: relative;
    height: calc(100% - 4px);
    div[role = 'link'] {
        display: flex;
        align-items: center;
        flex-grow: 1;
        height: 100%;
    }
`;

export const MobileDownNavSingleAnchor = styled(a_rs)`
    display: block;
    width: 100%;
    color: var(--navyBlueColor);
    font-size: 1.5rem;
`;