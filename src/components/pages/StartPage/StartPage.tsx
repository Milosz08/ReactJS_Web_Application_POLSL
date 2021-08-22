/**
 * @file ScheduleSections.tsx
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

import React, { Fragment, useEffect } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import MobileDownNav from '../../layouts/MobileDownNav/MobileDownNav';
import Header from '../../layouts/Header/Header';
import Slider from './Slider/Slider';
import CovidInfo from './CovidInfo/CovidInfo';
import CountDown from './CountDown/CountDown';
import Navigation from '../../layouts/Navigation/Navigation';
import Subjects from '../../layouts/Subjects/Subjects';

/**
 * @details Component responsible for generating the start page (absolute address - "/").
 */
const StartPage = (): JSX.Element => {

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.START_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <MobileDownNav id = {0}/>
         <Header ifHeaderHasRedBar = {true}/>
         <Slider autoPlay = {true} duration={5}/>
         <CovidInfo/>
         <CountDown/>
         <Navigation ifHeader = {false}/>
         <Subjects/>
      </Fragment>
   );
}

export default StartPage;
