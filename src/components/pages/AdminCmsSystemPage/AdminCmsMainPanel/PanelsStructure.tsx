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

import React, { useState } from 'react';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));
const AdminCmsLeftNavigation = React.lazy(() => import('./AdminCmsLeftNavigation'));

const HomePanel = React.lazy(() => import('./Panels/HomePanel'));
const Covid19Panel = React.lazy(() => import('./Panels/Covid19Panel'));
const FormDataAndValidateProvider = React.lazy(() => import('../../../../contextStore/FormDataAndValidateProvider'));
const SubjectsPanel = React.lazy(() => import('./Panels/SubjectsPanel'));
const SchedulePanel = React.lazy(() => import('./Panels/SchedulePanel'));
const CalendarPanel = React.lazy(() => import('./Panels/CalendarPanel'));
const UserMessagesPanel = React.lazy(() => import('./Panels/UserMessagePanel'));

const { adminLoginContainer, adminLoginWrapper } = require('../AdminCmsLogin/AdminCmsLogin.module.scss');
const { cmsSystemContainer, cmsContent } = require('./AdminCmsMainPanel.module.scss');

/**
 * @details Component is responsible for generating the structure of the content management system panel (CMS).
 *          The structure includes the header, all panels and tab navigation. The component has a hook that determines
 *          which panel is to be opened at the moment.
 */
const PanelsStructure = (): JSX.Element => {

    const [ activeNavElm, setActiveNavElm ] = useState<number>(0);

    return (
        <div className = {adminLoginContainer}>
            <div className = {adminLoginWrapper}>
                <UniversalHeader
                    iconP = {[ 'fas', 'industry' ]}
                    content = 'Panel Systemu Zarządzania Treścią'
                    ifCloseButtonVisible = {false}
                />
                <div className = {cmsSystemContainer}>
                    <AdminCmsLeftNavigation
                        activeNavElm = {activeNavElm}
                        setActiveNavElm = {setActiveNavElm}
                    />
                    <div className = {cmsContent}>
                        <HomePanel activeNavElm = {activeNavElm}/>
                        <Covid19Panel activeNavElm = {activeNavElm}/>
                        <FormDataAndValidateProvider>
                            <SubjectsPanel activeNavElm = {activeNavElm}/>
                        </FormDataAndValidateProvider>
                        <SchedulePanel activeNavElm = {activeNavElm}/>
                        <CalendarPanel activeNavElm = {activeNavElm}/>
                        <UserMessagesPanel activeNavElm = {activeNavElm}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PanelsStructure;