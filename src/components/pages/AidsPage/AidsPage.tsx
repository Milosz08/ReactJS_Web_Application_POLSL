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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

import COOKIES_OBJECT from '../../../constants/allCookies';
import TILES_DATA, { TilesDataTypes } from '../../../constants/aidsTilesData';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));

const { universalHeader, fasIcon } = require('./../../layouts/Navigation/Navigation.module.scss');
const {
    aidsContainer, aisdWrapper, logoutButton, aidsMainContent, msTeamsTile, title, iconContainer, icon
} = require('./AidsPage.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    setAuth: (value: boolean) => boolean;
    handleCookie: any;
}

/**
 * @details Component that generates a page with Learning Aids.
 *
 * @param setAuth { (value: boolean) => boolean } - function to set the authentication.
 * @param handleCookie { any } - function for removing/adding a Cookie object.
 */
const AidsPage: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

    const handleLogout = (): void => {
        setAuth(false);
        handleCookie(COOKIES_OBJECT.userSession, { path: '/' });
    }

    const generateTilesStructure = TILES_DATA.map((tile: TilesDataTypes) => (
        <a href = {tile.link} target = '_blank' rel = 'noreferrer' key = {tile.title}>
            <section className = {msTeamsTile}>
                <div className = {iconContainer}>
                    <FontAwesomeIcon
                        icon = {tile.icon}
                        className = {icon}
                    />
                </div>
                <div className = {title}>{tile.title}</div>
            </section>
        </a>
    ));

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.AISD_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {4}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <div className = {aidsContainer}>
                <div className = {aisdWrapper}>
                    <section className = {universalHeader}>
                        <h3>
                            <FontAwesomeIcon
                                icon = {[ 'fas', 'lightbulb' ]}
                                className = {fasIcon}
                            />
                            Pomoce Naukowe
                            <aside/>
                            <button
                                onClick = {handleLogout}
                                className = {logoutButton}
                            >Wyloguj
                            </button>
                        </h3>
                    </section>
                    <div className = {aidsMainContent}>
                        {generateTilesStructure}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AidsPage;