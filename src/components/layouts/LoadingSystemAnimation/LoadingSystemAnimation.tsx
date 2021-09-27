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

import React from 'react';
import classnames from 'classnames';

/**
 * Interface defining the type of state values.
 */
interface PropsProvider {
    hideAuth: boolean;
}

const { adminAsyncWrapper, showAsync, infiniteLoad, infiniteUse } = require('./LoadingSystemAnimation.module.scss');

/**
 * @details Component rendering animation while waiting for data download from API / logging into the system, etc.
 *
 * @param ifOpen { boolean } - props deciding whether to show the loading animation.
 */
const LoadingSystemAnimation: React.FC<PropsProvider> = ({ hideAuth }): JSX.Element => {

    const showAsyncElement = hideAuth ? classnames(adminAsyncWrapper, showAsync) : adminAsyncWrapper;

    return (
        <div className = {showAsyncElement}>
            <svg className = {infiniteLoad} viewBox = '-2000 -1000 4000 2000'>
                <path
                    id = 'inf'
                    d = 'M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z'
                />
                <use
                    className = {infiniteUse}
                    xlinkHref = '#inf'
                    strokeDasharray = '1570 5143'
                    strokeDashoffset = '6713px'
                />
            </svg>
            Logowanie do systemu...
        </div>
    );
}

export default LoadingSystemAnimation;