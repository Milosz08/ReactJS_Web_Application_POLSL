/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { Provider } from 'react-redux';
import reduxStore from '../../redux/reduxStore';

import GlobalStyle from '../../styles/global.styles';
import './../../constants/fontAwesomeInject';  // to remove

import LoadingSuspense from '../layouts/LoadingSuspense/LoadingSuspense';

const CookiesObjectsProvider = React.lazy(() => import('../../context/cookiesContext/CookiesObjectsProvider'));
const ScrollToTop = React.lazy(() => import('../../helpers/componentsAndMiddleware/ScrollToTop'));
const GotoTopButton = React.lazy(() => import('../layouts/GotoTopButton/GotoTopButton'));
const SessionEndModal = React.lazy(() => import('../layouts/SessionEndModal/SessionEndModal'));
const SessionSequencer = React.lazy(() => import('../layouts/SessionSequencer/SessionSequencer'));
const NonProtectedRoute = React.lazy(() => import('./NonProtectedRoute'));
const DevToolsInfo = React.lazy(() => import('../layouts/DevToolsInfo/DevToolsInfo'));
const Footer = React.lazy(() => import('../layouts/Footer/Footer'));

/**
 * Main component responsible for rendering the entire application in a root element.
 */
const App: React.FC = (): JSX.Element => (
    <Provider store = {reduxStore}>
        <Suspense fallback = {<LoadingSuspense/>}>
            <GlobalStyle/>
            <CookiesProvider>
                <CookiesObjectsProvider>
                    <Router>
                        <ScrollToTop/>
                        <GotoTopButton/>
                        <SessionEndModal/>
                        <SessionSequencer/>
                        <NonProtectedRoute/>
                        <DevToolsInfo/>
                        <Footer/>
                    </Router>
                </CookiesObjectsProvider>
            </CookiesProvider>
        </Suspense>
    </Provider>
);

export default App;