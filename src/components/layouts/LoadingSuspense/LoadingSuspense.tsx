/**
 * @file LoadingSuspense.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/25/2021
 */

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

const { loadingSuspenseContainer, infiniteLoad, infiniteUse, active } = require('./LoadingSuspense.module.scss');

/**
 * @details Component responsible for generating the board that is displayed while loading all React components.
 */
const LoadingSuspense = (): JSX.Element => {

   const [ isVisible, setIsVisible ] = useState<boolean>(false);
   const toggleClass = isVisible ? classnames(loadingSuspenseContainer, active) : loadingSuspenseContainer;

   useEffect(() => {
      setIsVisible(true);
      return () => setIsVisible(false);
   }, []);

   return (
      <div className = {toggleClass}>
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
         Ładowanie strony...
      </div>
   );
}

export default LoadingSuspense;