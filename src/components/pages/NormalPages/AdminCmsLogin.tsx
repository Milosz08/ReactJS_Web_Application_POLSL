/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import * as React from 'react';

import usePageTitle from '../../../helpers/hooks/usePageTitle';
import ROUTING_PATH_NAMES from '../../../helpers/structs/routingPathNames';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const AdminCmsLoginElements = React.lazy(() => import('../../layouts/AdminCmsLoginElements/AdminCmsLoginElements'));

/**
 * Component responsible for generating the input field for the user name, password and token in order to log in to
 * the CMS panel. The component takes the encrypted data from the API and decrypts it by checking against the data
 * entered by the user. If the data is identical, you will be redirected to the CMS panel.
 */
const AdminCmsLogin: React.FC = (): JSX.Element => {

    usePageTitle(ROUTING_PATH_NAMES.CMS_LOGIN_PAGE);

    return (
        <>
            <CookiesNotification/>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {false}/>
            <AdminCmsLoginElements/>
        </>
    );
}

export default AdminCmsLogin;