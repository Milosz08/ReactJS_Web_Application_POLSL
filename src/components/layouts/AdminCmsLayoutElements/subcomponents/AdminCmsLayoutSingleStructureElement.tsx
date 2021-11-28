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
import { CmsEndpointsTypes } from '../../../../helpers/structs/appEndpoints';

import {
    CmsTileArrowContainter, CmsTileDescription, CmsTileLayoutElement, CmsTileLayoutHeader,
    CmsTileLayoutHeaderAndIconContainer, CmsTileLayoutIconWrapper, CmsTileNavigateArrow
} from '../AdminCmsLayoutElements.styles';

interface PropsProvider {
    endpoint: CmsEndpointsTypes;
}

/**
 * Component reponsible for generaing CMS panel link anchor single element structure.
 *
 * @param endpoint { { [key: string]: string | updateSections } } - single object element.
 */
const AdminCmsLayoutSingleStructureElement: React.FC<PropsProvider> = ({ endpoint }): JSX.Element => (
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

export default AdminCmsLayoutSingleStructureElement;