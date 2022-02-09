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

const DeleteContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/DeleteContentModal/DeleteContentModal'));
const ViewContentModal = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/ViewModalsGroup/ViewContentModal/ViewContentModal'));
const UserMessagesDelete = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/DeleteModalsGroup/CustomComponents/UserMessagesDelete'));
const UserMessagesView = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPageModals/ViewModalsGroup/CustomComponents/UserMessagesView'));

const CommonComponents = React.lazy(() => import('./subcomponents/CommonComponents'));
const UniversalHeader = React.lazy(() => import('../../reusable/UniversalHeader/UniversalHeader'));
const MessagesManagementCmsPage = React.lazy(() => import('../../layouts/CmsPageComponents/CmsPagePanels/MessageManagementCmsPage/MessagesManagementCmsPage'));

/**
 * Component responsible for generating CMS subpage for controlled user messages.
 */
const UserMessagesCmsSectionPage: React.FC = (): JSX.Element => {

    const { USERS_MESS_CMS_PAGE, CMS_PANEL_PAGE } = ROUTING_PATH_NAMES;
    usePageTitle(USERS_MESS_CMS_PAGE, CMS_PANEL_PAGE);

    return (
        <>
            <DeleteContentModal
                modalType = {allModals.USER_MESSAGES_MODAL}
                RenderCustomComponent = {UserMessagesDelete}
                pageTitle = {modalsInitialState[allModals.USER_MESSAGES_MODAL].pageTitle}
            />
            <ViewContentModal
                modalType = {allModals.USER_MESSAGES_MODAL}
                RenderCustomComponent = {UserMessagesView}
            />
            <CommonComponents/>
            <CommonPaginationContainer>
                <CommonPaginationWrapper>
                    <UniversalHeader
                        iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUsersCog' }}
                        content = 'Wiadomości Użytkowników'
                        ifCloseButtonVisible = {false}
                        changeIconSize = '1em'
                    />
                    <MessagesManagementCmsPage/>
                </CommonPaginationWrapper>
            </CommonPaginationContainer>
        </>
    );
};

export default UserMessagesCmsSectionPage;