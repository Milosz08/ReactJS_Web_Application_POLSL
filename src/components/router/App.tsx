/**
 * @file App.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactRouterDOM: "^5.2.0"
 *                ReactCookie: "^4.0.3"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import MainStoreProvider from '../../contextStore/MainStoreProvider';
import CookiesObjectsProvider from '../../contextStore/CookiesObjectsProvider';
import LoginSessionProvider from '../../contextStore/LoginSessionProvider';
import GlobalModalsStateProvider from '../../contextStore/GlobalModalsStateProvider';

import GotoTopButton from '../layouts/GotoTopButton/GotoTopButton';
import ScrollToTop from '../../helpers/ScrollToTop';
import Page from './Page';
import DevToolsInfo from '../layouts/DevToolsInfo/DevToolsInfo';
import Footer from '../layouts/Footer/Footer';
import CredentialSequencers from '../layouts/CredentialsSequencers/CredentialSequencers';
import SessionEndModal from '../layouts/SessionEndModal/SessionEndModal';

import './../../constants/fontAwesomeInject';

/**
 * @details Main component responsible for rendering the entire application in a root element.
 */
const App = (): JSX.Element => {
   return (
      <MainStoreProvider>
         <CookiesProvider>
            <CookiesObjectsProvider>
               <Router>
                  <ScrollToTop/>
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