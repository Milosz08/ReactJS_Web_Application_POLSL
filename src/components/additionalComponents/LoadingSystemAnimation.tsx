import React from 'react';
import classnames from "classnames";

interface PropsProvider {
   hideAuth: boolean;
}

const { adminAsyncWrapper, showAsync, infiniteLoad, infiniteUse } = require('./LoadingSystemAnimation.module.scss');

/**
 * Komponent renderujący animację podczas oczekiwania na pobieranie danych z API/logowanie do systemu itp.
 *
 * @param ifOpen { boolean } - props decydujący, czy animacja ładowania ma być pokazywana.
 */
const LoadingSystemAnimation: React.FC<PropsProvider> = ({ hideAuth }) => {

   const showAsyncElement = hideAuth ? classnames(adminAsyncWrapper, showAsync) : adminAsyncWrapper;

   return (
      <div className = {showAsyncElement}>
         <svg className = {infiniteLoad} viewBox = '-2000 -1000 4000 2000'>
            <path id = 'inf' d = 'M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z'/>
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