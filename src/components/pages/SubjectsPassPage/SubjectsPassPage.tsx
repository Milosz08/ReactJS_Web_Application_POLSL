/**
 * @file SubjectsPassPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: ---
 */

import React, {Fragment, useEffect} from 'react';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';
import ROUTING_PATH_NAMES from "../../../constants/routingPathNames";

/**
 * @details Component responsible for generating a page with the guidelines of the opinion of individual items.
 */
const SubjectsPassPage = (): JSX.Element => {

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.SUBJECT_PASS_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive={true}/>
      </Fragment>
   );
}

export default SubjectsPassPage;