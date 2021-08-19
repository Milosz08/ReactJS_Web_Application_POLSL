/**
 * @file LoginSessionProvider.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component with Context Store (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface LoginSessionProviderTypes {
   adminAuth: boolean;
   setAdminAuth: Dispatch<SetStateAction<boolean>>;
   userAuth: boolean;
   setUserAuth: Dispatch<SetStateAction<boolean>>;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const LoginSessionContext = createContext<Partial<LoginSessionProviderTypes>>({ });

/**
 * @details Component that stores the store with information about an active user and administrator session. Values from
 *          Hooks are passed to all domain components wrapped with provider.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const LoginSessionProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

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