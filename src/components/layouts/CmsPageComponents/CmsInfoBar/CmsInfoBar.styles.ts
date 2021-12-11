/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { button_rs } from '../../../../styles/reset.styles';

export const CmsInfoBarContainer = styled.div`
    * {
        font-family: 'Open Sans', sans-serif;
        color: var(--lightBlack);
        font-size: .9rem;
        letter-spacing: -0.02rem;
    }
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    background-color: var(--lightGrayTint1);
`;

export const CmsInfoBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: var(--widthVertical);
    @media only screen and (max-width: 1250px) {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
    }
`;

export const CmsInfoBarTitleContainer = styled.div`
    @media only screen and (max-width: 1250px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const CmsHamburgerButtonContainer = styled.div`
    display: none;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 1250px) {
        display: flex;
    }
`;

export const CmsHamburgerButton = styled(button_rs)`
    width: 25px;
    height: 25px;
`;

export const CmsHamburgerBars = styled('span')<{ ifActive: boolean }>`
    position: relative;
    display: block;
    width: calc(100% - 6px);
    height: 1px;
    margin: 0 3px;
    background-color: ${props => props.ifActive ? 'transparent' : 'var(--lightBlack)'};
    &::after, &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--lightBlack);
        transition: .2s;
    }
    &::after {
        top: ${props => props.ifActive ? 0 : '-6px'};
        transform: rotate(${props => props.ifActive ? '135deg' : 0});
    }
    &::before {
        top: ${props => props.ifActive ? 0 : '6px'};
        transform: rotate(${props => props.ifActive ? '-135deg' : 0});
    }
`;

export const CmsHamburgerMenuContainer = styled('div')<{ ifActive: boolean }>`
    display: ${props => props.ifActive ? 'flex': 'none'};
    flex-basis: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
`;

export const CmsHamburgerMenuElement = styled.span`
    padding: 5px 20px;
    @media only screen and (max-width: 1250px) {
        padding: 5px 0;
    }
    strong {
        text-transform: capitalize;
    }
`;

export const CmsMainInfosContainer = styled.div`
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const CmsMainLogoutButton = styled(button_rs)`
    display: inline-block;
    margin-left: 25px;
    :hover * {
        color: var(--blackColor);
    }
    @media only screen and (max-width: 1250px) {
        margin: 5px 0 5px 3px;
    }
`;

export const CmsLogoutIconWrapper = styled.div`
    display: inline-block;
    position: relative;
    margin-right: 8px;
    font-size: .8rem;
    top: 2px;
`;