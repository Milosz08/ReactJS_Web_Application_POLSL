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

import { FooterFormWrapper } from './FooterForm.styles';

const FooterFormInputs = React.lazy(() => import('./subcomponents/FooterFormInputs'));
const FooterFormTextarea = React.lazy(() => import('./subcomponents/FooterFormTextarea'));
const FooterFormCheckfield = React.lazy(() => import('./subcomponents/FooterFormCheckfield'));
const FooterFormSubmitButton = React.lazy(() => import('./subcomponents/FooterFormSubmitButton'));

/**
 * Generate footer form struct container.
 */
const FooterForm: React.FC = (): JSX.Element => (
    <FooterFormWrapper>
        <FooterFormInputs/>
        <FooterFormTextarea/>
        <FooterFormCheckfield/>
        <FooterFormSubmitButton/>
    </FooterFormWrapper>
);

export default FooterForm;