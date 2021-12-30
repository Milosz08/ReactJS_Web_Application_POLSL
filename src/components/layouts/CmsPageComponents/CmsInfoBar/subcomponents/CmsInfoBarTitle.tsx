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

import { CmsInfoBarTitleContainer } from '../CmsInfoBar.styles';

const CmsInfoHamburgerButton = React.lazy(() => import( './CmsInfoHamburgerButton'));
const CmsInfoHamburgerMenu= React.lazy(() => import('./CmsInfoHamburgerMenu'));

/**
 * Component responsible for generating main title in CMS info bar.
 */
const CmsInfoBarTitle: React.FC = (): JSX.Element => (
    <CmsInfoBarTitleContainer>
        <span><strong>WCMS</strong>Panel 1.1 by Miłosz Gilga</span>
        <CmsInfoHamburgerButton/>
        <CmsInfoHamburgerMenu/>
    </CmsInfoBarTitleContainer>
);


export default CmsInfoBarTitle;