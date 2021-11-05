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

import React, { useContext, useEffect, useRef } from 'react';
import { Fragment } from 'react';

import ROUTING_PATH_NAMES from '../../constants/routingPathNames';

import { MainStoreContext, MainStoreProviderTypes } from '../../contextStore/MainStoreProvider';
import ScheduleTypeManagement from '../layouts/ScheduleTypeManagement/ScheduleTypeManagement';
import ScheduleSaveModal from '../layouts/ScheduleSaveModal/ScheduleSaveModal';
import ScheduleClearModal from '../layouts/ScheduleClearModal/ScheduleClearModal';
import ScheduleAsideHeader from '../layouts/ScheduleAsideHeader/ScheduleAsideHeader';
import ScheduleLayout from '../layouts/ScheduleLayout/ScheduleLayout';
import ScheduleDateUpdate from '../layouts/ScheduleDateUpdate/ScheduleDateUpdate';
import SchedulePdfGenerator from '../layouts/SchedulePdfGenerator/SchedulePdfGenerator';

const CookiesNotification = React.lazy(() => import('../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../layouts/CurrentURLpath/CurrentURLpath'));

/**
 * Static array of strings representing the consecutive days of the week.
 */
export const STATIC_DAYS: string[] = [ 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek' ];

/**
 * Component rendering subpage with a class schedule (standard componentsAndMiddleware, form on the basis of which a plan,
 * a grid with a plan for classes and additional tools for the plan - generation of a PDF document) is generated.
 */
const SchedulePage = (): JSX.Element => {

    const executeScrollRef: React.MutableRefObject<any> = useRef<HTMLElement>(null);

    const executeScroll = (): void => {
        executeScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }


    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.SCHEDULE_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <CookiesNotification/>
            <ScheduleSaveModal/>
            <ScheduleClearModal/>
            <MobileDownNav id = {1}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <ScheduleTypeManagement/>
            <ScheduleAsideHeader/>
            <ScheduleLayout/>
            <ScheduleDateUpdate/>
            <SchedulePdfGenerator/>
        </Fragment>
    );
}

export default SchedulePage;