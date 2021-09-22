/**
 * @file DeleteModalStructure.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment } from 'react';

const SubjectDeleteModal = React.lazy(() => import('./WarningDeleteModal/SubjectDeleteModal'));
const CalendarDeleteModal = React.lazy(() => import('./WarningDeleteModal/CalendarDeleteModal'));
const UserMessageDeleteModal = React.lazy(() => import('./WarningDeleteModal/UserMessageDeleteModal'));
const ScheduleDeleteModal = React.lazy(() => import('./WarningDeleteModal/ScheduleDeleteModal'));
const ViewUserMessageModal = React.lazy(() => import('./ViewUserMessagesModal/ViewUserMessageModal'));

/**
 * @details Component is responsible for generating the structure of all modals responsible for removing records
 *          from the database using the API. The relevant buttons are activated beforehand.
 */
const DeleteModalsStructure = (): JSX.Element => {
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