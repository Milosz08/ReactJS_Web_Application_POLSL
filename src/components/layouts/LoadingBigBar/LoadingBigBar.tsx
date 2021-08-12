import React, { useContext, useLayoutEffect, useState } from 'react';
import { MainStoreContext, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';
import classnames from "classnames";

const { bigBarContainer, bigBarLoading, visible } = require('./LoadingBigBar.module.scss');

/**
 *
 */
const LoadingBigBar = () => {

   const { routePath } = useContext<any>(MainStoreContext);
   const [ widthState, setWidthState ] = useState<number>(0);

   useLayoutEffect(() => {
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