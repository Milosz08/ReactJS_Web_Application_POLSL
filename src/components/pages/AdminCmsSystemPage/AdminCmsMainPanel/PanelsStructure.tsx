/**
 * @file PanelsStructure.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useState } from 'react';

import UniversalHeader from '../../../layouts/UniversalHeader/UniversalHeader';
import AdminCmsLeftNavigation from './AdminCmsLeftNavigation';

import HomePanel from './Panels/HomePanel';
import Covid19Panel from './Panels/Covid19Panel';
import FormDataAndValidateProvider from '../../../../contextStore/FormDataAndValidateProvider';
import SubjectsPanel from './Panels/SubjectsPanel';
import SchedulePanel from './Panels/SchedulePanel';
import CalendarPanel from './Panels/CalendarPanel';
import UserMessagesPanel from './Panels/UserMessagePanel';

const { adminLoginContainer, adminLoginWrapper } = require('../AdminCmsLogin/AdminCmsLogin.module.scss');
const { cmsSystemContainer, cmsContent } = require('./AdminCmsMainPanel.module.scss');

/**
 * @details Component is responsible for generating the structure of the content management system panel (CMS).
 *          The structure includes the header, all panels and tab navigation. The component has a hook that determines
 *          which panel is to be opened at the moment.
 */
const PanelsStructure = (): JSX.Element => {

   const [ activeNavElm, setActiveNavElm ] = useState<number>(0);

   return (
      <div className = {adminLoginContainer}>
         <div className = {adminLoginWrapper}>
            <UniversalHeader
               iconP = {['fas', 'industry']}
               content = 'Panel Systemu Zarządzania Treścią'
               ifCloseButtonVisible = {false}
            />
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
   );
}

export default PanelsStructure;