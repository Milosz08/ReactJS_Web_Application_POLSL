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

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const { cookiesInfoHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { cookiesSections, cookieContent } = require('./../CookiesPolicyPage.module.scss');

/**
 * @details Component generates a header in the subpage containing the privacy policy document.
 */
const CookiesHeader = (): JSX.Element => {
    return (
        <header className = {classnames(cookiesInfoHeader, cookiesSections)}>
            <UniversalHeader
                iconP = {[ 'fas', 'cookie-bite' ]}
                content = 'Polityka Cookies'
                ifCloseButtonVisible = {false}
            />
            <div className = {cookieContent}>
                Poniższa treść Polityki Cookies określa zasady zapisywania i uzyskiwania dostępu do danych na
                Urządzeniach elektronicznych, dalej nazywanych Urządzeniami Użytkowników korzystających z
                Serwisu do celów świadczenia usług drogą elektroniczną przez Administratora Serwisu.
            </div>
        </header>
    );
}

export default CookiesHeader;