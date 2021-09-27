/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React, { ChangeEvent, Dispatch, SetStateAction, Fragment } from 'react';

const ShowHideAuthVisible = React.lazy(() => import('./ShowHideAuthVisible'));

const { passwordField, errorValue } = require('./../HomePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    newCredent: {
        login: string;
        passwords: any[];
    };
    setNewCredent: Dispatch<SetStateAction<{ login: string, passwords: any[] }>>;
    errors: {
        [value: string]: boolean;
    };
    setErrors: Dispatch<SetStateAction<{ [value: string]: boolean }>>;
}

/**
 * @details Component that generates fields for entering new authentication data of a user / moderator's account
 *          (available only from authentication level 2 - superadministrator (main system administrator)).
 *
 * @param newCredent { string object } - new login/password/token.
 * @param setNewCredent { Dispatch<SetStateAction<object>> } - function that sets a new login/password/token.
 * @param errors { boolean object } - an object that stores errors when entering values into edit fields.
 * @param setErrors { Dispatch<SetStateAction<object>> } - a function that sets errors in field values.
 */
const GenerateAuthField: React.FC<PropsProvider> = ({ newCredent, setNewCredent, errors, setErrors }): JSX.Element => {

    const generatePasswordsFields = newCredent.passwords.map((password: any, index: number) => {
        const copy = [ ...newCredent.passwords ];
        const indexOfArray = copy.findIndex(copyArray => copyArray === password);

        const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>): void => {
            copy[indexOfArray].value = target.value;
            if (target.placeholder.includes('ponownie')) {
                setErrors({ ...errors, passNotMath: false });
            } else {
                setErrors({ ...errors, password: false });
            }
            setNewCredent({ ...newCredent, passwords: copy });
        }

        const handleChangeVisibility = (): void => {
            if (copy[indexOfArray].value !== '') {
                copy[indexOfArray].ifVisible = !copy[indexOfArray].ifVisible;
                setNewCredent({ ...newCredent, passwords: copy });
            }
        }

        return (
            <div className = {passwordField} key = {password.id}>
                <input
                    type = {password.ifVisible ? 'text' : 'password'}
                    placeholder = {`${index !== 0 ? 'Potwierdź nowe' : 'Nowe'} hasło`}
                    value = {password.value}
                    onChange = {handleChangeInput}
                    className = {index === 0 ? (errors.password ? errorValue : '') : (errors.passNotMath ? errorValue : '')}
                />
                <ShowHideAuthVisible
                    handleVisible = {handleChangeVisibility}
                    ifVisible = {password.ifVisible}
                />
            </div>
        );
    });

    return (
        <Fragment>
            {generatePasswordsFields}
        </Fragment>
    );
}

export default GenerateAuthField;