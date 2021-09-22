/**
 * @file CookiesOuterServices.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
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