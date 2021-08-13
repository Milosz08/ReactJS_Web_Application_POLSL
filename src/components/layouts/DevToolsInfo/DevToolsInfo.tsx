import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {
   devInfoContainer, nodeJsIcon, nodeJsLogo, reactDevInfo, reactIcon, reactLogo, reactTextContent,
   devInfoIconsContainer
} = require('./DevToolsInfo.module.scss');
const { externalLinkIcon } = require('./../Footer/Footer.module.scss');

/**
 * Komponent odpowiadający za generowanie bloku informacji o użytych technologiach w procesie budowanie aplikacji.
 * Pojawia się on na wszystkich podstronach, pozycjonowany relatywnie względem kontentu i stopki.
 */
const DevToolsInfo = () => {
   return (
      <aside className = {reactDevInfo}>
         <div className = {devInfoContainer}>
            <div className = {devInfoIconsContainer}>
               <div className = {reactLogo}>
                  <FontAwesomeIcon
                     icon = {['fab', 'react']}
                     className = {reactIcon}
                  />
               </div>
               <div className = {nodeJsLogo}>
                  <FontAwesomeIcon
                     icon = {['fab', 'node-js']}
                     className = {nodeJsIcon}
                  />
               </div>
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
                        icon = {['fas', 'external-link-alt']}
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