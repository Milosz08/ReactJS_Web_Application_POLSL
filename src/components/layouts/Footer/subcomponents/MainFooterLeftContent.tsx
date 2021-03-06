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

import { MainFooterLeftSection } from '../Footer.styles';

const FooterLeftInnerLinks = React.lazy(() => import('./FooterLeftInnerLinks'));
const FooterLeftOuterLinks = React.lazy(() => import('./FooterLeftOuterLinks'));
const DisclaimerFooter = React.lazy(() => import('./DisclaimerFooter'));

/**
 * Component responsible for generating struct for main footer left content
 * (mainly links, routing and disclaimer notification).
 */
const MainFooterLeftContent: React.FC = (): JSX.Element => (
    <MainFooterLeftSection>
        <FooterLeftOuterLinks/>
        <FooterLeftInnerLinks/>
        <DisclaimerFooter/>
    </MainFooterLeftSection>
);


export default MainFooterLeftContent;