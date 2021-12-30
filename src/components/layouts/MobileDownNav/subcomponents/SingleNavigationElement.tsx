/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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
import DelayLink from 'react-delay-link';

import { ROUTER_INTERVAL_TIME } from '../../../../helpers/hooks/useChangeRoutePath';

import { MobileDownNavSingleAnchor, MobileDownNavSingleElementContainer } from '../MobileDownNav.styles';

const IconComponent = React.lazy(() => import('../../../../helpers/componentsAndMiddleware/IconComponent'));

interface PropsProvider {
    pathAttr: {
        path: string,
        id: number
    };
    action: (id: number, path: string) => void;
    icon: string;
}

/**
 * Component responsible for generating a single button (routing) in the bottom menu on mobile devices (phones).
 *
 * @param pathAttr { [value: string]: string | number } - path and name property object.
 * @param action { (id: number) => void } - function is started by pressing the button.
 * @param componentsObj { React.ReactElement } - icon (filled and empty) in the form of a React component.
 */
const SingleNavigationElement: React.FC<PropsProvider> = ({ pathAttr, action, icon }): JSX.Element => (
    <MobileDownNavSingleElementContainer>
        <DelayLink
            to = {pathAttr.path}
            delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
            replace = {false}
            clickAction = {() => action(pathAttr.id, pathAttr.path)}
        >
            <MobileDownNavSingleAnchor
                href = {pathAttr.path}
            >
                <IconComponent
                    family = {'AntDesignIcons'}
                    name = {icon}
                />
            </MobileDownNavSingleAnchor>
        </DelayLink>
    </MobileDownNavSingleElementContainer>
);

export default SingleNavigationElement;