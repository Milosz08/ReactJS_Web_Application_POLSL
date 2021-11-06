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
import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';

import usePageTitle from '../../helpers/hooks/usePageTitle';
import PrivacyPolicy from '../layouts/PrivacyPolicy/PrivacyPolicy';

const MobileDownNav = React.lazy(() => import('../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../layouts/CurrentURLpath/CurrentURLpath'));

/**
 * Component generates a privacy policy document.
 */
const CookiesPolicy: React.FC = (): JSX.Element => {

    usePageTitle(ROUTING_PATH_NAMES.COOKIES_POLICY);

    return (
        <Fragment>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {false}/>
            <PrivacyPolicy/>
        </Fragment>
    );
}

export default CookiesPolicy;