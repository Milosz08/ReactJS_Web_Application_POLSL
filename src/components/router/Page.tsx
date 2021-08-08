import React, { Fragment, useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { LoginSessionContext } from '../../contextStore/LoginSessionProvider';
import { CookiesObjectsContext } from '../../contextStore/CookiesObjectsProvider';

import CONSTANT_DATA from '../../constants/staticData';

import StartPage from '../pages/StartPage/StartPage';
import AdminCmsLogin from '../pages/AdminCmsSystemPage/AdminCmsLogin/AdminCmsLogin';
import AdminCmsMainPanel from '../pages/AdminCmsSystemPage/AdminCmsMainPanel/AdminCmsMainPanel';
import CookiesPolicy from '../pages/CookiesPolicyPage/CookiesPolicyPage';
import SchedulePage from '../pages/SchedulePage/SchedulePage';
import CalendarPage from '../pages/CalendarPage/CalendarPage';
import SubjectsPassPage from '../pages/SubjectsPassPage/SubjectsPassPage';
import AidsPage from '../pages/AidsPage/AidsPage';
import AidsLogin from '../pages/AidsPage/AidsLogin';
import ScrollToTop from '../additionalComponents/ScrollToTop';

import ProtectedLoginRoute from './ProtectedLoginRoute';

const PAGES_COMPONENTS: Array<any> = [
   SchedulePage, CalendarPage, SubjectsPassPage, AidsPage,
];

/**
 * Komponent generujący routing na stronie (posiada również domyślne przekierowanie ze strony 404 na stronę główną).
 * Obsługuje też autentykację konta użytkownika i administratora oraz korzysta z ich stora.
 */
const Page = () => {

   const { SITES } = CONSTANT_DATA;
   const { adminAuth, setAdminAuth, userAuth, setUserAuth } = useContext<any>(LoginSessionContext);
   const { cookie, setCookie, removeCookie } = useContext<any>(CookiesObjectsContext);

   useEffect(() => {
      cookie.__adminSessionStayed !== undefined ? setAdminAuth(true) : setAdminAuth(false);
      cookie.__userSessionStayed !== undefined ? setUserAuth(true) : setUserAuth(false);
   }, [cookie, setAdminAuth, setUserAuth]);

   // eslint-disable-next-line array-callback-return
   const routeStructure = SITES.map((site: { title: string, description: string }, index: number) => {
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
         <ScrollToTop/>
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
               setAuth = {setAdminAuth}
               handleCookie = {removeCookie}
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