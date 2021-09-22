/**
 * @file SubjectsPassPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: ---
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