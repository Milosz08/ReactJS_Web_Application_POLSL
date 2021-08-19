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
 * @date final version: 08/19/2021
 */

import React, { Fragment } from 'react';

import ModalsStateProvider from '../../../../contextStore/ModalsStateProvider';

import CookiesNotification from '../../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../../layouts/Header/Header';
import CurrentURLpath from '../../../layouts/CurrentURLpath/CurrentURLpath';
import DeleteModalsStructure from "./Modals/DeleteModalsStructure";
import AddChangeModalsStructure from "./Modals/AddChangeModalsStructure";
import PanelsStructure from "./PanelsStructure";

/**
 * @details Component is responsible for generating the entire structure of the content management system
 *          administrator panel (CMS). It generates modal windows for adding/editing/deleting records and entire
 *          panels with navigation. The component is rendered by a protected React Router.
 */
const AdminCmsMainPanel = (): JSX.Element => {
   return (
      <Fragment>
         <CookiesNotification/>
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