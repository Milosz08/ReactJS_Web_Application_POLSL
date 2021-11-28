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

import { CMS_ENDPOINTS, FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';

import {
    AdminCmsLayoutLastUpdateIndicator, AdminCmsLayoutRouterContainter, AdminCmsLayoutRouterSingleTile,
    CmsTileNavigateMessageIndicator
} from '../AdminCmsLayoutElements.styles';

const AdminCmsLayoutSingleStructureElement = React.lazy(() => import('./AdminCmsLayoutSingleStructureElement'));

/**
 * Component responsible for generating router links for subpages of CMS panel.
 */
const AdminCmsLayout: React.FC = (): JSX.Element => {

    const { footerFormMessages, lastUpdate }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const findAnyMess = footerFormMessages.filter(message => !Boolean(message.ifClicked)).length;

    const elements = CMS_ENDPOINTS.map(endpoint => {
        const findUpdateElement = lastUpdate.find(updateElm => updateElm.updateDateFor === endpoint.type);

        const singleElementStructure: JSX.Element = (
            <AdminCmsLayoutSingleStructureElement
                endpoint = {endpoint}
            />
        );

        return (
            <AdminCmsLayoutRouterSingleTile
                key = {endpoint.path}
            >
                {findUpdateElement && <AdminCmsLayoutLastUpdateIndicator>
                    Aktualizacja: {findUpdateElement.updateDate.fullDate}, {findUpdateElement.updateDate.fullTime}
                </AdminCmsLayoutLastUpdateIndicator>}
                <DelayRouterLink
                    render = {() => singleElementStructure}
                    pathTo = {`${FRONT_ENDPOINTS.ADMIN_PANEL}${endpoint.path}`}
                />
                {endpoint.title === 'Skrzynka' && findAnyMess > 0 && <CmsTileNavigateMessageIndicator
                    title = {`W skrzynce odbiorczej znajdują się ${findAnyMess} nowe wiadomości.`}
                >
                    {findAnyMess}
                </CmsTileNavigateMessageIndicator>}
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