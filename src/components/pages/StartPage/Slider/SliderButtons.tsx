/**
 * @file SliderButtons.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
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