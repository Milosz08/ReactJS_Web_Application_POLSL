/**
 * @file ChangeTypeOfCredential.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCssModules: "^4.7.11"
 *
 * @date final version: 09/17/2021 <- adding to previous project
 */

import React, { Dispatch, SetStateAction } from 'react';
import { CREDENTIALS } from './ChangeCredentials';
import classnames from 'classnames';

const { changeAuthTypeContainer, authRadio } = require('./../HomePanel.module.scss');
const { radiomark, singleRadio } = require('./../../Modals/AddChangeSubjectModal/AddChangeSubjectModal.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    credential: number;
    callback: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component responsible for toggling authentication change for administrator/moderator account
 *          (available only from level 2 - main system administrator level).
 *
 * @param credential { enum } - authentication level.
 * @param callback { Dispatch<SetStateAction<number>> } - change the authentication level.
 */
const ChangeTypeOfCredentials: React.FC<PropsProvider> = ({ credential, callback }) => (
    <div className = {changeAuthTypeContainer}>
        <div className = {classnames(singleRadio, authRadio)}>
            <input
                type = 'radio'
                id = 'range2'
                name = 'rangeFields'
                checked = {credential === CREDENTIALS.MODERATOR}
                onChange = {() => callback(CREDENTIALS.MODERATOR)}
            />
            <label htmlFor = 'range2'>Moderator</label>
            <div className = {radiomark}/>
        </div>
        <div className = {classnames(singleRadio, authRadio)}>
            <input
                type = 'radio'
                id = 'range1'
                name = 'rangeFields'
                checked = {credential === CREDENTIALS.ADMIN}
                onChange = {() => callback(CREDENTIALS.ADMIN)}
            />
            <label htmlFor = 'range1'>Administrator</label>
            <div className = {radiomark}/>
        </div>
    </div>
);

export default ChangeTypeOfCredentials;