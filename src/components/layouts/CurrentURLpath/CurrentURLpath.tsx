import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';

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
                <NavLink to = {prevPathName}>
                  {capitaliseWordsArray.join(' ')}
                </NavLink>
            </span>
         );
      });
   }

   return (
      <div className = {`${currentURLcontainer} ${ifImportatHeaderActive ? ifHeaderHasRedBar : ''}`}>
         <div className = {currentURLwrapper}>
            <span>
               <NavLink to = '/'>
                  Strona startowa
               </NavLink>
            </span>
            <span>{convertCurrentPathnameToString()}</span>
         </div>
      </div>
   );
}

export default CurrentURLpath;