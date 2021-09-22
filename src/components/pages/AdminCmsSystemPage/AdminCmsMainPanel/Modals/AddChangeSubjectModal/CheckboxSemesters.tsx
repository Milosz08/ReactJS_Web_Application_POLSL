/**
 * @file CheckboxSemesters.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import classnames from 'classnames';

import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';
import STATIC_OPTIONS from '../../../../../../constants/inputOptions';

const { checkboxContainer, someError, singleCheckboxField, checkmark } = require('./AddChangeSubjectModal.module.scss');

/**
 * @details A checkbox rendering component for selecting the semesters in which the subject is conducted (to
 *          the modal with the form in the admin's CMS panel - the subject adding / editing panel).
 */
const CheckboxSemesters = (): JSX.Element => {

    const { SEMESTERS } = STATIC_OPTIONS;
    const {
        semesters, setSemesters, errors, setErrors
    } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

    const toggleClass = errors!.checkbox ? someError : '';

    const generateSemestersCheckboxInputs = SEMESTERS.map((sem, index) => {

        const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            let updateArray = [ ...semesters! ];
            target.checked ? updateArray[index] = target.value : updateArray[index] = '';
            setErrors!({ ...errors, checkbox: false });
            setSemesters!(updateArray);
        }

        return (
            <div key = {sem} className = {singleCheckboxField}>
                <input
                    checked = {sem === semesters![index]}
                    type = 'checkbox'
                    id = {sem}
                    value = {sem}
                    onChange = {handleChange}
                />
                <label htmlFor = {sem}>{`Semestr ${index + 1}`}</label>
                <div className = {checkmark}/>
            </div>
        )
    });

    return (
        <div className = {classnames(checkboxContainer, toggleClass)}>
            {generateSemestersCheckboxInputs}
        </div>
    );
}

export default CheckboxSemesters;