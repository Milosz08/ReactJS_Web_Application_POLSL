/**
 * @file AdminCmsMainPanel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/20/2021
 */

import React, { Fragment, useEffect } from 'react';

import ModalsStateProvider from '../../../../contextStore/ModalsStateProvider';
import ROUTING_PATH_NAMES from '../../../../constants/routingPathNames';

const CookiesNotification = React.lazy(() => import('../../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../../layouts/CurrentURLpath/CurrentURLpath'));
const DeleteModalsStructure = React.lazy(() => import('./Modals/DeleteModalsStructure'));
const AddChangeModalsStructure = React.lazy(() => import('./Modals/AddChangeModalsStructure'));
const PanelsStructure = React.lazy(() => import('./PanelsStructure'));

/**
 * @details Component is responsible for generating the entire structure of the content management system
 *          administrator panel (CMS). It generates modal windows for adding/editing/deleting records and entire
 *          panels with navigation. The component is rendered by a protected React Router.
 */
const AdminCmsMainPanel = (): JSX.Element => {

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.CMS_PANEL_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <MobileDownNav/>
         <Header ifHeaderHasRedBar = {false}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <ModalsStateProvider>
            <DeleteModalsStructure/>
            <AddChangeModalsStructure/>
            <PanelsStructure/>
         </ModalsStateProvider>
      </Fragment>
   );
}

export default AdminCmsMainPanel;