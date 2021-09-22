/**
 * @file DevToolsInfo.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
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