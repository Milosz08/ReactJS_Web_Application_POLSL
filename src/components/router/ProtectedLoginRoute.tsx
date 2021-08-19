/**
 * @file ProtectedLoginRoute.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactRouterDOM: "^5.2.0"
 *                uuid: "^8.3.1"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';
import { Redirect, Route } from 'react-router';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   auth: boolean;
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
   redirectPath: any;
   component: any;
}

/**
 * @details Locking page routing, if user/administrator has no authentication.
 *
 * @param auth { boolean } - information on user/administrator authentication.
 * @param setAuth { (value: boolean) => boolean } - function setting authentication for user/administrator.
 * @param handleCookie { any } - function which suppourt the Cookies object (add/delete).
 * @param redirectPath { string } - path to move ReactRouter.
 * @param Component - React Component to render (page).
 * @param rest - rest of the parameters passed to inherited components.
 */
const ProtectedLoginRoute: React.FC<PropsProvider | any> = ({
   auth, setAuth, handleCookie, redirectPath, component: Component, ...rest
}): JSX.Element => {

   const renderPathStructure = (props: any) => {
      if(auth) {
         return <Component {...props} setAuth = {setAuth} handleCookie = {handleCookie}/>;
      } else {
         return <Redirect to = {redirectPath}/>;
      }
   }

   return (
      <Route {...rest} render = {(props: any) => renderPathStructure(props)}/>
   );
}

export default ProtectedLoginRoute;