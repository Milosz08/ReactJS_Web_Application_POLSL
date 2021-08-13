import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';

import { MainStoreContext, ROUTER_INTERVAL_TIME } from "../../../contextStore/MainStoreContext";
import CONSTANT_DATA from '../../../constants/staticData';
import UniversalHeader from "../UniversalHeader/UniversalHeader";

const { navInline, navBlocks, arrowGoto } = require('./Navigation.module.scss');

interface PropsProvider {
   ifHeader: boolean;
}

/**
 * Komponent generujący listę linków, w zależności od parametru w propsach, generowana jest lista bez ikon i
 * innych ozdobników (jeśli ifHeader === true). Jeśli ifHeader === false, generuje linki z ozdobnikami.
 *
 * @param ifHeader { boolean } - decyduje, czy nawigacja ma być generowana dla nagłówka, czy dla kontentu na
 *                               głównej stronie (pod licznikiem).
 */
const Navigation: React.FC<PropsProvider > = ({ ifHeader }) => {

   const { timeoutRoutePath } = useContext<any>(MainStoreContext);

   const { SITES } = CONSTANT_DATA;
   const classToggle = ifHeader ? navInline : navBlocks;

   const navigationElements = SITES.map(site => {
      const redeptWithPolish: string = site.title.replace(/\s+/g, '-').toLowerCase();
      const descriptionToggle = !ifHeader && <span>{site.description}</span>;

      const titleToggle: string | JSX.Element = ifHeader ? `${site.title}` : (
         <span>
            {site.title}
            <span className = {arrowGoto}/>
         </span>
      );

      return (
         <li key = {site.title}>
            <DelayLink
               to = {`/${redeptWithPolish}`}
               delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
               replace = {false}
               clickAction = {timeoutRoutePath}
            >
               <a href = {`/${redeptWithPolish}`}>
                  {titleToggle}
                  {descriptionToggle}
               </a>
            </DelayLink>
         </li>
      );
   });

   return (
      <section className = {classToggle}>
         { !ifHeader &&
         <UniversalHeader
            iconP = {['fas', 'location-arrow']}
            content = 'Główna Nawigacja'
            ifCloseButtonVisible = {false}
         />
         }
         <ul>
            {navigationElements}
         </ul>
      </section>
   );
}

export default Navigation;