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

import { MainTitleContainer, MainTitleHeaderFirst, MainTitleHeaderSecond, MainTitleWrapper } from '../ImagesSlider.style';

const ImagesSliderDots = React.lazy(() => import('./ImagesSliderDots'));

interface PropsProvider {
    actualState: number;
}

/**
 * Component responsible for generating the main header of the entire landing page
 * (university, major, academic year).
 *
 * @param actualState { number } - actual state (currently displayed image).
 */
const ImagesSliderMainTitle: React.FC<PropsProvider> = ({ actualState }): JSX.Element => (
    <MainTitleContainer>
        <MainTitleWrapper>
            <MainTitleHeaderFirst>informatyka</MainTitleHeaderFirst>
            <MainTitleHeaderSecond>Wydział Elektryczy, Politechnika Śląska.</MainTitleHeaderSecond>
            <MainTitleHeaderSecond>Rocznik 2020/2021.</MainTitleHeaderSecond>
        </MainTitleWrapper>
        <ImagesSliderDots
            actualState = {actualState}
        />
    </MainTitleContainer>
);

export default ImagesSliderMainTitle;