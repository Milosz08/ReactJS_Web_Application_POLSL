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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {
    devInfoContainer, nodeJsIcon, nodeJsLogo, reactDevInfo, reactIcon, reactLogo, reactTextContent,
    devInfoIconsContainer
} = require('./DevToolsInfo.module.scss');
const { externalLinkIcon } = require('./../Footer/Footer.module.scss');

/**
 * @details Component responsible for generating a block of information about the technologies used in the application
 *          development process. It appears on all subpages, positioned relatively to the content and footer.
 */
const DevToolsInfo = (): JSX.Element => {

    const generateReactLogo = () => (
        <div className = {reactLogo}>
            <FontAwesomeIcon icon = {[ 'fab', 'react' ]} className = {reactIcon}/>
        </div>
    );

    const generateNodeLogo = () => (
        <div className = {nodeJsLogo}>
            <FontAwesomeIcon icon = {[ 'fab', 'node-js' ]} className = {nodeJsIcon}/>
        </div>
    );

    return (
        <aside className = {reactDevInfo}>
            <div className = {devInfoContainer}>
                <div className = {devInfoIconsContainer}>
                    {generateReactLogo()}
                    {generateNodeLogo()}
                </div>
                <div className = {reactTextContent}>
                    <p>
                        Warstwę wizualną aplikacji (front-end) stworzyłem przy pomocy biblioteki <strong>ReactJS. </strong>
                        Aplikacja została napisana w standardzie <strong>SPA (Single Page Application)</strong>
                        . Do stworzenia warstwy serwerowej (back-end) wykorzystałem środowisko <strong> NodeJS </strong>
                        wraz z nierelacyjną (noSQL) bazą danych <strong>MongoDB</strong>. Do aplikacji stworzyłem autorski
                        system CMS bazujący na mechanice działania <strong> Strapi</strong>. Cały kod projektu wraz ze
                        szczegółowym opisem znajduje się na moim repozytorium
                        <a
                            href = 'https://github.com/Milosz08/polsl-web-application-typescript-frontend'
                            target = '_blank'
                            rel = 'noreferrer'
                        >
                            <span> Github</span>
                            <FontAwesomeIcon
                                icon = {[ 'fas', 'external-link-alt' ]}
                                className = {externalLinkIcon}
                            />
                        </a>.
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default DevToolsInfo;