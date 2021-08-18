import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';

import COOKIES_OBJECT from "../constants/allCookies";

export interface CookiesObjectsTypes {
   cookie: { [p: string]: any };
   setCookie: (name: string, value: any, options?: (any | undefined)) => void;
   removeCookie: (name: string, options?: (any | undefined)) => void
}

export const CookiesObjectsContext = createContext<Partial<CookiesObjectsTypes>>({ });

interface PropsProvider {
  children: React.ReactNode;
}

/**
 * Provider przechowujący wszystkie nazwy obiektów Cookie wykorzystywane w aplikacji React. W propsach przekazywane
 * są: globalny obiekt cookie oraz dwie metody: setCookie(), do stworzenia nowego obiektu Cookie oraz analogiczna
 * removeCookie() do usuwania wskazanego obiektu cookie.
 *
 * @param children { React.ReactNode } - wszystkie węzły wirtualnego drzewa DOM React objęte Providerem
 */
const CookiesObjectsProvider: React.FC<PropsProvider> = ({ children } : PropsProvider) => {

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