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

import * as React from 'react';
import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { SessionInitialTypes } from '../../redux/sessionReduxStore/initialState';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

import ProtectedLoginRoute from '../../helpers/componentsAndMiddleware/ProtectedLoginRoute';
import useFirstPainfullLoad from '../../helpers/hooks/useFirstPainfullLoad';
import { FRONT_ENDPOINTS } from '../../helpers/structs/appEndpoints';
import NAVIGATION_ELEMENTS from '../../helpers/structs/navigationElements';

const StartPage = React.lazy(() => import('../pages/NormalPages/StartPage'));
const AdminCmsLogin = React.lazy(() => import('../pages/NormalPages/AdminCmsLogin'));
const CookiesPolicy = React.lazy(() => import('../pages/NormalPages/PrivacyPolicyPage'));
const SchedulePage = React.lazy(() => import('../pages/NormalPages/SchedulePage'));
const CalendarPage = React.lazy(() => import('../pages/NormalPages/CalendarPage'));
const SubjectsPassPage = React.lazy(() => import('../pages/NormalPages/SubjectsAndTermsPage'));
const HelpersPage = React.lazy(() => import('../pages/NormalPages/HelpersPage'));
const CmsProtectedRoute = React.lazy(() => import('./CmsProtectedRoute'));

/**
 * Fixed plaque storing all unprotected componentsAndMiddleware representing single pages in routing.
 */
const PAGES_COMPONENTS: React.FC[] = [
    SchedulePage, CalendarPage, SubjectsPassPage, HelpersPage, CookiesPolicy
];

/**
 * Component generating routing on the page (also has a default forwarding from page 404 to the main page).
 * It also supports the authentication of the user and administrator account and uses their blind.
 */
const NonProtectedRoute = (): JSX.Element => {

    const { setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    useFirstPainfullLoad();

    const routeStructure = NAVIGATION_ELEMENTS.SITES.map((site, idx) => (
        <Route
            path = {site.path}
            component = {PAGES_COMPONENTS[idx]}
            key = {site.path}
        />
    ));

    return (
        <Switch>
            <Route
                path = '/'
                exact = {true}
                component = {StartPage}
            />
            {routeStructure}
            <Route
                path = {FRONT_ENDPOINTS.PRIVACY_POLICY}
                component = {CookiesPolicy}
            />
            <ProtectedLoginRoute
                path = {FRONT_ENDPOINTS.ADMIN_LOGIN}
                component = {AdminCmsLogin}
                redirectPath = {FRONT_ENDPOINTS.ADMIN_PANEL}
                auth = {!adminAuthStatus.logged}
                handleCookie = {setCookie}
            />
            <Route
                path = {FRONT_ENDPOINTS.ADMIN_PANEL}
            >
                <CmsProtectedRoute/>
            </Route>
            <Route render = {() => <Redirect to = '/'/>}/>
        </Switch>
    );
}

export default NonProtectedRoute;