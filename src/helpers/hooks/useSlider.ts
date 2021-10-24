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
import { useEffect, useRef, useState } from 'react';

import { IMAGES_COUNT } from '../../components/layouts/ImagesSlider/ImagesSlider';

/**
 * Custom hook responsible for implementing infinite animation of the main banner.
 * It also provides features to manually manipulate the position of images.
 *
 * @param autoPlay { boolean } - automatic scrolling.
 * @param duration { number } - length of one slide (in seconds).
 */
const useSlider = (autoPlay = true, duration = 5): [ number, () => void, () => void ] => {

    const [ axiosX, setAxiosX ] = useState<number>(100);
    const autoPlayRef: React.MutableRefObject<any> = useRef<HTMLElement>(null);

    useEffect(() => {
        autoPlayRef.current = nextSlide;
    });

    useEffect(() => {
        const play = () => autoPlayRef.current();
        if (autoPlay) {
            const interval = setInterval(play, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [ autoPlay, duration ]);

    const nextSlide = (): void => {
        if (axiosX === -100 * (IMAGES_COUNT - 2)) {
            setAxiosX(100);
        } else {
            setAxiosX(axiosX - 100);
        }
    }

    const prevSlide = (): void => {
        if (axiosX === 100) {
            setAxiosX(-100 * (IMAGES_COUNT - 2));
        } else {
            setAxiosX(axiosX + 100);
        }
    }

    return [ axiosX, prevSlide, nextSlide ];
};

export default useSlider;