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

import React, { useContext, useEffect, useState } from 'react';
import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import classnames from 'classnames';

const { bigBarContainer, bigBarLoading, visible } = require('./LoadingBigBar.module.scss');

/**
 * @details Component that generates a load bar with each routing on the site. The bar fills up synchronously at
 *          the time interval declared in the constant ROUTER_INTERVAL_TIME.
 */
const LoadingBigBar = (): JSX.Element => {

    const { routePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const [ widthState, setWidthState ] = useState<number>(0);

    useEffect(() => {
        const asyncCounting = () => {
            if (routePath) {
                let count: number = 0;
                let index: NodeJS.Timeout;
                const asyncLoadingBar = () => {
                    count++;
                    setWidthState(count);
                    if (count === 100) {
                        clearInterval(index);
                    }
                }
                index = setInterval(asyncLoadingBar, ROUTER_INTERVAL_TIME * 10);
            }
        }
        asyncCounting();
        setWidthState(0);
    }, [ routePath ]);

    const toggleVisible = routePath ? classnames(bigBarContainer, visible) : bigBarContainer;
    const activeBarVisible = routePath ? classnames(bigBarLoading, visible) : bigBarLoading;

    return (
        <div className = {toggleVisible}>
         <span
             className = {activeBarVisible}
             style = {{ width: `${widthState}%` }}
         />
        </div>
    );
}

export default LoadingBigBar;