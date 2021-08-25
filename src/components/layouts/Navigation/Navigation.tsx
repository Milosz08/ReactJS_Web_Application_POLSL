/**
 * @file Navigation.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/18/2021
 */

import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import CONSTANT_DATA from '../../../constants/staticData';

const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));

const { navInline, navBlocks, arrowGoto } = require('./Navigation.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   ifHeader: boolean;
}

/**
 * @details Component generating a list of links, depending on the parameter in props, a list is generated without
 *          icons and other embellishments (if ifHeader === true). If ifHeader === false, it generates fancy links.
 *
 * @param ifHeader { boolean } - decides whether the navigation is to be generated for the header or for the content
 *                               on the main page (under the counter).
 */
const Navigation: React.FC<PropsProvider > = ({ ifHeader }): JSX.Element => {

   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const { SITES } = CONSTANT_DATA;
   const classToggle = ifHeader ? navInline : navBlocks;

   const navigationElements = SITES.map(site => {
      const redeptWithPolish: string = site.title.replace(/\s+/g, '-').toLowerCase();
      const descriptionToggle: boolean | JSX.Element = !ifHeader && <span>{site.description}</span>;

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