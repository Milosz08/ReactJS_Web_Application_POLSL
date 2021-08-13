import React, {useContext} from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

import { MainStoreContext, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';

const {
   currentURLwrapper, currentURLcontainer, sigleCellRecord, arrowIcon, ifHeaderHasRedBar
} = require('./CurrentURLpath.module.scss');

interface PropsProvider {
   ifImportatHeaderActive: boolean;
}

/**
 * Komponent generujący nawigację stron/podstron. W zależności od ścieżki adresu, generuje odpowiednią
 * sekwencję hiperłączy na kolejne podstrony.
 *
 * @param ifImportatHeaderActive { boolean } - decyduje, czy nawigacja ma być niżej wzgędem szczytu strony
 */
const CurrentURLpath: React.FC<PropsProvider> = ({ ifImportatHeaderActive }) => {

   const { timeoutRoutePath } = useContext<any>(MainStoreContext);

   const convertCurrentPathnameToString = (): JSX.Element[] => {
      const allPathString: string = decodeURI(window.location.pathname).toString().slice(1);
      const lengthOfArray: number = allPathString.split('/').length;
      const arraysOfAllPathnames: Array<string> = allPathString.split('/', lengthOfArray);
      let prevPathName: string = '';

      return arraysOfAllPathnames.map((pathname: string) => {
         const replaceMinus: string = pathname.replaceAll('-', ' ');
         const countOfSigleWords: number = replaceMinus.split(' ').length + 1;
         const sigleWordsArray: Array<string> = replaceMinus.split(' ', countOfSigleWords);
         prevPathName += `/${pathname}`;

         const capitaliseWordsArray = sigleWordsArray.map((word: string) => {
            const lower: string = word.toLocaleLowerCase();
            return word.charAt(0).toUpperCase() + lower.slice(1);
         });

         return (
            <span
               key = {uuidv4()}
               className = {sigleCellRecord}
            >
                <FontAwesomeIcon
                   icon = {['fas', 'chevron-right']}
                   className = {arrowIcon}
                />
               <DelayLink
                  to = {prevPathName}
                  delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                  replace = {false}
                  clickAction = {timeoutRoutePath}
               >
                  {capitaliseWordsArray.join(' ')}
               </DelayLink>
            </span>
         );
      });
   }

   return (
      <div className = {`${currentURLcontainer} ${ifImportatHeaderActive ? ifHeaderHasRedBar : ''}`}>
         <div className = {currentURLwrapper}>
            <span>
               <DelayLink
                  to = '/'
                  delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                  replace = {false}
                  clickAction = {timeoutRoutePath}
               >
                  Strona Główna
               </DelayLink>
            </span>
            <span>{convertCurrentPathnameToString()}</span>
         </div>
      </div>
   );
}

export default CurrentURLpath;