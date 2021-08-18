import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

export interface LoginSessionProviderTypes {
   adminAuth: boolean;
   setAdminAuth: Dispatch<SetStateAction<boolean>>;
   userAuth: boolean;
   setUserAuth: Dispatch<SetStateAction<boolean>>;
}

export const LoginSessionContext = createContext<Partial<LoginSessionProviderTypes>>({ });

interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Komponent przechowujący store z informacją na temat aktywnej sesji użytkownika oraz administratora. Wartości z
 * hooków przekazywane są do wszystkich komponentów dziedzi owiniętych providerem.
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const LoginSessionProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ adminAuth, setAdminAuth ] = useState<boolean>(false);
   const [ userAuth, setUserAuth ] = useState<boolean>(false);

   return (
      <LoginSessionContext.Provider
         value = {{
            adminAuth, setAdminAuth,
            userAuth, setUserAuth,
         }}
      >
         {children}
      </LoginSessionContext.Provider>
   );
}

export default LoginSessionProvider;