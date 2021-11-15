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

import React, { Fragment, useEffect } from 'react';

import ModalsStateProvider from '../../../../contextStore/ModalsStateProvider';
import ROUTING_PATH_NAMES from '../../../../helpers/structs/routingPathNames';
import FormScheduleModalProvider from '../../../../contextStore/FormScheduleModalProvider';

const CookiesNotification = React.lazy(() => import('../../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../../layouts/CurrentURLpath/CurrentURLpath'));
const DeleteModalsStructure = React.lazy(() => import('./Modals/DeleteModalsStructure'));
const AddChangeModalsStructure = React.lazy(() => import('./Modals/AddChangeModalsStructure'));
const PanelsStructure = React.lazy(() => import('./PanelsStructure'));

/**
 * @details Component is responsible for generating the entire structure of the content management system
 *          administrator panel (CMS). It generates modal windows for adding/editing/deleting records and entire
 *          panels with navigation. The component is rendered by a protected React Router.
 */
const AdminCmsMainPanel = (): JSX.Element => {

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.CMS_PANEL_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <ModalsStateProvider>
                <FormScheduleModalProvider>
                    <DeleteModalsStructure/>
                    <AddChangeModalsStructure/>
                    <PanelsStructure/>
                </FormScheduleModalProvider>
            </ModalsStateProvider>
        </Fragment>
    );
}

export default AdminCmsMainPanel;