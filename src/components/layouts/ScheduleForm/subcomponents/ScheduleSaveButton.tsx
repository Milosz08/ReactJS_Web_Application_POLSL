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

import * as React from 'react';
import { useContext } from 'react';
import { encrypt } from 'react-crypt-gsm';

import cookieExpires from '../../../../context/cookiesContext/cookieExpires';
import COOKIES_OBJECT from '../../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../context/cookiesContext/CookiesObjectsProvider';

import { RootState } from '../../../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveScheduleModal } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { ScheduleSaveInputButton } from '../ScheduleForm.styles';

/**
 * Component responsible for generate save all choosed preferences into Cookie files.
 */
const ScheduleSaveButton: React.FC = (): JSX.Element => {

    const { setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const { groupSelection } = COOKIES_OBJECT;
    const { normalGroup, engGroup, skGroup } = chooseGroups;

    const dispatcher = useDispatch();

    const createRememberCookie = (dataEncrypt: string, cookieName: string): void => {
        const encryptData = encrypt(dataEncrypt);
        const expCookie = cookieExpires(365);
        setCookie!(cookieName, encryptData, { path: '/', expires: expCookie });
    };

    const handleSaveButton = (): void => {
        window.scrollTo(0, 0);
        createRememberCookie(`${normalGroup},${engGroup},${skGroup}`, groupSelection);
        dispatcher(toggleSaveScheduleModal(true));
    };

    return (
        <ScheduleSaveInputButton
            onClick = {handleSaveButton}
            title = 'Zapisz swoje ustawienia w pliku Cookie'
            type = 'button'
        >
            Zapisz mój wybór
        </ScheduleSaveInputButton>
    );
};

export default ScheduleSaveButton;