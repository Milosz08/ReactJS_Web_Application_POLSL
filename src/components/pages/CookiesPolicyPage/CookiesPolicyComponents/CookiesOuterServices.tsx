import React from 'react';
import classnames from 'classnames';

import STATIC_STRUCTURE from "../../../../constants/cookiesPolicyContent";

const { cookieSectionsContent } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
   cookiesSections, sectionSign, cookieContent
} = require('./../CookiesPolicyPage.module.scss');

const CookiesOuterServices = () => {

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