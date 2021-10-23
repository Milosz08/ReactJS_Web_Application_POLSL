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
import { a_rs, button_rs, ul_rs } from '../../../styles/reset.styles';

export const HamburgerContainer = styled.div`
    display: none;
    @media only screen and (max-width: 1250px) {
        display: flex;
    }
`;

export const HamburgerButtonContainer = styled(button_rs)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 5;
    width: 50px;
    height: 50px;
`;

export const HamburgerBars = styled('div')<{ ifActive: boolean }>`
    position: relative;
    width: 30px;
    height: 2px;
    background-color: ${props => props.ifActive ? 'transparent' : 'var(--cleanWhiteColor)'};
    transition: var(--transitionDuration);
    &::before, &::after {
        content: '';
        position: absolute;
        top: ${props => props.ifActive ? 0 : '-10px'};
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(${props => props.ifActive ? '135deg' : 0});
        background-color: var(--cleanWhiteColor);
        transition: var(--transitionDuration);
    }
    &::after {
        top: ${props => props.ifActive ? 0 : '10px'};
        transform: rotate(${props => props.ifActive ? '-135deg' : 0});
    }
`;

export const HamburgerMenuContainer = styled('nav')<{ ifActive: boolean }>`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 2;
    top: 0;
    right: 0;
    width: 320px;
    height: 100vh;
    background-color: var(--navyBlueColor);
    transform: translate(${props => props.ifActive ? 0 : '320px'}, 0);
    transition: var(--transitionDuration);
    padding-top: 100px;
    @media only screen and (max-width: 500px) {
        width: 100%;
        transform: translate(0, ${props => props.ifActive ? 0 : '-100vh'});
        z-index: -2;
    }
`;

export const HamburgerMenuLinksContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
`;

export const HamburgerUnorderedList = styled(ul_rs)``;

export const HamburgerListItem = styled.li`
    padding: 10px 0;
    color: var(--cleanWhiteColor);
`;

export const HamburgerReferContainer = styled(HamburgerMenuLinksContainer)`
    background-color: var(--darkNavyBlueColor);
    padding-bottom: 100px;
    @media only screen and (max-width: 500px) {
        padding-bottom: 40px;
        margin-bottom: 40px;
    }
`;

export const HamburgerExternalLink = styled(a_rs)``;

export const ExternalLinkIconInheritance = styled.div`
    position: relative;
    top: 2px;
    margin-left: 5px;
    display: inline-block;
`;