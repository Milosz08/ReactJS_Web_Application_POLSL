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

import MainStoreProvider from '../../contextStore/MainStoreProvider';
import CookiesObjectsProvider from '../../contextStore/CookiesObjectsProvider';
import LoginSessionProvider from '../../contextStore/LoginSessionProvider';
import GlobalModalsStateProvider from '../../contextStore/GlobalModalsStateProvider';

import './../../constants/fontAwesomeInject';
import LoadingSuspense from '../layouts/LoadingSuspense/LoadingSuspense';

const GotoTopButton = React.lazy(() => import('../layouts/GotoTopButton/GotoTopButton'));
const ScrollToTop = React.lazy(() => import('../../helpers/ScrollToTop'));
const Page = React.lazy(() => import('./Page'));
const DevToolsInfo = React.lazy(() => import('../layouts/DevToolsInfo/DevToolsInfo'));
const Footer = React.lazy(() => import('../layouts/Footer/Footer'));
const CredentialSequencers = React.lazy(() => import('../layouts/CredentialsSequencers/CredentialSequencers'));
const SessionEndModal = React.lazy(() => import('../layouts/SessionEndModal/SessionEndModal'));

/**
 * @details Main component responsible for rendering the entire application in a root element.
 */
const App = (): JSX.Element => {
    return (
        <Suspense fallback = {<LoadingSuspense/>}>
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
        </Suspense>
    );
}

export default App;