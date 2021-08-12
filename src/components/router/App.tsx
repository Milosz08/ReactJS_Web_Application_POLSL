import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import MainStoreProvider from '../../contextStore/MainStoreContext';
import CookiesObjectsProvider from '../../contextStore/CookiesObjectsProvider';
import LoginSessionProvider from '../../contextStore/LoginSessionProvider';

import GotoTopButton from '../layouts/GotoTopButton/GotoTopButton';
import Page from './Page';
import DevToolsInfo from '../layouts/DevToolsInfo/DevToolsInfo';
import Footer from '../layouts/Footer/Footer';

import './../../constants/fontAwesomeInject';

/**
 * Główny komponent, generuje całą strukturę aplikacji.
 */
const App = () => {
   return (
      <MainStoreProvider>
         <CookiesProvider>
            <CookiesObjectsProvider>
               <Router>
                  <GotoTopButton/>
                  <LoginSessionProvider>
                     <Page/>
                  </LoginSessionProvider>
                  <DevToolsInfo/>
                  <Footer/>
               </Router>
            </CookiesObjectsProvider>
         </CookiesProvider>
      </MainStoreProvider>
   );
}

export default App;