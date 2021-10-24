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

import generateID from '../../../../helpers/functionsAndClasses/generateID';
import { IMAGES_COUNT } from '../ImagesSlider';

import { BannerDotsContainer, BannerSingleDotElement } from '../ImagesSlider.style';

interface PropsProvider {
    actualState: number;
}

/**
 * Component generating dots on a slider pointing to the current position of the slider. Depending on the parameters
 * in props, the corresponding number of dots is generated and the dot status is activated.
 *
 * @param actualState { number } - actual state (currently displayed image).
 */
const ImagesSliderDots: React.FC<PropsProvider> = ({ actualState }): JSX.Element => {

    const generateDots = Array.from({ length: IMAGES_COUNT }).map((_: unknown, idx: number) => (
        <BannerSingleDotElement
            key = {generateID()}
            ifActive = {(IMAGES_COUNT - 1) - idx === actualState / 100 + 1}
        />
    ));

    return (
        <BannerDotsContainer>
            {generateDots}
        </BannerDotsContainer>
    );
};

export default ImagesSliderDots;