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

import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import generateID from '../../../../helpers/functionsAndClasses/generateID';

import NAVIGATION_ELEMENTS from '../../../../helpers/structs/navigationElements';

import { FooterHeadling, FooterLinksContainer, FooterLinksUnorderedList, SingleFooterLinkElement } from '../Footer.styles';

/**
 *
 */
const FooterLeftInnerLinks: React.FC = (): JSX.Element => {

    const generateInnerLinks: JSX.Element[] = NAVIGATION_ELEMENTS.SITES.map(site => (
        <SingleFooterLinkElement
            key = {generateID()}
        >
            <DelayRouterLink
                render = {() => site.title}
                pathTo = {site.path}
            />
        </SingleFooterLinkElement>
    ));

    return (
        <FooterLinksContainer ifInnerLinks = {true}>
            <FooterHeadling>
                Nawigacja
            </FooterHeadling>
            <FooterLinksUnorderedList>
                {generateInnerLinks}
            </FooterLinksUnorderedList>
        </FooterLinksContainer>
    );
};

export default FooterLeftInnerLinks;