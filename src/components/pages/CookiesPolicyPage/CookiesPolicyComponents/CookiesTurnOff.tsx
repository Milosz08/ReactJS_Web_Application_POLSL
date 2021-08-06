import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import STATIC_STRUCTURE from "../../../../constants/cookiesPolicyContent";

const { cookieSectionsContent } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { externalLinkIcon } = require('./../../../layouts/Footer/Footer.module.scss');
const { cookiesSections, sectionSign, cookieContent } = require('./../CookiesPolicyPage.module.scss');

/**
 * Generacja sekcji informacji o sposobach wyłączenia plików Cookies w przeglądarce
 */
const CookiesTurnOff = () => {

   const { LIST_STRUCTURE, NON_LIST_STRUCTURE } = STATIC_STRUCTURE;

   return (
      <section className = {classnames(cookieSectionsContent, cookiesSections)}>
         <h3>
            <span className = {sectionSign}>
               &#167; {LIST_STRUCTURE.length + NON_LIST_STRUCTURE.length + 2}
            </span>
            Jak wyłączyć pliki Cookie
            <aside/>
         </h3>
         <div className = {cookieContent}>
            Dyrektywa Unijna i Polskie Prawo Telekomunikacyjne nakazuje serwisom internetowym informowanie
            swoich użytkowników w jakim celu je wykorzystują i jak można je wyłączyć. Jeśli nie wiesz jak
            wyłączyć pliki Cookies na swoim Urządzeniu, przejdź pod <a
               href = 'https://jakwylaczyccookie.pl/jak-wylaczyc-pliki-cookies/'
               target = '_blank'
               rel = 'noreferrer'
            >
               ten link
               <FontAwesomeIcon
                  icon = {['fas', 'external-link-alt']}
                  className = {externalLinkIcon}
               />
            </a>.
         </div>
      </section>
   );
}

export default CookiesTurnOff;