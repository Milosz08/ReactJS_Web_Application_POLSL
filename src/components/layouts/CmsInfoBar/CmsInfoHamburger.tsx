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

import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const {
    hamburgerContainer, hamburgerButton, hamburgerBars, hamburgerMenu, active, loginInfoHamburger, sessionTimeHamburger,
    logoutButton, logoutButtonHamburger, logoutIcon
} = require('./CmsInfoBar.module.scss');

interface PropsProvider {
    credLevel: string;
    timeCounting: string;
    callback: () => void;
}

/**
 * @details Component responsible for generating the hamburger menu for small devices in the CMS panel.
 */
const CmsInfoHamburger: React.FC<PropsProvider> = ({ credLevel, timeCounting, callback }): JSX.Element => {

    const [ activeMenu, setActiveMenu ] = useState<boolean>(false);

    return (
        <Fragment>
            <div className = {hamburgerContainer}>
                <button
                    className = {hamburgerButton}
                    onClick = {() => setActiveMenu(prevState => !prevState)}
                >
                    <span className = {classnames(hamburgerBars, activeMenu ? active : '')}/>
                </button>
            </div>
            <div className = {classnames(hamburgerMenu, activeMenu ? active : '')}>
            <span className = {loginInfoHamburger}>
               Zalogowany jako: <strong>{credLevel}</strong>
            </span>
                <span className = {sessionTimeHamburger}>
               Pozostały czas sesji: <strong>{timeCounting}</strong>
            </span>
                <button
                    className = {classnames(logoutButton, logoutButtonHamburger)}
                    onClick = {callback}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'power-off' ]}
                        className = {logoutIcon}
                    />
                    Wyloguj
                </button>
            </div>
        </Fragment>

    );
}

export default CmsInfoHamburger;