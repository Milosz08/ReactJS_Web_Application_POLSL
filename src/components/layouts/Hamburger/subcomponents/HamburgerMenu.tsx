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

import * as React from 'react';
import { FiExternalLink } from 'react-icons/all';

import NAVIGATION_ELEMENTS from '../../../../helpers/structs/navigationElements';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import {
    HamburgerExternalLink, HamburgerListItem, HamburgerMenuContainer, HamburgerMenuLinksContainer,
    HamburgerReferContainer, HamburgerUnorderedList, ExternalLinkIconInheritance
} from '../Hamburger.styles';

/**
 * Component responsible for generate hamburger menu element with react redux state logic.
 */
const HamburgerMenu: React.FC = (): JSX.Element => {

    const { hamburgerToggle }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const { SITES, TOP_NAVBAR_ELMS } = NAVIGATION_ELEMENTS;

    const generateExternalList = TOP_NAVBAR_ELMS.map(goto => (
        <HamburgerListItem
            key = {goto.title}
        >
            <HamburgerExternalLink
                href = {goto.link}
                target = '_blank'
                rel = 'noreferrer'
            >
                {goto.title}
                <ExternalLinkIconInheritance>
                    <FiExternalLink/>
                </ExternalLinkIconInheritance>
            </HamburgerExternalLink>
        </HamburgerListItem>
    ));

    const generateLinksList = SITES.map(site => (
        <HamburgerListItem
            key = {site.title}
        >
            <DelayRouterLink
                render = {() => site.title}
                pathTo = {site.path}
            />
        </HamburgerListItem>
    ));

    return (
        <HamburgerMenuContainer
            ifActive = {hamburgerToggle}
        >
            <HamburgerMenuLinksContainer>
                <HamburgerUnorderedList>
                    {generateLinksList}
                </HamburgerUnorderedList>
            </HamburgerMenuLinksContainer>
            <HamburgerReferContainer>
                <HamburgerUnorderedList>
                    {generateExternalList}
                </HamburgerUnorderedList>
            </HamburgerReferContainer>
        </HamburgerMenuContainer>
    );
};

export default HamburgerMenu;