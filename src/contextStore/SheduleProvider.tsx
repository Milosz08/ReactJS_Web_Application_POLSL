import React, {createContext, useState} from 'react';
import GROUPS_STATIC from '../constants/allGroups';

interface PropsProvider {
   children: React.ReactNode;
}

export const SheduleContext = createContext<any>(null);

/**
 * Store przechowujący kontekst stanów odnoszących się do zarządzania planem zajęć (wybór grupy zwykłej,
 * wybór grupy z ang, zawartość pola wprowadzania).
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const SheduleProvider: React.FC<PropsProvider> = ({ children }) => {

   const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

   const [ groupSelected, setGroupSelected ] = useState<string>(NORMAL_GROUPS[0].text);
   const [ engSelected, setEngSelected ] = useState<string>(ENG_GROUPS[0]);
   const [ inputField, setInputField ] = useState<string>('');

   return (
      <SheduleContext.Provider
         value = {{
            groupSelected, setGroupSelected,
            engSelected, setEngSelected,
            inputField, setInputField
         }}
      >
         {children}
      </SheduleContext.Provider>
   );
}

export default SheduleProvider;