import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CONSTANT_DATA from '../../../constants/staticData';

const { navInline, navBlocks, arrowGoto, fasIcon } = require('./Navigation.module.scss');

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
            <NavLink to = {redeptWithPolish}>
               {titleToggle}
               {descriptionToggle}
            </NavLink>
         </li>
      );
   });

   return (
      <section className = {classToggle}>
         { !ifHeader &&
         <h3>
            <FontAwesomeIcon
               icon = {['fas', 'location-arrow']}
               className = {fasIcon}
            />
            Główna Nawigacja
            <aside/>
         </h3>
         }
         <ul>
            {navigationElements}
         </ul>
      </section>
   );
}

export default Navigation;