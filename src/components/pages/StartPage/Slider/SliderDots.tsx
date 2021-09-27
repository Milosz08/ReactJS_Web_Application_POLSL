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
import { v4 as uuidv4 } from 'uuid';

const { bannerDots, activeDot } = require('./Slider.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    dotsCount: number;
    actualState: number;
}

/**
 * @details Component generating dots on a slider pointing to the current position of the slider. Depending on the parameters
 *          in props, the corresponding number of dots is generated and the dot status is activated.
 *
 * @param dotsCount { number } - number of dots to generate.
 * @param actualState { number } - actual state (currently displayed image).
 */
const SliderDots: React.FC<PropsProvider> = ({ dotsCount, actualState }): JSX.Element => {

    const generateDots = Array.from({ length: dotsCount }).map((nullVal: unknown, index: number) => {
        const activeToggle = ((dotsCount - 1) - index) === actualState / 100 + 1 ? activeDot : null;
        return (
            <div key = {uuidv4()} className = {activeToggle}/>
        );
    });

    return (
        <div className = {bannerDots}>
            {generateDots}
        </div>
    );
}

export default SliderDots;