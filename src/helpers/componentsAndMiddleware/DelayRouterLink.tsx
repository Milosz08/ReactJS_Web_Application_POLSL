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
import DelayLink from 'react-delay-link';

import useChangeRoutePath, { ROUTER_INTERVAL_TIME } from '../hooks/useChangeRoutePath';
import { FRONT_ENDPOINTS } from '../structs/appEndpoints';

import styled from 'styled-components';
import { a_rs } from '../../styles/reset.styles';


interface PropsProvider {
    render: () => JSX.Element | string;
    pathTo: FRONT_ENDPOINTS | string;
}

/**
 * MiddleWare functioning as a react component that generates all children of the parent element "DelayLink"
 * based on parameters. It also decides the location of the path based on the parameters.
 *
 * @param render { () => JSX.Element | string } - a child to be rendered. Accepted React component or string.
 * @param pathTo { FRONT_ENDPOINTS } - routing final place.
 */
const DelayRouterLink: React.FC<PropsProvider> = ({ render, pathTo }): JSX.Element => {

    const timeoutRoutePath = useChangeRoutePath();

    return (
        <DelayLink
            to = {pathTo}
            delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
            replace = {false}
            clickAction = {() => timeoutRoutePath(pathTo)}
        >
            <DelayLinkAnchor href = {pathTo} >
                {render()}
            </DelayLinkAnchor>
        </DelayLink>
    );
};

const DelayLinkAnchor = styled(a_rs)`
    display: block;
    width: auto;
    height: 100%;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
`;

export default DelayRouterLink;