/**
 * @file CookiesObjectProvider.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component with Context Store (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';
import COOKIES_OBJECT from '../constants/allCookies';

/**
 * Interface defining the type of Cookies hook values and functions.
 */
export interface CookiesObjectsTypes {
   cookie: { [p: string]: any };
   setCookie: (name: string, value: any, options?: (any | undefined)) => void;
   removeCookie: (name: string, options?: (any | undefined)) => void
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const CookiesObjectsContext = createContext<Partial<CookiesObjectsTypes>>({ });

/**
 * @details Provider that stores all cookie names used in React. The props passes: the global cookie object and two
 *          methods: setCookie () to create a new Cookie object and the corresponding removeCookie () to remove the
 *          selected cookie object.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const CookiesObjectsProvider: React.FC<PropsProvider> = ({ children } : PropsProvider): JSX.Element => {

   const {
      cookiesPopup, adminSession, credentialsLevel, userSession, groupSelection, engGroupSelection
   } = COOKIES_OBJECT;

   const [ cookie, setCookie, removeCookie ] = useCookies([
      cookiesPopup, adminSession, credentialsLevel, userSession, groupSelection, engGroupSelection
   ]);

   return (
      <CookiesObjectsContext.Provider
         value = {{
            cookie, setCookie, removeCookie
         }}>
         {children}
      </CookiesObjectsContext.Provider>
   );
}

export default CookiesObjectsProvider;