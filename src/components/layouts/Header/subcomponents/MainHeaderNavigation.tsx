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

import CONSTANT_DATA from '../../../../constants/staticData';

import { MainHeaderNavigationContainer, MainHeaderNavigationLinks, MainHeaderNavigationSingleLink } from '../Header.styles';

interface PropsProvider {
    grabber: React.RefObject<HTMLDivElement>;
}

/**
 *
 * @param grabber
 */
const MainHeaderNavigation: React.FC<PropsProvider> = ({ grabber }): JSX.Element => {

    const { TOP_NAVBAR_ELMS } = CONSTANT_DATA;

    const topNavbarElm: JSX.Element[] = TOP_NAVBAR_ELMS.map(singleLink => (
        <MainHeaderNavigationSingleLink
            key = {singleLink.title}
            href = {singleLink.link}
            target = '_blank'
            rel = 'noreferrer'
        >
            {singleLink.title}
        </MainHeaderNavigationSingleLink>
    ));

    return (
        <MainHeaderNavigationContainer
            ref = {grabber}
        >
            <MainHeaderNavigationLinks>
                {topNavbarElm}
            </MainHeaderNavigationLinks>
        </MainHeaderNavigationContainer>
    );
};

export default MainHeaderNavigation;