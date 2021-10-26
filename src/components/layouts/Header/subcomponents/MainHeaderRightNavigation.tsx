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

import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import NAVIGATION_ELEMENTS from '../../../../helpers/structs/navigationElements';

import { NavigationHeaderInline, NavigationHeaderInlineSingleElement } from '../Header.styles';

/**
 * Component responsible for render navigation structure elements in right header container.
 */
const MainHeaderRightNavigation: React.FC = (): JSX.Element => {

    const navigationElements: JSX.Element[] = NAVIGATION_ELEMENTS.SITES.map(link => (
        <NavigationHeaderInlineSingleElement
            key = {link.path}
        >
            <DelayRouterLink
                render = {() => link.title}
                pathTo = {link.path}
            />
        </NavigationHeaderInlineSingleElement>
    ));

    return (
        <NavigationHeaderInline>
            {navigationElements}
        </NavigationHeaderInline>
    );
};

export default MainHeaderRightNavigation;