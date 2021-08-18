import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TEXTFIELD_SIZE = {
   MIN_LENGTH: 10,
   MAX_LENGTH: 80
}

interface PropsProvider {
   children: React.ReactNode;
}

interface StateProvider {
   [value: string]: boolean;
}

export interface FormCalendarModalType {
   date: string;
   setDate: Dispatch<SetStateAction<string>>;
   entriesCount: number;
   setEntriesCount: Dispatch<SetStateAction<number>>;
   entries: { [value: string]: string }[];
   setEntries: Dispatch<SetStateAction<{ [value: string]: string; }[]>>;
   errors: { [value: string]: boolean };
   setErrors: Dispatch<SetStateAction<StateProvider>>;
   validateAll: () => StateProvider;
}

export const FormCalendarModalContext = createContext<Partial<FormCalendarModalType>>({ });

/**
 * Komponent przechowujący store wykorzystywany do modalu kalendarza w systemie CMS. Komponent posiada walidację
 * wprowadzanych danych w formularzu (funkcja przechowywana w storze, dziedziczona przez wszystkie owrapowane węzły).
 *
 * @param children { React.ReactNode } - wszystkie komponenty dzieci posiadające zawartość stora.
 */
const FormCalendarModalProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ errors, setErrors ] = useState<StateProvider>({ date: false, time: false, message: false });

   const [ date, setDate ] = useState<string>('');
   const [ entriesCount, setEntriesCount ] = useState<number>(1);
   const [ entries, setEntries ] = useState<{ [value: string]: string }[]>(Array.from({ length: entriesCount }, () => ({
      _id: uuidv4(), start: '', message: '', importantLevel: 'low'
   })));

   const validateAll = (): StateProvider => {
      let dateBool = false, timeBool = false, messageBool = false;
      const allTimes = entries.filter((entrie: any) => entrie.start === '');
      const allMessages = entries.filter((entrie: any) => entrie.message === '' || entrie.message.length < 10);

      if(date === '') {
         dateBool = true;
      }
      if(allTimes.length !== 0) {
         timeBool = true;
      }
      if(allMessages.length !== 0) {
         messageBool = true;
      }

      return { dateBool, timeBool, messageBool };
   }

   return (
      <FormCalendarModalContext.Provider
         value = {{
            date, setDate,
            entriesCount, setEntriesCount,
            entries, setEntries,
            errors, setErrors,
            validateAll
         }}
      >
         {children}
      </FormCalendarModalContext.Provider>
   );
}

export default FormCalendarModalProvider;