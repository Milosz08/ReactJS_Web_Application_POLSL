/**
 * @file LoadingBigBar.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/18/2021
 */

import React, { useContext, useEffect, useState } from 'react';
import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';
import classnames from "classnames";

const { bigBarContainer, bigBarLoading, visible } = require('./LoadingBigBar.module.scss');

/**
 * @details Component that generates a load bar with each routing on the site. The bar fills up synchronously at
 *          the time interval declared in the constant ROUTER_INTERVAL_TIME.
 */
const LoadingBigBar = () => {

   const { routePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
   const [ widthState, setWidthState ] = useState<number>(0);

   useEffect(() => {
      const asyncCounting = () => {
         if(routePath) {
            let count: number = 0;
            let index: NodeJS.Timeout;
            const asyncLoadingBar = () => {
               count++;
               setWidthState(count);
               if(count === 100) {
                  clearInterval(index);
               }
            }
            index = setInterval(asyncLoadingBar, ROUTER_INTERVAL_TIME * 10);
         }
      }
      asyncCounting();
      setWidthState(0);
   }, [routePath]);

   const toggleVisible = routePath ? classnames(bigBarContainer, visible) : bigBarContainer;
   const activeBarVisible = routePath ? classnames(bigBarLoading, visible) : bigBarLoading;

   return (
      <div className = {toggleVisible}>
         <span
            className = {activeBarVisible}
            style = {{ width: `${widthState}%` }}
         />
      </div>
   );
}

export default LoadingBigBar;