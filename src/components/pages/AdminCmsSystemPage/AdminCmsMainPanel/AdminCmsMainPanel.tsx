import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import COOKIES_OBJECT from '../../../../constants/allCookies';

import CookiesNotification from '../../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../../layouts/Header/Header';
import CurrentURLpath from '../../../layouts/CurrentURLpath/CurrentURLpath';

import ModalsStateProvider from '../../../../contextStore/ModalsStateProvider';
import FormDataAndValidateProvider from '../../../../contextStore/FormDataAndValidateProvider';
import FormCalendarModalProvider from '../../../../contextStore/FormCalendarModalProvider';
import FormScheduleModalProvider from "../../../../contextStore/FormScheduleModalProvider";

import UserMessageDeleteModal from './Modals/WarningDeleteModal/UserMessageDeleteModal';
import CalendarDeleteModal from './Modals/WarningDeleteModal/CalendarDeleteModal';
import SubjectDeleteModal from './Modals/WarningDeleteModal/SubjectDeleteModal';
import ViewUserMessageModal from './Modals/ViewUserMessagesModal/ViewUserMessageModal';
import ScheduleDeleteModal from "./Modals/WarningDeleteModal/ScheduleDeleteModal";
import AddChangeSubjectModal from './Modals/AddChangeSubjectModal/AddChangeSubjectModal';
import AddChangeCalendarModal from './Modals/AddChangeCalendarModal/AddChangeCalendarModal';
import AddChangeScheduleModal from "./Modals/AddChangeScheduleModal/AddChangeScheduleModal";
import AdminCmsLeftNavigation from './AdminCmsLeftNavigation';

import HomePanel from './Panels/HomePanel';
import Covid19Panel from './Panels/Covid19Panel';
import SubjectsPanel from './Panels/SubjectsPanel';
import SchedulePanel from './Panels/SchedulePanel';
import CalendarPanel from './Panels/CalendarPanel';
import UserMessagesPanel from './Panels/UserMessagePanel';

const { adminLoginContainer, adminLoginWrapper } = require('./../AdminCmsLogin/AdminCmsLogin.module.scss');
const { universalHeader, fasIcon } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { cmsSystemContainer, cmsContent, logoutButton } = require('./AdminCmsMainPanel.module.scss');

interface PropsProvider {
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
}

/**
 * Komponent generujący panele administratora systemu CMS.
 *
 * @param setAuth { (value: boolean) => boolean } - funkcja ustawiająca autentykację.
 * @param handleCookie { any } - funkcja usuwająca/dodająca obiekt Cookie.
 */
const AdminCmsMainPanel: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

   const [ activeNavElm, setActiveNavElm ] = useState<number>(0);

   const handleLogout = () => {
      setAuth(false);
      handleCookie(COOKIES_OBJECT.adminSession, { path: '/', sameSite: 'strict' });
      handleCookie(COOKIES_OBJECT.credentialsLevel, { path: '/', sameSite: 'strict' });
   }

   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {false}/>
         <CurrentURLpath ifImportatHeaderActive = {false}/>
         <ModalsStateProvider>
            <SubjectDeleteModal/>
            <CalendarDeleteModal/>
            <UserMessageDeleteModal/>
            <ScheduleDeleteModal/>
            <ViewUserMessageModal/>
            <FormDataAndValidateProvider>
               <AddChangeSubjectModal/>
            </FormDataAndValidateProvider>
            <FormCalendarModalProvider>
               <AddChangeCalendarModal/>
            </FormCalendarModalProvider>
            <FormScheduleModalProvider>
               <AddChangeScheduleModal/>
            </FormScheduleModalProvider>
            <div className = {adminLoginContainer}>
               <div className = {adminLoginWrapper}>
                  <section className = {universalHeader}>
                     <h3>
                        <FontAwesomeIcon
                           icon = {['fas', 'industry']}
                           className = {fasIcon}
                        />
                        Panel Systemu Zarządzania Treścią
                        <aside/>
                        <button
                           onClick = {handleLogout}
                           className = {logoutButton}
                        >Wyloguj</button>
                     </h3>
                  </section>

                  <div className = {cmsSystemContainer}>
                     <AdminCmsLeftNavigation
                        activeNavElm = {activeNavElm}
                        setActiveNavElm = {setActiveNavElm}
                     />
                     <div className = {cmsContent}>
                        <HomePanel activeNavElm = {activeNavElm}/>
                        <Covid19Panel activeNavElm = {activeNavElm}/>
                        <FormDataAndValidateProvider>
                           <SubjectsPanel activeNavElm = {activeNavElm}/>
                        </FormDataAndValidateProvider>
                        <SchedulePanel activeNavElm = {activeNavElm}/>
                        <CalendarPanel activeNavElm = {activeNavElm}/>
                        <UserMessagesPanel activeNavElm = {activeNavElm}/>
                     </div>
                  </div>
               </div>
            </div>
         </ModalsStateProvider>
      </Fragment>
   );
}

export default AdminCmsMainPanel;