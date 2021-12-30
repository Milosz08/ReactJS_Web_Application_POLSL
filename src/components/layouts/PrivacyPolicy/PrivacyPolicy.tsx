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

import { PrivacyPolicyAsideParagraphIcon, PrivacyPolicyContainer, PrivacyPolicyWrapper } from './PrivacyPolicy.styles';

const PrivacyPolicyHeader = React.lazy(() => import('./subcomponents/PrivacyPolicyHeader'));
const PrivacyPolicyListStructure = React.lazy(() => import('./subcomponents/PrivacyPolicyListStructure'));
const PrivacyPolicyOuterServices = React.lazy(() => import('./subcomponents/PrivacyPolicyOuterServices'));
const PrivacyPolicyNonListStructure = React.lazy(() => import('./subcomponents/PrivacyPolicyNonListStructure'));
const PrivacyPolicyCookiesTurnOff = React.lazy(() => import('./subcomponents/PrivacyPolicyCookiesTurnOff'));
const PrivacyPolicyHashingInfo = React.lazy(() => import('./subcomponents/PrivacyPolicyHashingInfo'));

/**
 * Component responsible for generating all subcomponents for Privacy Policy page component.
 */
const PrivacyPolicy: React.FC = (): JSX.Element => (
    <PrivacyPolicyContainer>
        <PrivacyPolicyWrapper>
            <PrivacyPolicyAsideParagraphIcon>
                &sect;
            </PrivacyPolicyAsideParagraphIcon>
            <PrivacyPolicyHeader/>
            <PrivacyPolicyListStructure/>
            <PrivacyPolicyOuterServices/>
            <PrivacyPolicyNonListStructure/>
            <PrivacyPolicyCookiesTurnOff/>
            <PrivacyPolicyHashingInfo/>
        </PrivacyPolicyWrapper>
    </PrivacyPolicyContainer>
);

export default PrivacyPolicy;