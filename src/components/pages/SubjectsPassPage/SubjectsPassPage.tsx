import React, { Fragment } from 'react';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';

const SubjectsPassPage = () => {
   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {false}/>
         <CurrentURLpath ifImportatHeaderActive={true}/>
      </Fragment>
   );
}

export default SubjectsPassPage;