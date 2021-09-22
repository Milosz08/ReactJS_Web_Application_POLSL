/**
 * @file AdminCmsLoginInputs.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *
 * @date final version: 08/18/2021
 */

import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { inputCredentials, wrongData, showProtectedField, visibleIcon } = require('./AdminCmsLogin.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    credentials: { [value: string]: string },
    setCredentials: Dispatch<SetStateAction<{ [value: string]: string }>>;
    errors: { [value: string]: boolean };
    setErrors: Dispatch<SetStateAction<{ [value: string]: boolean }>>;
    visible: { [value: string]: boolean };
    setVisible: Dispatch<SetStateAction<{ [value: string]: boolean }>>;
}

/**
 * Komponent generujący pola wprowadzania loginu, hasła oraz tokena uwierzytelniającego w celu zalogowania do
 * systemu CMS. Komponent nie posiada walidacji. Za walidację wejść odpowiada komponent wyższego rzędu.
 *
 * @param props { object } - values of the props object containing:
 *    * credentials { object } - an object that stores login, password and token.
 *    * setCredentials { Dispatch<SetStateAction<object>> } - method that sets the login parameters.
 *    * errors { object } - errors in the login, password, token.
 *    * setErrors { Dispatch<SetStateAction<object>> } - method for setting input errors.
 *    * visible { object } - visibility of the entered values in the password / token field.
 *    * setVisible { Dispatch<SetStateAction<object>> } - method setting the visibility of the entered data.
 */
const AdminCmsLoginInputs: React.FC<PropsProvider> = (props): JSX.Element => {

    const { credentials, setCredentials, errors, setErrors, visible, setVisible } = props;

    const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        switch (target.placeholder.toLocaleLowerCase()) {
            case 'login':
                setCredentials({ ...credentials, login: target.value });
                setErrors({ ...errors, login: false });
                break;
            case 'hasło':
                setCredentials({ ...credentials, password: target.value });
                setErrors({ ...errors, password: false });
                break;
            case 'token uwierzytelniający*':
                setCredentials({ ...credentials, token: target.value });
                setErrors({ ...errors, token: false });
                break;
            default:
                throw new Error('Unexpected target placeholder token');
        }
    }

    const setVisibleInputs = (id: string): void => {
        switch (id) {
            case 'password':
                if (credentials.password !== '') {
                    setVisible((prevState: any) => ({ ...setVisible, password: !prevState.password }))
                }
                break;
            case 'token':
                if (credentials.token !== '') {
                    setVisible((prevState: any) => ({ ...setVisible, token: !prevState.token }))
                }
                break;
            default:
                throw new Error('Unexpected input visibility button id');
        }
    }

    return (
        <Fragment>
            <div className = {inputCredentials}>
                <input
                    type = 'text'
                    placeholder = 'Login'
                    value = {credentials.login}
                    onChange = {handleChangeInput}
                    className = {(errors.login && wrongData).toString()}
                />
            </div>
            <div className = {inputCredentials}>
                <input
                    type = {visible.password ? 'text' : 'password'}
                    placeholder = 'Hasło'
                    value = {credentials.password}
                    onChange = {handleChangeInput}
                    className = {(errors.password && wrongData).toString()}
                />
                <button
                    className = {showProtectedField}
                    type = 'button'
                    onClick = {() => setVisibleInputs('password')}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', `${visible.password ? 'eye-slash' : 'eye'}` ]}
                        className = {visibleIcon}
                    />
                </button>
            </div>
            <div className = {inputCredentials}>
                <input
                    type = {visible.token ? 'text' : 'password'}
                    placeholder = 'Token uwierzytelniający*'
                    value = {credentials.token}
                    onChange = {handleChangeInput}
                    className = {(errors.token && wrongData).toString()}
                />
                <button
                    className = {showProtectedField}
                    type = 'button'
                    onClick = {() => setVisibleInputs('token')}
                >
                    <FontAwesomeIcon
                        icon = {[ 'fas', `${visible.token ? 'eye-slash' : 'eye'}` ]}
                        className = {visibleIcon}
                    />
                </button>
            </div>
        </Fragment>
    );
}

export default AdminCmsLoginInputs;
