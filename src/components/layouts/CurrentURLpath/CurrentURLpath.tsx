/**
 * @file CurrentURLpath.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactFontawesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *                uuid: "^8.3.1"
 *
 * @date final version: 08/18/2021
 */

import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';

const {
   currentURLwrapper, currentURLcontainer, sigleCellRecord, arrowIcon, ifHeaderHasRedBar
} = require('./CurrentURLpath.module.scss');

/**
 * Interface defining the type of props.
 */
interface PropsProvider {
   ifImportatHeaderActive: boolean;
}

/**
 * @details Component that generates navigation of pages / subpages. Depending on the address path, it generates an
 *          appropriate sequence of hyperlinks to subsequent subpages.
 *
 * @params ifImportatHeaderActive { boolean } - decides whether the navigation should be lower than the top of the page.
 */
const CurrentURLpath: React.FC<PropsProvider> = ({ ifImportatHeaderActive }): JSX.Element => {

   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const convertCurrentPathnameToString = (): JSX.Element[] => {
      const allPathString: string = decodeURI(window.location.pathname).toString().slice(1);
      const lengthOfArray: number = allPathString.split('/').length;
      const arraysOfAllPathnames: string[] = allPathString.split('/', lengthOfArray);
      let prevPathName: string = '';

      return arraysOfAllPathnames.map((pathname: string) => {
         const replaceMinus: string = pathname.replaceAll('-', ' ');
         const countOfSigleWords: number = replaceMinus.split(' ').length + 1;
         const sigleWordsArray: string[] = replaceMinus.split(' ', countOfSigleWords);
         prevPathName += `/${pathname}`;

         const capitaliseWordsArray = sigleWordsArray.map((word: string) => {
            const lower: string = word.toLocaleLowerCase();
            return word.charAt(0).toUpperCase() + lower.slice(1);
         });

         return (
            <span key = {uuidv4()} className = {sigleCellRecord}>
                <FontAwesomeIcon
                   icon = {['fas', 'chevron-right']}
                   className = {arrowIcon}
                />
               <DelayLink
                  to = {prevPathName}
                  delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                  replace = {false}
                  clickAction = {() => timeoutRoutePath!(prevPathName)}
               >
                  <a href = {prevPathName}>
                     {capitaliseWordsArray.join(' ')}
                  </a>
               </DelayLink>
            </span>
         );
      });
   }

   const toggleMargin = ifImportatHeaderActive ? classnames(currentURLcontainer, ifHeaderHasRedBar) : currentURLcontainer;

   return (
      <div className = {toggleMargin}>
         <div className = {currentURLwrapper}>
            <span>
               <DelayLink
                  to = '/'
                  delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                  replace = {false}
                  clickAction = {() => timeoutRoutePath!('/')}
               >
                  <a href = '/'>
                     Strona Główna
                  </a>
               </DelayLink>
            </span>
            <span>
               {convertCurrentPathnameToString()}
            </span>
         </div>
      </div>
   );
}

export default CurrentURLpath;