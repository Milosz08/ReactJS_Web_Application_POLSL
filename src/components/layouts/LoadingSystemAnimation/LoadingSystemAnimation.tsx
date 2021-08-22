/**
 * @file LoadingSystemAnimation.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version project: "^0.1.0"
 *          ReactJS: "^17.0.2"
 *          ReactCSSmodules: "^4.7.11"
 *          classnames: "^2.3.1"
 *
 * @date final version: 08/18/2021
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