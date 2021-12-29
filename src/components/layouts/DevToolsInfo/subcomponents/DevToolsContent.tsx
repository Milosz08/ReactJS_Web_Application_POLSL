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

import {
    DevToolsGithubLink, DevToolsMainContent, DevToolsOuterIcon, DevToolsTextContentContainer
} from '../DevToolsInfo.styles';

/**
 * Component responsible for generate developments tools info content.
 */
const DevToolsContent: React.FC = (): JSX.Element => (
    <DevToolsTextContentContainer>
        <DevToolsMainContent>
            Aplikacja oparta o bibliotekę <strong>ReactJS</strong> została napisana w
            standardzie <strong>SPA (Single Page Application)</strong>. Za zarządzanie stanem komponentów odpowiada
            system <strong>Redux</strong> wraz z oprogramowaniem middleware umożliwiającym pracę w
            bibliotece <strong>ReactJS. </strong> Aplikacja korzysta z autorskiego Restowego API działającym na silniku
            <strong> Java Spring Boot </strong> oraz <strong>JPA</strong> wraz z komunikującą się z nim bazą danych
            <strong> mySQL</strong>. Całość warstwy front-end aplikacji została napisana w języku <strong>TypeScript</strong>.
            Kod projektu znajdziesz na moim repozytorium:{' '}
            <DevToolsGithubLink
                href = 'https://github.com/Milosz08/ReactJS_Web_Application_POLSL'
                target = '_blank'
                rel = 'noreferrer'
            >
                Github
                <DevToolsOuterIcon>
                    <FiExternalLink/>
                </DevToolsOuterIcon>
            </DevToolsGithubLink>
        </DevToolsMainContent>
    </DevToolsTextContentContainer>
);

export default DevToolsContent;