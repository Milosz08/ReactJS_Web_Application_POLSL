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
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/all';

import { FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';
import useResizeListener from '../../../../helpers/hooks/useResizeListener';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import CurrentPathIntoString from '../../../../helpers/functionsAndClasses/currentPathIntoString';

import {
    CurrentURLpathMultipleElement, CurrentURLpathSingleElement, CurrentURLSingleElementArrowWrapper
} from '../CurrentURLpath.styles';

interface PropsProvider {
    ifCmsPath: boolean;
}

/**
 * Component responsible for generating all path taken from browser path properties.
 */
const SingleCurrentURLpath: React.FC<PropsProvider> = ({ ifCmsPath }): JSX.Element => {

    const width = useResizeListener();

    const generateMultiplePathNavElements: JSX.Element[] = new CurrentPathIntoString().convertData().map(element => (
        <CurrentURLpathSingleElement
            key = {element.path}
        >
            <CurrentURLSingleElementArrowWrapper>
                <BsArrowRightShort/>
            </CurrentURLSingleElementArrowWrapper>
            <DelayRouterLink
                render = {() => element.name}
                pathTo = {element.path}
            />
        </CurrentURLpathSingleElement>
    ));

    const generateCmsReturnSinglePath = (): JSX.Element => (
        <CurrentURLpathSingleElement>
            <CurrentURLSingleElementArrowWrapper>
                <BsArrowLeftShort/>
            </CurrentURLSingleElementArrowWrapper>
            <DelayRouterLink
                render = {() => 'Powrót do Panelu'}
                pathTo = {FRONT_ENDPOINTS.ADMIN_PANEL}
            />
        </CurrentURLpathSingleElement>
    );

    return (
        <CurrentURLpathMultipleElement>
            {width > 1250 && generateMultiplePathNavElements}
            {ifCmsPath && width <= 1250 && generateCmsReturnSinglePath()}
        </CurrentURLpathMultipleElement>
    );
};

export default SingleCurrentURLpath;