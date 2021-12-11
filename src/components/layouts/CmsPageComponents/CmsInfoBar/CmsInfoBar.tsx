/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { CmsInfoBarContainer, CmsInfoBarWrapper, CmsMainInfosContainer } from './CmsInfoBar.styles';

const CmsInfoBarTitle = React.lazy(() => import('./subcomponents/CmsInfoBarTitle'));
const CmsSessionInfo = React.lazy(() => import('./subcomponents/CmsSessionInfo'));
const CmsInfoLogoutButton = React.lazy(() => import('./subcomponents/CmsInfoLogoutButton'));

/**
 * Component that generates the status bar of the administrator's session in the CMS (active session
 * time, buttons, logout, etc.).
 */
const CmsInfoBar = (): JSX.Element => (
    <CmsInfoBarContainer>
        <CmsInfoBarWrapper>
            <CmsInfoBarTitle/>
            <CmsMainInfosContainer>
                <CmsSessionInfo/>
                <CmsInfoLogoutButton/>
            </CmsMainInfosContainer>
        </CmsInfoBarWrapper>
    </CmsInfoBarContainer>
);

export default CmsInfoBar;