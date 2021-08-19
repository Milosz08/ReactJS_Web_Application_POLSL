import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import GROUPS_STATIC from '../constants/allGroups';

interface PropsProvider {
   children: React.ReactNode;
}

export interface ScheduleType {
   groupSelected: string;
   setGroupSelected: Dispatch<SetStateAction<string>>;
   engSelected: string;
   setEngSelected: Dispatch<SetStateAction<string>>;
   inputField: string;
   setInputField: Dispatch<SetStateAction<string>>;
}

export const ScheduleContext = createContext<Partial<ScheduleType>>({ });

/**
 * Store przechowujący kontekst stanów odnoszących się do zarządzania planem zajęć (wybór grupy zwykłej,
 * wybór grupy z ang, zawartość pola wprowadzania).
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const ScheduleProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

   const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

   const [ groupSelected, setGroupSelected ] = useState<string>(NORMAL_GROUPS[0].text);
   const [ engSelected, setEngSelected ] = useState<string>(ENG_GROUPS[0]);
   const [ inputField, setInputField ] = useState<string>('');

   return (
      <ScheduleContext.Provider
         value = {{
            groupSelected, setGroupSelected,
            engSelected, setEngSelected,
            inputField, setInputField
         }}
      >
         {children}
      </ScheduleContext.Provider>
   );
}

export default ScheduleProvider;