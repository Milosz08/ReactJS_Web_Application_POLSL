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

import generateID from '../../../../helpers/functionsAndClasses/generateID';
import NAVIGATION_ELEMENTS from '../../../../helpers/structs/navigationElements';

import {
    FooterExternalLink, FooterHeadling, FooterLinksContainer, FooterLinksUnorderedList, SingleFooterLinkElement
} from '../Footer.styles';
import { ExternalLinkIconInheritance } from '../../Hamburger/Hamburger.styles';

/**
 * Component responsible for generating anchor links to polsl web addresses.
 */
const FooterLeftOuterLinks: React.FC = (): JSX.Element => {

    const generateOuterLinks: JSX.Element[] = NAVIGATION_ELEMENTS.TOP_NAVBAR_ELMS.map(goto => (
        <SingleFooterLinkElement
            key = {generateID()}
        >
            <FooterExternalLink
                href = {goto.link}
                target = '_blank'
                rel = 'noreferrer'
            >
                {goto.title}
                <ExternalLinkIconInheritance>
                    <FiExternalLink/>
                </ExternalLinkIconInheritance>
            </FooterExternalLink>
        </SingleFooterLinkElement>
    ));

    return (
        <FooterLinksContainer>
            <FooterHeadling>
                Linki Politechniki Śląskiej
            </FooterHeadling>
            <FooterLinksUnorderedList>
                {generateOuterLinks}
            </FooterLinksUnorderedList>
        </FooterLinksContainer>
    );
};

export default FooterLeftOuterLinks;