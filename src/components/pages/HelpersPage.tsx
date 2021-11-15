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

import React, { Fragment } from 'react';

import HelpersContent from '../layouts/HelpersContent/HelpersContent';
import usePageTitle from '../../helpers/hooks/usePageTitle';
import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';

const CookiesNotification = React.lazy(() => import('../layouts/CookiesNotification/CookiesNotification'));
const UserLogoutModal = React.lazy(() => import('../layouts/UserLogoutModal/UserLogoutModal'));
const Header = React.lazy(() => import('../layouts/Header/Header'));
const MobileDownNav = React.lazy(() => import('../layouts/MobileDownNav/MobileDownNav'));
const CurrentURLpath = React.lazy(() => import('../layouts/CurrentURLpath/CurrentURLpath'));

/**
 * Component responsible for generates a page with Learning Aids.
 */
const HelpersPage: React.FC = (): JSX.Element => {

    usePageTitle(ROUTING_PATH_NAMES.AISD_PAGE);

    return (
        <Fragment>
            <CookiesNotification/>
            <UserLogoutModal/>
            <MobileDownNav id = {4}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <HelpersContent/>
        </Fragment>
    );
}

export default HelpersPage;