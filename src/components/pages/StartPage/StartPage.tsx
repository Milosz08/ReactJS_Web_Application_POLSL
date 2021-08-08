import React, { Fragment } from 'react';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import Slider from './Slider/Slider';
import CovidInfo from './CovidInfo/CovidInfo';
import CountDown from './CountDown/CountDown';
import Navigation from '../../layouts/Navigation/Navigation';
import Subjects from '../../layouts/Subjects/Subjects';

/**
 * Strona startowa (adres bezwzględny)
 */
const StartPage = () => {
   return (
      <Fragment>
         <CookiesNotification/>
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
