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

import React, { Fragment, useEffect } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import STATIC_STRUCTURE, { ListTypes, NonListTypes } from '../../../constants/cookiesPolicyContent';

const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const UniversalHeader = React.lazy(() => import('../../layouts/UniversalHeader/UniversalHeader'));
const CookiesHeader = React.lazy(() => import('./CookiesPolicyComponents/CookiesHeader'));
const CookiesOuterServices = React.lazy(() => import('./CookiesPolicyComponents/CookiesOuterServices'));
const CookiesTurnOff = React.lazy(() => import('./CookiesPolicyComponents/CookiesTurnOff'));

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
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {false}/>
            <div className = {cookiesInfoContainer}>
                <div className = {cookiesInfoWrapper}>
                    <CookiesHeader/>
                    {generateListStructureDOM}
                    <CookiesOuterServices/>
                    {generateNonListStructureDOM}
                    <CookiesTurnOff/>
                    <section className = {classnames(cookieSectionsContent, cookiesSections)}>
                        <UniversalHeader
                            iconP = {[ 'fas', 'user-lock' ]}
                            content = 'Bezpieczeństwo Aplikacji'
                            ifCloseButtonVisible = {false}
                        />
                        <div className = {cookieContent}>
                            Wrażliwe dane wpisywane do formularzy (hasła, tokeny), dane wysyłane do administratorów i moderatorów
                            strony w formularzach przez Użytkowników oraz wrażliwe dane w bazie danych przechowywane są po
                            wcześniejszym zaszyfrowaniu. Aplikacja używa jednego z najbardziej niezawodnych symetrycznych
                            algorytmów kryptograficznych wraz każdorazowo generowanym sekretnym kluczem.
                        </div>
                    </section>
                    <div className = {sectionDecorationSign}>&#167;</div>
                </div>
            </div>
        </Fragment>
    );
}

export default CookiesPolicy;