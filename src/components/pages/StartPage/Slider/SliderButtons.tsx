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

const { arrow, left, right } = require('./Slider.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    moveSlide: () => void;
    direction: string;
}

/**
 * @details Component implements a single arrow (button) for moving slides in a slider. Depending on the parameters given in
 *          props, the arrow is generated to move to the left or right.
 *
 * @param moveSlide { () => void } - function caused on a click, move slide.
 * @param direction { string } - slide direction (for generating arrows).
 */
const SliderButtons: React.FC<PropsProvider> = ({ moveSlide, direction }): JSX.Element => {

    const classToggle: string = direction === 'left' ? left : right;

    return (
        <button
            className = {classnames(arrow, classToggle)}
            onClick = {moveSlide}
        />
    );
}

export default SliderButtons;