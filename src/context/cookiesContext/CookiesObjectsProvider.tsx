/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import * as React from 'react';
import { createContext } from 'react';
import { useCookies } from 'react-cookie';

import COOKIES_OBJECT from './allCookies.config';

export interface CookiesObjectsTypes {
    cookie: { [p: string]: any };
    setCookie: (name: string, value: any, options?: (any | undefined)) => void;
    removeCookie: (name: string, options?: (any | undefined)) => void
}

interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const CookiesObjectsContext = createContext<Partial<CookiesObjectsTypes>>({});

/**
 * Provider that stores all cookie names used in React. The props passes: the global cookie object and two
 * methods: setCookie () to create a new Cookie object and the corresponding removeCookie () to remove the
 * selected cookie object.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const CookiesObjectsProvider: React.FC<PropsProvider> = ({ children }: PropsProvider): JSX.Element => {

    const [ cookie, setCookie, removeCookie ] = useCookies(Object.keys(COOKIES_OBJECT).map(key => COOKIES_OBJECT[key]));

    return (
        <CookiesObjectsContext.Provider
            value = {{
                cookie, setCookie, removeCookie
            }}
        >
            {children}
        </CookiesObjectsContext.Provider>
    );
}

export default CookiesObjectsProvider;