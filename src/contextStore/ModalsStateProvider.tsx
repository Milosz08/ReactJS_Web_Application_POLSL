import React, { createContext, useState } from 'react';

export const ModalsStateContext = createContext<any>(null);

export const MODAL_TYPES = {
   EDIT: 'edit',
   ADD: 'add',
   REMOVE: 'remove',
   VIEW: 'view',
}

interface PropsProvider {
   children: React.ReactNode;
}

export interface ModalStateProvider {
   id: string;
   type: string;
   ifOpen: boolean;
}

/**
 * Store przechowujący stany modali w panelu administratora CMS. Stan składa się z 3 elementów: id elementu,
 * typ okna (edycja, podgląd, usunięcie lub dodanie).
 *
 * @param children { React.ReactNode } - wszystkie komponenty przechwytujące store z kontekstu.
 */
const ModalsStateProvider: React.FC<PropsProvider> = ({ children }) => {

   const { EDIT } = MODAL_TYPES;

   const [ subjectModal, setSubjectModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, ifOpen: false });
   const [ calendarModal, setCalendarModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, ifOpen: false });
   const [ messageModal, setMessageModal ] = useState<ModalStateProvider>({ id: '', type: EDIT, ifOpen: false });

   return (
      <ModalsStateContext.Provider
         value = {{
            subjectModal, setSubjectModal,
            calendarModal, setCalendarModal,
            messageModal, setMessageModal
         }}
      >
         {children}
      </ModalsStateContext.Provider>
   );
}

export default ModalsStateProvider;