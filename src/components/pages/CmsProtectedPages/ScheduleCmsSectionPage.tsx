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

import usePageTitle from '../../../helpers/hooks/usePageTitle';
import ROUTING_PATH_NAMES from '../../../helpers/structs/routingPathNames';
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { allModals } from '../../../redux/modalsReduxStore/types';
import { modalsInitialState } from '../../../redux/modalsReduxStore/initialState';

import { CommonPaginationContainer, CommonPaginationWrapper } from './subcomponents/CommonPagination.styles';

const ScheduleDelete = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/CustomComponents/ScheduleDelete'));
const DeleteContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/DeleteContentModal/DeleteContentModal'));
const ScheduleAddEdit = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/AddEditModalsGroup/CustomComponents/ScheduleAddEdit/ScheduleAddEdit'));
const AddEditContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/AddEditModalsGroup/AddEditContentModal/AddEditContentModal'));

const CommonComponents = React.lazy(() => import('./subcomponents/CommonComponents'));
const UniversalHeader = React.lazy(() => import('../../reusable/UniversalHeader/UniversalHeader'));
const ChangeScheduleCmsPage = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPagePanels/ChangeScheduleCmsPage/ChangeScheduleCmsPage'));

/**
 * Component responsible for generating CMS subpage for controlled schedule.
 */
const ScheduleCmsSectionPage: React.FC = (): JSX.Element => {

    const { SCHEDULE_CMS_PAGE, CMS_PANEL_PAGE } = ROUTING_PATH_NAMES;
    usePageTitle(SCHEDULE_CMS_PAGE, CMS_PANEL_PAGE);

    return (
        <>
            <DeleteContentModal
                modalType = {allModals.SCHEDULE_MODAL}
                RenderCustomComponent = {ScheduleDelete}
                pageTitle = {modalsInitialState[allModals.SCHEDULE_MODAL].pageTitle}
            />
            <AddEditContentModal
                modalType = {allModals.SCHEDULE_MODAL}
                RenderCustomComponent = {ScheduleAddEdit}
            />
            <CommonComponents/>
            <CommonPaginationContainer>
                <CommonPaginationWrapper>
                    <UniversalHeader
                        iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUsersCog' }}
                        content = 'Modyfikuj Plan Zajęć'
                        ifCloseButtonVisible = {false}
                        changeIconSize = '1em'
                    />
                    <ChangeScheduleCmsPage/>
                </CommonPaginationWrapper>
            </CommonPaginationContainer>
        </>
    );
};

export default ScheduleCmsSectionPage;