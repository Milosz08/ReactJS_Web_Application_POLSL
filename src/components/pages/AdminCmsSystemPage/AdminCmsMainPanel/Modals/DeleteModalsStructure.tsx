/**
 * @file DeleteModalsStructure.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version project: "^0.1.0"
 *          ReactJS: "^17.0.2"
 *
 * @date final version: 08/18/2021
 */

import React, { Fragment } from 'react';

import SubjectDeleteModal from './WarningDeleteModal/SubjectDeleteModal';
import CalendarDeleteModal from './WarningDeleteModal/CalendarDeleteModal';
import UserMessageDeleteModal from './WarningDeleteModal/UserMessageDeleteModal';
import ScheduleDeleteModal from './WarningDeleteModal/ScheduleDeleteModal';
import ViewUserMessageModal from './ViewUserMessagesModal/ViewUserMessageModal';

/**
 * @details The component is responsible for generating the structure of all modals responsible for removing records
 *          from the database using the API. The relevant buttons are activated beforehand.
 */
const DeleteModalsStructure = () => {
   return (
      <Fragment>
         <SubjectDeleteModal/>
         <CalendarDeleteModal/>
         <UserMessageDeleteModal/>
         <ScheduleDeleteModal/>
         <ViewUserMessageModal/>
      </Fragment>
   );
}

export default DeleteModalsStructure;