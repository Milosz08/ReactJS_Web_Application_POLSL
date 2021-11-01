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

import { useContext, useEffect } from 'react';
import { decrypt } from 'react-crypt-gsm';

import { useDispatch } from 'react-redux';
import { groupsTypes } from '../../redux/preferencesReduxStore/types';
import { setSelectedGroup } from '../../redux/preferencesReduxStore/actions';

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

/**
 * Custom hook responsible to load cookie schedule properties on every reload page.
 */
const useScheduleCookiesOnload = (): void => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    
    const { groupSelection, engGroupSelection, skGroupSelection } = COOKIES_OBJECT;
    const { NORMAL, ENGLISH, SK } = groupsTypes;
    
    const dispatcher = useDispatch();
    
    useEffect(() => {
        const cookieDecryptData = ({ content, tag }: any) => (
            decrypt({ content, tag: new Uint8Array(tag.data) }
        ));
        
        const setDecryptedCookieValue = (): void => {
            if (Boolean(cookie![groupSelection]) || Boolean(cookie![engGroupSelection]) || Boolean(cookie![skGroupSelection])) {
                dispatcher(setSelectedGroup(NORMAL, cookieDecryptData(cookie![groupSelection])));
                dispatcher(setSelectedGroup(ENGLISH, cookieDecryptData(cookie![engGroupSelection])));
                dispatcher(setSelectedGroup(SK, cookieDecryptData(cookie![skGroupSelection])));
            }
        };
        setDecryptedCookieValue();
    }, [ ENGLISH, NORMAL, SK, cookie, dispatcher, engGroupSelection, groupSelection, skGroupSelection ]);

};

export default useScheduleCookiesOnload;