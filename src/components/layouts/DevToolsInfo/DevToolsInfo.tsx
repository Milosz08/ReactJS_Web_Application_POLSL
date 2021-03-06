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

import React from 'react';

import { DevToolsInfoContainer, DevToolsInfoWrapper } from './DevToolsInfo.styles';

const DevToolsLogos = React.lazy(() => import( './subcomponents/DevToolsLogos'));
const DevToolsContent = React.lazy(() => import( './subcomponents/DevToolsContent'));

/**
 * Component responsible for generating a block of information about the technologies used in the application
 * development process. It appears on all subpages, positioned relatively to the content and footer.
 */
const DevToolsInfo = (): JSX.Element => (
    <DevToolsInfoContainer>
        <DevToolsInfoWrapper>
            <DevToolsLogos/>
            <DevToolsContent/>
        </DevToolsInfoWrapper>
    </DevToolsInfoContainer>
);

export default DevToolsInfo;