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
import { SiReact, SiRedux } from 'react-icons/all';

import { DevToolsLogoAnchor, DevToolsLogosContainer } from '../DevToolsInfo.styles';

/**
 *
 */
const DevToolsLogos: React.FC = (): JSX.Element => (
    <DevToolsLogosContainer>
        <DevToolsLogoAnchor
            href = 'https://reactjs.org/'
            target = '_blank'
            rel = 'noreferrer'
        >
            <SiReact/>
        </DevToolsLogoAnchor>
        <DevToolsLogoAnchor
            href = 'https://redux.js.org/'
            target = '_blank'
            rel = 'noreferrer'
        >
            <SiRedux/>
        </DevToolsLogoAnchor>
    </DevToolsLogosContainer>
);


export default DevToolsLogos;