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

import { FooterContainer, MainFooterWrapper } from './Footer.styles';

const MainFooterLeftContent = React.lazy(() => import('./subcomponents/MainFooterLeftContent'));
const MainFooterRightContent = React.lazy(() => import('./subcomponents/MainFooterRightContent'));
const CopyrightFooterSection = React.lazy(() => import('./subcomponents/CopyrightFooter'));

/**
 * Component responsible for the implementation of the footer (the footer is universal and appears on
 * every subpage, it does not change its content). Includes links and a form.
 */
const Footer: React.FC = (): JSX.Element => (
    <FooterContainer>
        <MainFooterWrapper>
            <MainFooterLeftContent/>
            <MainFooterRightContent/>
        </MainFooterWrapper>
        <CopyrightFooterSection/>
    </FooterContainer>
);

export default Footer;