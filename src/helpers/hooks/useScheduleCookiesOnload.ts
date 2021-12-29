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

import GROUPS_STATIC from '../structs/allGroups';

import { useDispatch } from 'react-redux';
import { PrefActions } from '../../redux/preferencesReduxStore/actions';
import { groupsTypes, prefFields } from '../../redux/preferencesReduxStore/types';

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

/**
 * Custom hook responsible to load cookie schedule properties on every reload page.
 */
const useScheduleCookiesOnload = (): void => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const { groupSelection } = COOKIES_OBJECT;
    const { NORMAL_GROUPS, ENG_GROUPS, SK_GROUPS } = GROUPS_STATIC;
    const { NORMAL, ENGLISH, SK } = groupsTypes;

    const dispatcher = useDispatch();

    useEffect(() => {
        const cookieDecryptData = ({ content, tag }: any) => (
            decrypt({ content, tag: new Uint8Array(tag.data) })
        );

        const setDecryptedCookieValue = (): void => {
            if (Boolean(cookie![groupSelection])) {
                const [ normal, eng, sk ] = cookieDecryptData(cookie![groupSelection]).split(',');
                dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, NORMAL, normal.toLocaleLowerCase()));
                dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, ENGLISH, eng.toLocaleLowerCase()));
                dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, SK, sk.toLocaleLowerCase()));
            }
        };
        setDecryptedCookieValue();
    }, [ ENGLISH, ENG_GROUPS, NORMAL, NORMAL_GROUPS, SK, SK_GROUPS, cookie, dispatcher, groupSelection ]);

};

export default useScheduleCookiesOnload;