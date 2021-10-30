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
import { FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';

import { MainHeaderContentContainer, MainLogoContainer, MainLogoImage, MainHeaderNavigationRouterLinks } from '../Header.styles';

import MainHeaderRightNavigation from './MainHeaderRightNavigation';

const Hamburger = React.lazy(() => import('../../Hamburger/Hamburger'));

interface PropsProvider {
    width: number;
    offset: number;
    elmHeight: number;
    ifHeaderHasRedBar: boolean;
}

/**
 * Component responsible for generate header top content.
 *
 * @param width { number } - width of site.
 * @param offset { number } - scroll from top.
 * @param elmHeight { number } - height of header.
 * @param ifHeaderHasRedBar { boolean } - flag, which decided, what content was show.
 */
const MainHeaderContent: React.FC<PropsProvider> = ({ width, offset, elmHeight, ifHeaderHasRedBar }): JSX.Element => {

    const renderendDelay = (
        <MainLogoImage
            src = {`${process.env.PUBLIC_URL}/images/logosBaner.png`}
            alt = 'banerLogo'
        />
    );

    const renderedNavigation = ifHeaderHasRedBar && (
        <MainHeaderNavigationRouterLinks>
            <MainHeaderRightNavigation/>
        </MainHeaderNavigationRouterLinks>
    );

    return (
        <MainHeaderContentContainer
            heightProperty = {width > 1250 ? offset > elmHeight ? 80 : (120 - offset) : 90}
        >
            <MainLogoContainer
                ifHeaderHasRedBar = {ifHeaderHasRedBar}
            >
                <DelayRouterLink
                    render = {() => renderendDelay}
                    pathTo = {FRONT_ENDPOINTS.ABSOLUTE}
                />
                {renderedNavigation}
                <Hamburger/>
            </MainLogoContainer>
        </MainHeaderContentContainer>
    );
};

export default MainHeaderContent;