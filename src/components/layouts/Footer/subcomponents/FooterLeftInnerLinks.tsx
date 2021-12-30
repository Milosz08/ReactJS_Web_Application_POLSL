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

import NAVIGATION_ELEMENTS from '../../../../helpers/structs/navigationElements';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';

import { FooterHeadling, FooterLinksContainer, FooterLinksUnorderedList, SingleFooterLinkElement } from '../Footer.styles';

/**
 * Component responsible for generating page routing links in footer container.
 */
const FooterLeftInnerLinks: React.FC = (): JSX.Element => {

    const generateInnerLinks: JSX.Element[] = NAVIGATION_ELEMENTS.SITES.map(site => (
        <SingleFooterLinkElement
            key = {site.title}
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