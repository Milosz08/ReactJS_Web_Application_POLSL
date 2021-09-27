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
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import STATIC_STRUCTURE from '../../../../constants/cookiesPolicyContent';

const { cookieSectionsContent } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { externalLinkIcon } = require('./../../../layouts/Footer/Footer.module.scss');
const { cookiesSections, sectionSign, cookieContent } = require('./../CookiesPolicyPage.module.scss');

/**
 * @details The component generates information on how to disable cookies on the User's device in the
 *          subpage containing the privacy policy document.
 */
const CookiesTurnOff = (): JSX.Element => {

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
                    icon = {[ 'fas', 'external-link-alt' ]}
                    className = {externalLinkIcon}
                />
            </a>.
            </div>
        </section>
    );
}

export default CookiesTurnOff;