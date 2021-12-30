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
import useIsMount from './useIsMount';

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

import { API_ENDPOINTS } from '../structs/appEndpoints';

import { useDispatch } from 'react-redux';
import { SessActions } from '../../redux/sessionReduxStore/actions';
import { DbNonModalOp } from '../../redux/apiReduxStore/operationsForNonModals';
import { apiGetContentFromDB } from '../../redux/apiReduxStore/types';

/**
 * Custom hook responsible for load first painfull content (big data from DB and cech authentication cookie).
 */
const useFirstPainfullLoad = (): null => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { adminSession, groupSelection } = COOKIES_OBJECT;

    const {
        COVID_WARNINGS, LAST_UPDATE: LAST_UPDATE_END, SUBJECTS_ELMS, CALENDAR_RECORDS, HELPERS_LINKS, FOOTER_FORM,
        SCHEDULE_SUBJECTS
    } = API_ENDPOINTS;

    const { COVID, LAST_UPDATE, SUBJECTS, CALENDAR, HELPERS, USER_MESSAGES, SCHEDULE } = apiGetContentFromDB;

    const dispatcher = useDispatch();
    const isMount = useIsMount();
    
    useEffect(() => {
        dispatcher(SessActions.changeAdminLoggedStatus(Boolean(cookie![adminSession])))
    }, [ adminSession, cookie, dispatcher ]);

    useEffect(() => {
        if(isMount) { //Prevent usage dispatcher DB on next re-renders
            dispatcher(DbNonModalOp.getAllUniversalElements(COVID_WARNINGS, COVID));
            dispatcher(DbNonModalOp.getAllUniversalElements(LAST_UPDATE_END, LAST_UPDATE));
            dispatcher(DbNonModalOp.getAllUniversalElements(SUBJECTS_ELMS, SUBJECTS));
            dispatcher(DbNonModalOp.getAllUniversalElements(CALENDAR_RECORDS, CALENDAR));
            dispatcher(DbNonModalOp.getAllUniversalElements(HELPERS_LINKS, HELPERS));
            dispatcher(DbNonModalOp.getAllUniversalElements(FOOTER_FORM, USER_MESSAGES));
            dispatcher(DbNonModalOp.getAllUniversalElements(SCHEDULE_SUBJECTS, SCHEDULE, cookie![groupSelection]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isMount ]);
    
    return null;
};

export default useFirstPainfullLoad;