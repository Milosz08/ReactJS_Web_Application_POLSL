/**
 * @file CredentialSequencers.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/18/2021
 */

import React, { Fragment, useContext } from 'react';
import { LoginSessionContext } from '../../../contextStore/LoginSessionProvider';

import SessionActivityCount from './SessionActivityCount';

/**
 * @details The component is responsible for generating timers counting down the time of an active
 *          user/moderator/administrator session. In the present case, only a timer counting down the session time
 *          of the administrator / moderator of the content management system (CMS) is implemented.
 *          The component uses React Context. Extendable component.
 */
const CredentialSequencers = (): JSX.Element => {

   const { adminAuth } = useContext<any>(LoginSessionContext);

   return (
      <Fragment>
         <SessionActivityCount authCredentialPerson = {adminAuth}/>
      </Fragment>
   );
}

export default CredentialSequencers;