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
import { FaCookieBite } from 'react-icons/all';

import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import { FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';

import {
    CopyrightFooterContainer, CopyrightFooterSectionAnchor, CopyrightFooterSingleSection,
    CopyrightFooterWrapper, IconNormalisedWrapper
} from '../Footer.styles';

/**
 * Component responsible for generating copyright footer section.
 */
const CopyrightFooterSection: React.FC = (): JSX.Element => {

    const generateSectionAnchor = (path: string, content: string): JSX.Element => (
        <CopyrightFooterSectionAnchor
            href = {path}
            target = '_blank'
            rel = 'noreferrer'
        >
            {content}
        </CopyrightFooterSectionAnchor>
    );

    return (
        <CopyrightFooterContainer>
            <CopyrightFooterWrapper>
                <CopyrightFooterSingleSection>
                    Ikony pochodzą z biblioteki:
                    {generateSectionAnchor('https://react-icons.github.io/react-icons', 'React Icons')}
                </CopyrightFooterSingleSection>
                <CopyrightFooterSingleSection>
                    &copy; 2020-{new Date().getFullYear()} by:
                    {generateSectionAnchor('https://miloszgilga.pl/', 'Miłosz Gilga')}
                </CopyrightFooterSingleSection>
                <CopyrightFooterSingleSection>
                    Ta strona wykorzystuje pliki cookies.
                    <IconNormalisedWrapper>
                        <FaCookieBite/>
                    </IconNormalisedWrapper>
                    <DelayRouterLink
                        render = {() => 'Polityka Prywatności'}
                        pathTo = {FRONT_ENDPOINTS.PRIVACY_POLICY}
                    />
                </CopyrightFooterSingleSection>
            </CopyrightFooterWrapper>
        </CopyrightFooterContainer>
    );
};

export default CopyrightFooterSection;