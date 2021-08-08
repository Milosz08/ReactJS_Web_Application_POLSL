import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import CookiesNotification from '../layouts/CookiesNotification/CookiesNotification';
import MainStoreProvider from '../../contextStore/MainStoreContext';
import StartPage from '../pages/StartPage/StartPage';
import CookiesObjectsProvider from '../../contextStore/CookiesObjectsProvider';
import Slider from '../pages/StartPage/Slider/Slider';
import Subjects from '../layouts/Subjects/Subjects';
import CountDown from '../pages/StartPage/CountDown/CountDown';
import CovidInfo from '../pages/StartPage/CovidInfo/CovidInfo';
import ActualDateProvider from '../../contextStore/ActualDateProvider';
import GotoTopButton from '../layouts/GotoTopButton/GotoTopButton';
import LoginSessionProvider from '../../contextStore/LoginSessionProvider';
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