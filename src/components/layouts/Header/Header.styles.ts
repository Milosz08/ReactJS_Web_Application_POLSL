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
import { a_rs, ul_rs } from '../../../styles/reset.styles';

export const MainHeaderContainer = styled('header').attrs(props => ({
    style: {
        top: props.ifFixed ? `-${props.elmHeight}px` : 0
    }
}))<{ ifFixed: boolean, ifHide: boolean }>`
    position: ${props => props.ifFixed ? 'fixed' : 'absolute'};
    transform: translateY(${props => props.ifHide ? '-90px' : 0});
    z-index: 5;
    width: 100%;
    @media only screen and (max-width: 1250px) {
        height: 60px;
        top: 0 !important;
        transition: .3s;
    }
`;

export const MainHeaderNavigationContainer = styled.nav`
    display: flex;
    justify-content: center;
    background-color: var(--darkNavyBlueColor);
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const MainHeaderNavigationLinks = styled.div`
    display: flex;
    justify-content: space-around;
    width: var(--widthVertical);
    padding: 8px 0 11px;
`;

export const MainHeaderNavigationSingleLink = styled(a_rs)`
    color: var(--whiteColor);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    transition: var(--transitionDuration) color ease-in-out;
    :hover {
        color: var(--darkGrayTint4);
        text-decoration: none;
    }
`;

export const MainHeaderContentContainer = styled('div').attrs(props => ({
    style: {
        height: `${props.heightProperty}px`
    }
}))`
    display: flex;
    justify-content: center;
    height: 120px;
    background-color: var(--navyBlueColor);
    @media only screen and (max-width: 500px) {
        width: 100%;
        padding: 0 20px;
    }
`;

export const MainLogoContainer = styled('div')<{ ifHeaderHasRedBar: boolean }>`
    display: flex;
    justify-content: ${props => props.ifHeaderHasRedBar ? 'space-between' : 'center'};
    position: relative;
    z-index: 6;
    height: 100%;
    width: var(--widthVertical);
    padding: 16px 0;
    div[role = 'link'] {
        height: 100%;
        a {
            display: block;
            width: auto !important;
            height: 100%;
        }
    @media only screen and (max-width: 1250px) {
        margin: 0 30px;
        justify-content: space-between;
    }
    @media only screen and (max-width: 500px) {
        margin: 0;
    }
`;

export const MainLogoImage = styled.img`
    height: 100%;
    width: auto !important;
`;

export const MainHeaderNavigationRouterLinks = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const UnofficialInfoContainer = styled('div').attrs(props => ({
    style: {
        transform: `translateY(-${props.offsetValue}px)`
    }
}))`
    position: absolute;
    z-index: -1;
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    padding: 8px 0 10px;
    color: var(--whiteColor);
    background-color: var(--redColor);
    @media only screen and (max-width: 1250px) {
        font-size: 1rem;
    }
`;

export const NavigationHeaderInline = styled(ul_rs)`
    display: flex;
    align-items: center;
    list-style-type: none;
    height: 100%;
`;

export const NavigationHeaderInlineSingleElement = styled.li`
    margin: 0 15px;
    color: var(--whiteColor);
    text-decoration: none;
    font-weight: 500;
    :nth-last-child(1) {
        margin-left: 15px;
    }
`;