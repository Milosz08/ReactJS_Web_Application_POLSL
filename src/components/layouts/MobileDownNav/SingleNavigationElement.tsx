/**
 * @file SingleNavigationElement.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/22/2021
 */

import React from 'react';
import DelayLink from 'react-delay-link';
import { ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';

const { oneIconWrapper } = require('./MobileDownNav.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   pathAttr: {
      path: string,
      id: number
   };
   action: (id: number) => void;
   Component: React.ReactElement;
}

/**
 * @details Component responsible for generating a single button (routing) in the bottom menu on mobile devices (phones).
 *
 * @param pathAttr { [value: string]: string | number } - path and name property object.
 * @param action { (id: number) => void } - function is started by pressing the button.
 * @param componentsObj { React.ReactElement } - icon (filled and empty) in the form of a React component.
 */
const SingleNavigationElement: React.FC<PropsProvider> = ({ pathAttr, action, Component }): JSX.Element => {
   return (
      <DelayLink
         to = {pathAttr.path}
         delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
         replace = {false}
         clickAction = {() => action(pathAttr.id)}
      >
         <a className = {oneIconWrapper} href = {pathAttr.path}>
            {Component}
         </a>
      </DelayLink>
   );
}

export default SingleNavigationElement;