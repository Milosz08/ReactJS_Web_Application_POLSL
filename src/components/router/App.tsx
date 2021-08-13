import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import MainStoreProvider from '../../contextStore/MainStoreContext';
import CookiesObjectsProvider from '../../contextStore/CookiesObjectsProvider';
import LoginSessionProvider from '../../contextStore/LoginSessionProvider';
import GlobalModalsStateProvider from '../../contextStore/GlobalModalsStateProvider';

import GotoTopButton from '../layouts/GotoTopButton/GotoTopButton';
import Page from './Page';
import DevToolsInfo from '../layouts/DevToolsInfo/DevToolsInfo';
import Footer from '../layouts/Footer/Footer';

import SessionActivityCount from '../additionalComponents/SessionActivityCount';
import CredentialSequencers from '../additionalComponents/CredentialSequencers';
import SessionEndModal from '../layouts/SessionEndModal/SessionEndModal';

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
                  <GlobalModalsStateProvider>
                     <GotoTopButton/>
                     <LoginSessionProvider>
                        <SessionEndModal/>
                        <CredentialSequencers/>
                        <Page/>
                     </LoginSessionProvider>
                     <DevToolsInfo/>
                     <Footer/>
                  </GlobalModalsStateProvider>
               </Router>
            </CookiesObjectsProvider>
         </CookiesProvider>
      </MainStoreProvider>
   );
}

export default App;