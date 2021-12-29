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
import { Redirect, Route } from 'react-router';
import { Switch, useRouteMatch } from 'react-router-dom';

import { CMS_ENDPOINTS, FRONT_ENDPOINTS } from '../../helpers/structs/appEndpoints';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { SessionInitialTypes } from '../../redux/sessionReduxStore/initialState';

const ProtectedLoginRoute = React.lazy(() => import('../../helpers/componentsAndMiddleware/ProtectedLoginRoute'));
const AdminCmsMainPanel = React.lazy(() => import('../pages/NormalPages/AdminCmsPage'));

const CovidCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/CovidCmsSectionPage'));
const SubjectsCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/SubjectsCmsSectionPage'));
const ScheduleCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/ScheduleCmsSectionPage'));
const CalendarCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/CalendarCmsSectionPage'));
const UserMessagesCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/UserMessagesCmsSectionPage'));
const HelperLinksCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/HelperLinksCmsSectionPage'));
const AuthCmsSectionPage = React.lazy(() => import('../pages/CmsProtectedPages/AuthCmsSectionPage'));

/**
 * Components generating all sections (the order matters).
 */
const allRoutesComponents: React.FC[] = [
    CovidCmsSectionPage, SubjectsCmsSectionPage, ScheduleCmsSectionPage, CalendarCmsSectionPage,
    UserMessagesCmsSectionPage, HelperLinksCmsSectionPage, AuthCmsSectionPage
];

/**
 * Component responsible for generating nested routing for protected cms system routes
 * structure (all sections).
 */
const CmsProtectedRoute: React.FC = (): JSX.Element => {

    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const { path } = useRouteMatch();

    const generateProtectedRouting: JSX.Element[] = CMS_ENDPOINTS.map((endpoint, idx) => (
        <ProtectedLoginRoute
            path = {`${path}${endpoint.path}`}
            redirectPath = {FRONT_ENDPOINTS.ADMIN_LOGIN}
            component = {allRoutesComponents[idx]}
            auth = {adminAuthStatus.logged}
            key = {endpoint.path}
        />
    ));

    return (
        <Switch>
            <ProtectedLoginRoute
                exact = {true}
                path = {path}
                redirectPath = {FRONT_ENDPOINTS.ADMIN_LOGIN}
                auth = {adminAuthStatus.logged}
                component = {AdminCmsMainPanel}
            />
            {generateProtectedRouting}
            <Route render = {() => <Redirect to = {path}/>}/>
        </Switch>
    );
};

export default CmsProtectedRoute;