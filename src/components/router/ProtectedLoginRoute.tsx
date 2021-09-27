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

import React from 'react';
import { Redirect, Route } from 'react-router';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    auth: boolean;
    setAuth: (value: boolean) => boolean;
    handleCookie: any;
    redirectPath: any;
    component: any;
}

/**
 * @details Locking page routing, if user/administrator has no authentication.
 *
 * @param auth { boolean } - information on user/administrator authentication.
 * @param setAuth { (value: boolean) => boolean } - function setting authentication for user/administrator.
 * @param handleCookie { any } - function which suppourt the Cookies object (add/delete).
 * @param redirectPath { string } - path to move ReactRouter.
 * @param Component - React Component to render (page).
 * @param rest - rest of the parameters passed to inherited components.
 */
const ProtectedLoginRoute: React.FC<PropsProvider | any> = ({
    auth, setAuth, handleCookie, redirectPath, component: Component, ...rest
}): JSX.Element => {

    const renderPathStructure = (props: any) => {
        if (auth) {
            return <Component {...props} setAuth = {setAuth} handleCookie = {handleCookie}/>;
        } else {
            return <Redirect to = {redirectPath}/>;
        }
    }

    return (
        <Route {...rest} render = {(props: any) => renderPathStructure(props)}/>
    );
}

export default ProtectedLoginRoute;