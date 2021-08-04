import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';

import COOKIES_OBJECT from "../constants/allCookies";

export const CookiesObjectsContext = createContext<any>(null);

interface CookiesObjectsProviderProps {
  children: React.ReactNode;
}

/**
 * Provider przechowujący wszystkie nazwy obiektów Cookie wykorzystywane w aplikacji React. W propsach przekazywane
 * są: globalny obiekt cookie oraz dwie metody: setCookie(), do stworzenia nowego obiektu Cookie oraz analogiczna
 * removeCookie() do usuwania wskazanego obiektu cookie.
 *
 * @param children - wszystkie węzły wirtualnego drzewa DOM React objęte Providerem
 */
export default function CookiesObjectsProvider({ children } : CookiesObjectsProviderProps) {

   const {
      cookiesPopup, adminSession, credentialsLevel, userSession, groupSelection, engGroupSelection
   } = COOKIES_OBJECT;

   const [ cookie, setCookie, removeCookie ] = useCookies([
      cookiesPopup, adminSession, credentialsLevel, userSession, groupSelection, engGroupSelection
   ]);

   return (
      <CookiesObjectsContext.Provider value = {{ cookie, setCookie, removeCookie }}>
         {children}
      </CookiesObjectsContext.Provider>
   );
}