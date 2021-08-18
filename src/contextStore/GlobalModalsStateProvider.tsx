import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

interface PropsProvider {
   children: React.ReactNode;
}

interface StateProvider {
   modalOpen: boolean;
   counter: number;
}

export interface GlobalModalsStateTypes {
   onSaveOpenModal: boolean;
   setOnSaveOpenModal: Dispatch<SetStateAction<boolean>>
   adminSessionInfo: StateProvider;
   setAdminSessionInfo: Dispatch<SetStateAction<StateProvider>> | any
   lastActivity: number;
   setLastActivity: Dispatch<SetStateAction<number>>
}

export const GlobalModalsStateContext = createContext<Partial<GlobalModalsStateTypes>>({ });

/**
 * Komponent przechowujący store dla globalnych modali (zapis preferencji planu zajęć do objektu Cookie,
 * powiadomienie o końcu czasu ektywnej sesji, itp.).
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const GlobalModalsStateProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ onSaveOpenModal, setOnSaveOpenModal ] = useState<boolean>(false);
   const [ adminSessionInfo, setAdminSessionInfo ] = useState<StateProvider>({ modalOpen: false, counter: 0 });
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