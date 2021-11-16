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

import React, { Fragment, useContext, useEffect } from 'react';

import useIsMount from '../../helpers/hooks/useIsMount';
import usePageTitle from '../../helpers/hooks/usePageTitle';
import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

import { useDispatch } from 'react-redux';
import { changeAdminLoggedStatus } from '../../redux/sessionReduxStore/actions';

const CookiesNotification = React.lazy(() => import('../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../layouts/CurrentURLpath/CurrentURLpath'));
const AdminCmsLayoutElements = React.lazy(() => import('../layouts/AdminCmsLayoutElements/AdminCmsLayoutElements'));

/**
 * Component responsible for generating the entire structure of the content management system
 * administrator panel (CMS). It generates modal windows for adding/editing/deleting records and entire
 * panels with navigation. The component is rendered by a protected React Router.
 */
const AdminCmsPage = (): JSX.Element => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const dispatcher = useDispatch();
    const isMount = useIsMount();

    usePageTitle(ROUTING_PATH_NAMES.CMS_PANEL_PAGE);

    useEffect(() => {
        if (Boolean(cookie![COOKIES_OBJECT.adminSession]) && isMount) {
            dispatcher(changeAdminLoggedStatus(true, Number(cookie![COOKIES_OBJECT.adminSession])));
        }
    }, [ cookie, dispatcher, isMount ]);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <AdminCmsLayoutElements/>
        </Fragment>
    );
}

export default AdminCmsPage;