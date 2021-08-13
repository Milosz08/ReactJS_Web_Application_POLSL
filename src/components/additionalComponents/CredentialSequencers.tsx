import React, { useContext, Fragment } from 'react';
import { LoginSessionContext } from "../../contextStore/LoginSessionProvider";
import SessionActivityCount from "./SessionActivityCount";

/**
 *
 */
const CredentialSequencers = () => {

   const { adminAuth } = useContext<any>(LoginSessionContext);

   return (
      <Fragment>
         <SessionActivityCount authCredentialPerson = {adminAuth}/>
      </Fragment>
   );
}

export default CredentialSequencers;