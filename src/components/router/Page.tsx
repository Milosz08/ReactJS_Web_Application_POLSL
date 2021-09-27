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
import { Route, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { LoginSessionContext, LoginSessionProviderTypes } from '../../contextStore/LoginSessionProvider';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../contextStore/CookiesObjectsProvider';

import CONSTANT_DATA from '../../constants/staticData';
import ProtectedLoginRoute from './ProtectedLoginRoute';

const StartPage = React.lazy(() => import('../pages/StartPage/StartPage'));
const AdminCmsLogin = React.lazy(() => import('../pages/AdminCmsSystemPage/AdminCmsLogin/AdminCmsLogin'));
const AdminCmsMainPanel = React.lazy(() => import('../pages/AdminCmsSystemPage/AdminCmsMainPanel/AdminCmsMainPanel'));
const CookiesPolicy = React.lazy(() => import('../pages/CookiesPolicyPage/CookiesPolicyPage'));
const SchedulePage = React.lazy(() => import('../pages/SchedulePage/SchedulePage'));
const CalendarPage = React.lazy(() => import('../pages/CalendarPage/CalendarPage'));
const SubjectsPassPage = React.lazy(() => import('../pages/SubjectsPassPage/SubjectsPassPage'));
const AidsPage = React.lazy(() => import('../pages/AidsPage/AidsPage'));
const AidsLogin = React.lazy(() => import('../pages/AidsPage/AidsLogin'));

/**
 * Fixed plaque storing all unprotected components representing single pages in routing.
 */
const PAGES_COMPONENTS: any[] = [ SchedulePage, CalendarPage, SubjectsPassPage, AidsPage ];

/**
 * @details Component generating routing on the page (also has a default forwarding from page 404 to the main page).
 *          It also supports the authentication of the user and administrator account and uses their blind.
 */
const Page = (): JSX.Element => {

    const { SITES } = CONSTANT_DATA;
    const {
        adminAuth, setAdminAuth, userAuth, setUserAuth
    } = useContext<Partial<LoginSessionProviderTypes>>(LoginSessionContext);
    const { cookie, setCookie, removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    useEffect(() => {
        cookie!.__adminSessionStayed !== undefined ? setAdminAuth!(true) : setAdminAuth!(false);
        cookie!.__userSessionStayed !== undefined ? setUserAuth!(true) : setUserAuth!(false);
    }, [ cookie, setAdminAuth, setUserAuth ]);

    // eslint-disable-next-line array-callback-return
    const routeStructure = SITES.map((site: { [value: string]: string }, index: number) => {
        if (site.title !== 'Pomoce naukowe') {
            const redeptWithPolish = site.title.replace(/\s+/g, '-').toLowerCase();
            return (
                <Route
                    path = {`/${redeptWithPolish}`}
                    component = {PAGES_COMPONENTS[index]}
                    key = {uuidv4()}
                />
            );
        }
    });

    return (
        <Fragment>
            <Switch>
                <Route
                    path = '/' exact
                    component = {StartPage}
                />
                {routeStructure}
                <ProtectedLoginRoute exact
                                     path = '/logowanie-do-panelu-administratora'
                                     component = {AdminCmsLogin}
                                     redirectPath = '/logowanie-do-panelu-administratora/panel-administratora'
                                     auth = {!adminAuth}
                                     setAuth = {setAdminAuth}
                                     handleCookie = {setCookie}
                />
                <ProtectedLoginRoute exact
                                     path = '/logowanie-do-panelu-administratora/panel-administratora'
                                     component = {AdminCmsMainPanel}
                                     redirectPath = '/logowanie-do-panelu-administratora'
                                     auth = {adminAuth}
                />
                <ProtectedLoginRoute exact
                                     path = '/logowanie'
                                     component = {AidsLogin}
                                     redirectPath = '/pomoce-naukowe'
                                     auth = {!userAuth}
                                     setAuth = {setUserAuth}
                                     handleCookie = {setCookie}
                />
                <ProtectedLoginRoute exact
                                     path = '/pomoce-naukowe'
                                     component = {AidsPage}
                                     redirectPath = '/logowanie'
                                     auth = {userAuth}
                                     setAuth = {setUserAuth}
                                     handleCookie = {removeCookie}
                />
                <Route
                    path = '/polityka-prywatności-cookies'
                    component = {CookiesPolicy}
                />
                <Route render = {() => <Redirect to = {{ pathname: '/' }}/>}/>
            </Switch>
        </Fragment>
    );
}

export default Page;