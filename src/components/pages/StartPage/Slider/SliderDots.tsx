/**
 * @file SliderDots.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                uuid: "^8.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
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