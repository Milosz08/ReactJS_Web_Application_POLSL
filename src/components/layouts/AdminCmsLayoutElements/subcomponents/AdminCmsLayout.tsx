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

import IconComponent, { IconFamiliesType } from '../../../../helpers/componentsAndMiddleware/IconComponent';
import { CMS_ENDPOINTS, FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';

import {
    AdminCmsLayoutRouterContainter, AdminCmsLayoutRouterSingleTile, CmsTileArrowContainter, CmsTileDescription,
    CmsTileLayoutElement, CmsTileLayoutHeader, CmsTileLayoutHeaderAndIconContainer, CmsTileLayoutIconWrapper, CmsTileNavigateArrow
} from '../AdminCmsLayoutElements.styles';

/**
 * Component responsible for generating router links for subpages of CMS panel.
 */
const AdminCmsLayout: React.FC = (): JSX.Element => {

    const elements = CMS_ENDPOINTS.map(endpoint => {

        const singleElementStructure: JSX.Element = (
            <CmsTileLayoutElement>
                <CmsTileLayoutHeaderAndIconContainer>
                    <CmsTileLayoutHeader>
                        {endpoint.title}
                    </CmsTileLayoutHeader>
                    <CmsTileLayoutIconWrapper>
                        <IconComponent
                            family = {IconFamiliesType.BootStrapIcons}
                            name = {endpoint.icon}
                        />
                    </CmsTileLayoutIconWrapper>
                </CmsTileLayoutHeaderAndIconContainer>
                <CmsTileDescription>
                    {endpoint.description}
                </CmsTileDescription>
                <CmsTileArrowContainter>
                    <CmsTileNavigateArrow/>
                </CmsTileArrowContainter>
            </CmsTileLayoutElement>
        );

        return (
            <AdminCmsLayoutRouterSingleTile>
                <DelayRouterLink
                    render = {() => singleElementStructure}
                    pathTo = {`${FRONT_ENDPOINTS.ADMIN_PANEL}${endpoint.path}`}
                    key = {endpoint.path}
                />
            </AdminCmsLayoutRouterSingleTile>
        );
    });

    return (
        <AdminCmsLayoutRouterContainter>
            {elements}
        </AdminCmsLayoutRouterContainter>
    );
};

export default AdminCmsLayout;