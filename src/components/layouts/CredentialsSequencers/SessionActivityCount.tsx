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

import React, { useContext, useEffect } from 'react';
import { GlobalModalsStateContext } from '../../../contextStore/GlobalModalsStateProvider';

/**
 * Maximum session time (inactivity on the part of the user). Exported variable.
 */
export const MAX_INACTIVITY_TIME: number = 5;

/**
 * A string array that stores every possible event (user interaction with the page). Used to reset the timer.
 */
const ACTIVITY_EVENTS: string[] = [
   'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'
];

/**
 * Interface defining the type of props.
 */
interface PropsProvider {
   authCredentialPerson: boolean;
}

/**
 * @details Component that generates a countdown after a successful login (active session time). If the user is not
 *          active, it counts down according to the number of minutes in the variable "MAX_INACTIVITY_TIME" After the
 *          countdown is over, a modal informing about the end of the session is opened (you can reset it or
 *          manually log out of the system).
 *
 * @param adminAuth { boolean } - props deciding whether the countdown is to be run for a user or an administrator.
 */
const SessionActivityCount: React.FC<PropsProvider> = ({ authCredentialPerson }) => {

   const { adminSessionInfo, setAdminSessionInfo } = useContext<any>(GlobalModalsStateContext);

   useEffect(() => {
      let index: NodeJS.Timeout;
      let secondsSinceLastActivity = 0;
      const maxInactivity = (60 * MAX_INACTIVITY_TIME);
      const activity = () => secondsSinceLastActivity = 0;

      ACTIVITY_EVENTS.forEach((eventName: string) => document.addEventListener(eventName, activity, true));

      const asyncCountingSession = () => {
         secondsSinceLastActivity++;
         setAdminSessionInfo({ ...adminSessionInfo, counter: secondsSinceLastActivity });
         if(secondsSinceLastActivity > maxInactivity) {
            setAdminSessionInfo({ ...adminSessionInfo, modalOpen: true });
            secondsSinceLastActivity = 0;
            clearInterval(index);
         }
      }

      if(authCredentialPerson && !adminSessionInfo.modalOpen) {
         index = setInterval(asyncCountingSession, 1000);
      }

      return () => {
         secondsSinceLastActivity = 0;
         clearInterval(index);
      }
   }, [authCredentialPerson, adminSessionInfo.modalOpen]);

   return null;
}

export default SessionActivityCount;