import React from 'react';

import CookiesNotification from "../layouts/CookiesNotification/CookiesNotification";

import { CookiesProvider } from "react-cookie";
import MainStoreProvider from "../../contextStore/MainStoreContext";
import StartPage from "../pages/StartPage/StartPage";

/**
 *
 */
export default function App() {
   return (
      <MainStoreProvider>
         {/*<CookiesProvider>*/}
            {/*<CookiesNotification/>*/}
            <StartPage/>
         {/*</CookiesProvider>*/}
      </MainStoreProvider>
   );
}