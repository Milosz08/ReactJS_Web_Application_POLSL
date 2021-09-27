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

import STATIC_STRUCTURE from '../../../../constants/cookiesPolicyContent';

const { cookieSectionsContent } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { cookiesSections, sectionSign, cookieContent } = require('./../CookiesPolicyPage.module.scss');

/**
 * @details Component generates information about third-party cookies on the subpage
 *          containing the privacy policy document.
 */
const CookiesOuterServices = (): JSX.Element => {

    const { LIST_STRUCTURE } = STATIC_STRUCTURE;

    return (
        <section className = {classnames(cookieSectionsContent, cookiesSections)}>
            <h3>
            <span className = {sectionSign}>
               &#167; {LIST_STRUCTURE.length + 1}
            </span>
                Serwisy zewnętrzne
                <aside/>
            </h3>
            <div className = {cookieContent}>
                Administrator deklaruje, że strona oraz on sam nie współpracuje z żadnymi serwisami
                zewnętrznymi, które mogą zamieszczać stałe pliki Cookie (persistent Cookies) na Urządzeniach
                Użytkownika. Administrator deklaruje, że strona może korzystać z nietrwałych plików Cookies
                dostarczanych przez serwisy zewnętrzne (Cookies sesyjne - session Cookies) w celu polepszenia
                indeksowania strony lub dostarczenia treści innego typu, niezbędnych do poprawnego działania
                Serwisu.
            </div>
        </section>
    );
}

export default CookiesOuterServices;