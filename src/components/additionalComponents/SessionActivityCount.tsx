import React, { useContext, useEffect } from 'react';
import { GlobalModalsStateContext } from '../../contextStore/GlobalModalsStateProvider';

export const MAX_INACTIVITY_TIME = 5; //w minutach
const ACTIVITY_EVENTS: Array<string> = [
   'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'
];

interface PropsProvider {
   authCredentialPerson: boolean;
}

/**
 * Komponent generujący odliczanie po udanym zalogowaniu (czas aktywnej sesji). Jeśli użytkownik nie wykazuje
 * aktywności, następuje odliczanie do 5 minut, po 5 minutach otwierany jest modal informujący o końcu sesji.
 *
 * @param adminAuth { boolean } - props decydujący, czy odliczanie ma się odbyć dla użytkownika czy administratora.
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
         if(secondsSinceLastActivity > maxInactivity) {
            setAdminSessionInfo(true);
            secondsSinceLastActivity = 0;
            clearInterval(index);
         }
      }

      if(authCredentialPerson && !adminSessionInfo) {
         index = setInterval(asyncCountingSession, 1000);
      }

      return () => {
         secondsSinceLastActivity = 0;
         clearInterval(index);
      }
   }, [authCredentialPerson, adminSessionInfo]);

   return null;
}

export default SessionActivityCount;