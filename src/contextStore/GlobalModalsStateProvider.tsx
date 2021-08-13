import React, { createContext, useState } from 'react';

export const GlobalModalsStateContext = createContext<any>(null);

interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Komponent przechowujący store dla globalnych modali (zapis preferencji planu zajęć do objektu Cookie,
 * powiadomienie o końcu czasu ektywnej sesji, itp.).
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const GlobalModalsStateProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ onSaveOpenModal, setOnSaveOpenModal ] = useState<boolean>(false);
   const [ adminSessionInfo, setAdminSessionInfo ] = useState<boolean>(false);
   const [ lastActivity, setLastActivity ] = useState<number>(0);

   return (
      <GlobalModalsStateContext.Provider
         value = {{
            onSaveOpenModal, setOnSaveOpenModal,
            adminSessionInfo, setAdminSessionInfo,
            lastActivity, setLastActivity
         }}
      >
         {children}
      </GlobalModalsStateContext.Provider>
   );
}

export default GlobalModalsStateProvider;