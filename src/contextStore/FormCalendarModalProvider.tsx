/**
 * @file FormCalendarModalProvider.tsx
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
import { v4 as uuidv4 } from 'uuid';

/**
 * Object of constants describing the minimum and maximum dimensions of the text field in the form.
 */
export const TEXTFIELD_SIZE: { [value: string]: number } = {
   MIN_LENGTH: 10,
   MAX_LENGTH: 80
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Interface defining the type of state values.
 */
interface StateProvider {
   [value: string]: boolean;
}

/**
 * Interface defining the type of return in context store values.
 */
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

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const FormCalendarModalContext = createContext<Partial<FormCalendarModalType>>({ });

/**
 * @details Store component used for the calendar modal in the CMS system. The component has validation of data entered in
 *          the form (function stored in the page, inherited by all wrapped nodes).
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const FormCalendarModalProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

   const [ errors, setErrors ] = useState<StateProvider>({ date: false, time: false, message: false });

   const [ date, setDate ] = useState<string>('');
   const [ entriesCount, setEntriesCount ] = useState<number>(1);
   const [ entries, setEntries ] = useState<{ [value: string]: string }[]>(Array.from({ length: entriesCount }, () => ({
      _id: uuidv4(), start: '', message: '', importantLevel: 'low'
   })));

   const validateAll = (): StateProvider => {
      let dateBool = false, timeBool = false, messageBool = false;
      const allTimes = entries.filter((entrie: { [value: string]: string }) => entrie.start === '');
      const allMessages = entries.filter((entrie: { [value: string]: string }) => (
         entrie.message === '' || entrie.message.length < 10
      ));

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