/**
 * @file AddChangeModalStructure.tsx
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

import FormDataAndValidateProvider from '../../../../../contextStore/FormDataAndValidateProvider';
import FormCalendarModalProvider from '../../../../../contextStore/FormCalendarModalProvider';
import FormScheduleModalProvider from '../../../../../contextStore/FormScheduleModalProvider';

import AddChangeSubjectModal from './AddChangeSubjectModal/AddChangeSubjectModal';
import AddChangeCalendarModal from './AddChangeCalendarModal/AddChangeCalendarModal';
import AddChangeScheduleModal from './AddChangeScheduleModal/AddChangeScheduleModal';

/**
 * @details The component is responsible for generating the structure of all modals responsible for adding / modifying
 *          records. It is activated by means of a trigger in the form of a button. Each modal weaves a context that
 *          stores validation methods and the state of the forms.
 */
const AddChangeModalsStructure = (): JSX.Element => {
   return (
      <Fragment>
         <FormDataAndValidateProvider>
            <AddChangeSubjectModal/>
         </FormDataAndValidateProvider>
         <FormCalendarModalProvider>
            <AddChangeCalendarModal/>
         </FormCalendarModalProvider>
         <FormScheduleModalProvider>
            <AddChangeScheduleModal/>
         </FormScheduleModalProvider>
      </Fragment>
   );
}

export default AddChangeModalsStructure;