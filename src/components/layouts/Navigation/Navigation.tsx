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

import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import CONSTANT_DATA from '../../../constants/staticData';

const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));

const { navInline, navBlocks, arrowGoto } = require('./Navigation.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    ifHeader: boolean;
}

/**
 * @details Component generating a list of links, depending on the parameter in props, a list is generated without
 *          icons and other embellishments (if ifHeader === true). If ifHeader === false, it generates fancy links.
 *
 * @param ifHeader { boolean } - decides whether the navigation is to be generated for the header or for the content
 *                               on the main page (under the counter).
 */
const Navigation: React.FC<PropsProvider> = ({ ifHeader }): JSX.Element => {

    const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const { SITES } = CONSTANT_DATA;
    const classToggle = ifHeader ? navInline : navBlocks;

    const navigationElements = SITES.map(site => {
        const redeptWithPolish: string = site.title.replace(/\s+/g, '-').toLowerCase();
        const descriptionToggle: boolean | JSX.Element = !ifHeader && <span>{site.description}</span>;

        const titleToggle: string | JSX.Element = ifHeader ? `${site.title}` : (
            <span>
            {site.title}
                <span className = {arrowGoto}/>
         </span>
        );

        return (
            <li key = {site.title}>
                <DelayLink
                    to = {`/${redeptWithPolish}`}
                    delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                    replace = {false}
                    clickAction = {() => timeoutRoutePath!(`/${redeptWithPolish}`)}
                >
                    <a href = {`/${redeptWithPolish}`}>
                        {titleToggle}
                        {descriptionToggle}
                    </a>
                </DelayLink>
            </li>
        );
    });

    return (
        <section className = {classToggle}>
            {!ifHeader &&
            <UniversalHeader
                iconP = {[ 'fas', 'location-arrow' ]}
                content = 'Główna Nawigacja'
                ifCloseButtonVisible = {false}
            />
            }
            <ul>
                {navigationElements}
            </ul>
        </section>
    );
}

export default Navigation;