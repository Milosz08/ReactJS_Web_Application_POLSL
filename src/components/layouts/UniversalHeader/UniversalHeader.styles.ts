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
import { button_rs } from '../../../styles/reset.styles';

export const UniversalHeaderContainer = styled.header`
    width: calc(100% - 10px);
    margin: 30px 0;
    @media only screen and (max-width: 1250px) {
        width: 100%;
    }
`;

export const UniversalHeaderHeadling = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--darkBlueColor);
    font-weight: 500;
    line-height: 1;
    @media only screen and (max-width: 1250px) {
        justify-content: space-between;
    }
`;

export const UniversalHeaderTitleSection = styled.div`
    display: flex;
    align-items: center;
`;

export const UniversalHeaderMainContent = styled.span``;

export const AdditionalHeaderTitle = styled.span`
    text-decoration: underline;
    font-weight: 500;
    color: var(--darkOrangeColor);
    padding-left: 10px;
`;

export const UniversalHeaderIconWrapper = styled('div')<{ customSize: string }>`
    margin-right: 15px;
    color: var(--orangeColor);
    font-size: ${props => !Boolean(props.customSize) ? '1.2rem' : props.customSize};
`;

export const Separator = styled.aside`
    flex-grow: 1;
    height: 1px;
    background-color: var(--darkGrayTint1);
    margin-left: 30px;
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const CloseButton = styled(button_rs)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 15px;
`;

export const CloseButtonTime = styled.span`
    position: absolute;
    right: 0;
    width: 70%;
    height: 2px;
    background-color: var(--darkGrayTint1);
    transform: rotate(45deg);
    ::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        background-color: var(--darkGrayTint1);
        transform-origin: center;
        transform: rotate(90deg);
    }
`;