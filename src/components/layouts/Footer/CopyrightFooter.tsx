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

import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';

const {
    copyrightSectionWrapper, copyIcons, copyAuthor, copyCookies, cookiesIcon
} = require('./Footer.module.scss');

/**
 * @details Component that generates the final footer (copyright, link to the Cookies policy and icons from the
 *          FontAwesome library used).
 */
const CopytightFooter = (): JSX.Element => {

    const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    return (
        <div className = {copyrightSectionWrapper}>
            <div className = {copyIcons}>
                <span>Ikony pochodzą z biblioteki </span>
                <a
                    href = 'https://fontawesome.com/'
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    Font Awesome
                </a>.
            </div>
            <div className = {copyAuthor}>
                <span>&copy; 2020-{new Date().getFullYear()} by </span>
                <a
                    href = 'https://github.com/Milosz08'
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    Miłosz Gilga.
                </a>
            </div>
            <div className = {copyCookies}>
                <span>Ta strona wykorzystuje pliki cookies.</span>
                <FontAwesomeIcon
                    icon = {[ 'fas', 'cookie-bite' ]}
                    className = {cookiesIcon}
                />
                <DelayLink
                    to = '/polityka-prywatności-cookies'
                    delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                    replace = {false}
                    clickAction = {timeoutRoutePath}
                >
                    <a href = {'/polityka-prywatności-cookies'}>
                        Polityka Prywatności
                    </a>
                </DelayLink>
            </div>
        </div>
    );
}

export default CopytightFooter;