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

import DelayRouterLink from '../../../helpers/componentsAndMiddleware/DelayRouterLink';
import { FRONT_ENDPOINTS } from '../../../helpers/structs/appEndpoints';

import { CurrentURLpathContainer, CurrentURLpathSingleElement, CurrentURLpathWrapper } from './CurrentURLpath.styles';

const SingleCurrentURLpath = React.lazy(() => import('./subcomponents/SingleCurrentURLpath'));

interface PropsProvider {
    ifImportatHeaderActive: boolean;
    ifCmsPath?: boolean;
}

/**
 * Component that generates navigation of pages / subpages. Depending on the address path, it generates an
 * appropriate sequence of hyperlinks to subsequent subpages.
 *
 * @params ifImportatHeaderActive { boolean } - decides whether the navigation should be lower than the top of the page.
 */
const CurrentURLpath: React.FC<PropsProvider> = ({ ifImportatHeaderActive, ifCmsPath }): JSX.Element => (
    <CurrentURLpathContainer
        changeTop = {ifImportatHeaderActive}
        ifCmsPath = {ifCmsPath}
    >
        <CurrentURLpathWrapper
            changeTop = {ifImportatHeaderActive}
        >
            <CurrentURLpathSingleElement>
                <DelayRouterLink
                    render = {() => 'Strona Główna'}
                    pathTo = {FRONT_ENDPOINTS.ABSOLUTE}
                />
            </CurrentURLpathSingleElement>
            <SingleCurrentURLpath
                ifCmsPath = {Boolean(ifCmsPath)}
            />
        </CurrentURLpathWrapper>
    </CurrentURLpathContainer>
);

export default CurrentURLpath;