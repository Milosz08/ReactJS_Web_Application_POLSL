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
import { SliderCompositionContainer, SliderSingleImage } from '../ImagesSlider.style';
import { IMAGES_COUNT } from '../ImagesSlider';

interface PropsProvider {
    axiosX: number;
}

/**
 * Component responsible for generating and moving the main image container.
 *
 * @param axiosX { number } - current position of the image.
 */
const ImagesSliderComposition: React.FC<PropsProvider> = ({ axiosX }): JSX.Element => {

    const imageStructure: JSX.Element[] = Array.from({ length: IMAGES_COUNT }, (v, i) => i).map((count: number): JSX.Element => {
        const imageSrc = `${process.env.PUBLIC_URL}/images/bannerImages/img${count + 1}.jpg`;
        return (
            <SliderSingleImage
                key = {`banner__setNumber${count}`}
                src = {imageSrc}
                widthCSS = {100 * IMAGES_COUNT}
                positionCSS = {axiosX}
                alt = {`banner__setNumber${count}`}
            />
        )
    });

    return (
        <SliderCompositionContainer
            widthCSS = {IMAGES_COUNT * 100}
        >
            {imageStructure}
        </SliderCompositionContainer>
    );
};

export default ImagesSliderComposition;