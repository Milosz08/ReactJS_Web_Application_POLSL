/**
 * @file Page.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactRouterDOM: "^5.2.0"
 *                uuid: "^8.3.1"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { LoginSessionContext, LoginSessionProviderTypes } from '../../contextStore/LoginSessionProvider';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../contextStore/CookiesObjectsProvider';

import CONSTANT_DATA from '../../constants/staticData';
import ProtectedLoginRoute from './ProtectedLoginRoute';

const StartPage = React.lazy(() => import('../pages/StartPage/StartPage'));
const AdminCmsLogin = React.lazy(() => import('../pages/AdminCmsSystemPage/AdminCmsLogin/AdminCmsLogin'));
const AdminCmsMainPanel = React.lazy(() => import('../pages/AdminCmsSystemPage/AdminCmsMainPanel/AdminCmsMainPanel'));
const CookiesPolicy = React.lazy(() => import('../pages/CookiesPolicyPage/CookiesPolicyPage'));
const SchedulePage = React.lazy(() => import('../pages/SchedulePage/SchedulePage'));
const CalendarPage = React.lazy(() => import('../pages/CalendarPage/CalendarPage'));
const SubjectsPassPage = React.lazy(() => import('../pages/SubjectsPassPage/SubjectsPassPage'));
const AidsPage = React.lazy(() => import('../pages/AidsPage/AidsPage'));
const AidsLogin = React.lazy(() => import('../pages/AidsPage/AidsLogin'));

/**
 * Fixed plaque storing all unprotected components representing single pages in routing.
 */
const PAGES_COMPONENTS: any[] = [ SchedulePage, CalendarPage, SubjectsPassPage, AidsPage ];

/**
 * @details Component generating routing on the page (also has a default forwarding from page 404 to the main page).
 *          It also supports the authentication of the user and administrator account and uses their blind.
 */
const Page = (): JSX.Element => {

   const { SITES } = CONSTANT_DATA;
   const { adminAuth, setAdminAuth, userAuth, setUserAuth } = useContext<Partial<LoginSessionProviderTypes>>(LoginSessionContext);
   const { cookie, setCookie, removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

   useEffect(() => {
      cookie!.__adminSessionStayed !== undefined ? setAdminAuth!(true) : setAdminAuth!(false);
      cookie!.__userSessionStayed !== undefined ? setUserAuth!(true) : setUserAuth!(false);
   }, [cookie, setAdminAuth, setUserAuth]);

   // eslint-disable-next-line array-callback-return
   const routeStructure = SITES.map((site: { [value: string]: string }, index: number) => {
      if(site.title !== 'Pomoce naukowe') {
         const redeptWithPolish = site.title.replace(/\s+/g, '-').toLowerCase();
         return (
            <Route
               path = {`/${redeptWithPolish}`}
               component = {PAGES_COMPONENTS[index]}
               key = {uuidv4()}
            />
         );
      }
   });

   return (
      <Fragment>
         <Switch>
            <Route
               path = '/' exact
               component = {StartPage}
            />
            {routeStructure}
            <ProtectedLoginRoute exact
               path = '/logowanie-do-panelu-administratora'
               component = {AdminCmsLogin}
               redirectPath = '/logowanie-do-panelu-administratora/panel-administratora'
               auth = {!adminAuth}
               setAuth = {setAdminAuth}
               handleCookie = {setCookie}
            />
            <ProtectedLoginRoute exact
               path = '/logowanie-do-panelu-administratora/panel-administratora'
               component = {AdminCmsMainPanel}
               redirectPath = '/logowanie-do-panelu-administratora'
               auth = {adminAuth}
            />
            <ProtectedLoginRoute exact
               path = '/logowanie'
               component = {AidsLogin}
               redirectPath = '/pomoce-naukowe'
               auth = {!userAuth}
               setAuth = {setUserAuth}
               handleCookie = {setCookie}
            />
            <ProtectedLoginRoute exact
               path = '/pomoce-naukowe'
               component = {AidsPage}
               redirectPath = '/logowanie'
               auth = {userAuth}
               setAuth = {setUserAuth}
               handleCookie = {removeCookie}
            />
            <Route
               path = '/polityka-prywatności-cookies'
               component = {CookiesPolicy}
            />
            <Route render = {() => <Redirect to = {{ pathname: '/' }}/>} />
         </Switch>
      </Fragment>
   );
}

export default Page;