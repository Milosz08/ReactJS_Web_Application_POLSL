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
import useSlider from '../../../helpers/hooks/useSlider';

import { BannerColorGrade, ImageSliderContainer } from './ImagesSlider.style';

import ImagesSliderMainTitle from './subcomponents/ImagesSliderMainTitle';
import ImagesSliderButtons, { Directions } from './subcomponents/ImagesSliderButtons';
import ImagesSliderComposition from './subcomponents/ImagesSliderComposition';


/**
 * Constant representing the number of photos in the "Public Folder" used by Slider.
 */
export const IMAGES_COUNT: number = 3;

/**
 * Component generating Slider (used only on the home page). Depending on the values transmitted in props,
 * the ability to turn off autoops, or set your own time between slides.
 */
const ImagesSlider: React.FC = (): JSX.Element => {

    const [ axiosX, prevSlide, nextSlide ] = useSlider();

    const handleMoveSlide = (dir: Directions): void => {
        switch(dir) {
            case Directions.BACKWARD:
                prevSlide();
                break;
            case Directions.FORWARD:
                nextSlide();
                break;
            default:
                throw new Error(`Unexpected enum type! Type ${dir} in enum not exist!`);
        }
    };

    return (
        <ImageSliderContainer>
            <ImagesSliderMainTitle
                actualState = {axiosX}
            />
            <ImagesSliderButtons
                moveSlide = {handleMoveSlide}
            />
            <BannerColorGrade/>
            <ImagesSliderComposition
                axiosX = {axiosX}
            />
        </ImageSliderContainer>
    );
};

export default ImagesSlider;