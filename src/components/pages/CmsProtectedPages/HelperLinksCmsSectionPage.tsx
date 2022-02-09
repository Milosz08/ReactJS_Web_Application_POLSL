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

const AddEditContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/AddEditModalsGroup/AddEditContentModal/AddEditContentModal'));
const DeleteContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/DeleteContentModal/DeleteContentModal'));
const CustomContentForHelpersLinksAddEdit = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/AddEditModalsGroup/CustomComponents/HelpersLinksAddEdit/HelpersLinksAddEdit'));
const CustomContentForHelpersLinksDelete = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/CustomComponents/HelpersLinksDelete'));

const CommonComponents = React.lazy(() => import('./subcomponents/CommonComponents'));
const UniversalHeader = React.lazy(() => import('../../reusable/UniversalHeader/UniversalHeader'));
const HelpersLinksCmsPage = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPagePanels/HelpersLinksCmsPage/HelpersLinksCmsPage'));

/**
 * Component responsible for generating CMS subpage for controlled helpers.
 */
const HelperLinksCmsSectionPage: React.FC = (): JSX.Element => {

    const { HELPS_CMS_PAGE, CMS_PANEL_PAGE } = ROUTING_PATH_NAMES;
    usePageTitle(HELPS_CMS_PAGE, CMS_PANEL_PAGE);

    return (
        <>
            <DeleteContentModal
                modalType = {allModals.HELPERS_LINKS_MODAL}
                RenderCustomComponent = {CustomContentForHelpersLinksDelete}
                pageTitle = {modalsInitialState[allModals.HELPERS_LINKS_MODAL].pageTitle}
            />
            <AddEditContentModal
                modalType = {allModals.HELPERS_LINKS_MODAL}
                RenderCustomComponent = {CustomContentForHelpersLinksAddEdit}
            />
            <CommonComponents/>
            <CommonPaginationContainer>
                <CommonPaginationWrapper>
                    <UniversalHeader
                        iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUsersCog' }}
                        content = 'Modyfikuj Pomoce Naukowe'
                        ifCloseButtonVisible = {false}
                        changeIconSize = '1em'
                    />
                    <HelpersLinksCmsPage/>
                </CommonPaginationWrapper>
            </CommonPaginationContainer>
        </>
    );
};

export default HelperLinksCmsSectionPage;