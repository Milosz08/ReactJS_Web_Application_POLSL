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

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const UniversalHeader = React.lazy(() => import('../../layouts/UniversalHeader/UniversalHeader'));

const { subjectsPassContainer, subjectsPassWrapper, infoBlock, linksContainer } = require('./SubjectsPassPage.module.scss');

/**
 * @details Component responsible for generating a page with the guidelines of the opinion of individual items.
 */
const SubjectsPassPage = (): JSX.Element => {

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.SUBJECT_PASS_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {3}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <div className = {subjectsPassContainer}>
                <div className = {subjectsPassWrapper}>
                    <UniversalHeader
                        iconP = {[ 'fas', 'university' ]}
                        content = "Warunki zaliczenia przedmiotów"
                        ifCloseButtonVisible = {false}
                    />
                    <div className = {infoBlock}>
                        <p>
                            Wszyskie karty przedmiotów, w których zawarte są opisy wymaganych umiejętności przed zaliczeniem
                            przedmiotu,
                            umiejętności nabyte podczas odbywania przedmiotu, oraz umiejętności niezbędne do zdania przedmiotu,
                            znajdziesz
                            na oficjalnej stronie Wydziału Elektrycznego Politechniki Śląskiej.
                        </p>
                        <div className = {linksContainer}>
                            <a
                                href = "https://www.elektr.polsl.pl/images/files/szjk/karty/2020/Karty_I_ST_1-2019.zip"
                                target = "_blank"
                                rel = "noreferrer"
                            >
                                Karty przedmiotów
                            </a>
                            <a
                                href = "https://www.elektr.polsl.pl/images/files/szjk/plany/2019/Plan_I_st_stacjonarne_Ist_2019-2020.xls"
                                target = "_blank"
                                rel = "noreferrer"
                            >
                                Plan studiów
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SubjectsPassPage;