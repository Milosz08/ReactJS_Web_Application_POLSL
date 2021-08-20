/**
 * @file CookiesPolicyPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                uuid: "^8.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useEffect } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import Header from '../../layouts/Header/Header';
import UniversalHeader from '../../layouts/UniversalHeader/UniversalHeader';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import CookiesHeader from './CookiesPolicyComponents/CookiesHeader';
import CookiesOuterServices from './CookiesPolicyComponents/CookiesOuterServices';
import CookiesTurnOff from './CookiesPolicyComponents/CookiesTurnOff';

import STATIC_STRUCTURE, { ListTypes, NonListTypes } from '../../../constants/cookiesPolicyContent';

const { cookieSectionsContent } = require('./../../layouts/Navigation/Navigation.module.scss');
const {
   cookiesInfoContainer, cookiesInfoWrapper, sectionSign, cookiesSections, cookiesList, sectionDecorationSign,
   cookieContent
} = require('./CookiesPolicyPage.module.scss');

/**
 * @details Component generates a privacy policy document.
 */
const CookiesPolicy = (): JSX.Element => {

   const { LIST_STRUCTURE, NON_LIST_STRUCTURE } = STATIC_STRUCTURE;
   const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

   const generateListStructureDOM = LIST_STRUCTURE.map((structure: ListTypes, index: number) => {
      const generateSingleElement = structure.sectionArray.map((element: { [value: string]: string }) => (
         <li key = {uuidv4()}>
            <strong>
               {capitalizeFirstLetter(element.title)}
            </strong> - {element.description}.
         </li>
      ));
      return (
         <section
            className = {classnames(cookieSectionsContent, cookiesSections)}
            key = {uuidv4()}
         >
            <h3>
               <span className = {sectionSign}>&#167; {index + 1}</span>
               {structure.sectionID}
               <aside/>
            </h3>
            <ul className = {cookiesList}>
               {generateSingleElement}
            </ul>
         </section>
      );
   });

   const generateNonListStructureDOM = NON_LIST_STRUCTURE.map((structure: NonListTypes, index: number) => {
      const nextElmIndex = LIST_STRUCTURE.length + index + 2;
      const generateSingleElement = structure.sectionArray.map((position: string) => (
         <li key = {uuidv4()}>
            {position}.
         </li>
      ));
      return (
         <section
            className = {classnames(cookieSectionsContent, cookiesSections)}
            key = {uuidv4()}
         >
            <h3>
               <span className = {sectionSign}>&#167; {nextElmIndex}</span>
               {structure.sectionID}
               <aside/>
            </h3>
            <ul className = {cookiesList}>
               {generateSingleElement}
            </ul>
         </section>
      );
   });

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.COOKIES_POLICY;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <Header ifHeaderHasRedBar = {false}/>
         <CurrentURLpath ifImportatHeaderActive = {false}/>
         <div className = {cookiesInfoContainer}>
            <div className = {cookiesInfoWrapper}>
               <CookiesHeader/>
               {generateListStructureDOM}
               <CookiesOuterServices/>
               {generateNonListStructureDOM}
               <CookiesTurnOff/>
               <UniversalHeader
                  iconP = {['fas', 'user-lock']}
                  content = 'Bezpieczeństwo Aplikacji'
                  ifCloseButtonVisible = {false}
               />
               <div className = {cookieContent}>
                  Wrażliwe dane wpisywane do formularzy (hasła, tokeny), dane wysyłane do administratorów i moderatorów
                  strony w formularzach przez Użytkowników oraz wrażliwe dane w bazie danych przechowywane są po
                  wcześniejszym zaszyfrowaniu. Aplikacja używa jednego z najbardziej niezawodnych
                  algorytmów kryptograficznych wraz każdorazowo generowanym sekretnym kluczem.
               </div>
               <div className = {sectionDecorationSign}>&#167;</div>
            </div>
         </div>
      </Fragment>
   );
}

export default CookiesPolicy;