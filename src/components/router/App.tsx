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