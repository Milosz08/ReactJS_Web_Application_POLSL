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

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { useContext, useEffect } from 'react';

import useIsMount from './useIsMount';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

import { useDispatch } from 'react-redux';
import { SessActions } from '../../redux/sessionReduxStore/actions';
import { DbNonModalOp } from '../../redux/apiReduxStore/operationsForNonModals';
import { apiGetContentFromDB, sortAvailables } from '../../redux/apiReduxStore/types';

/**
 * Custom hook responsible for load first painfull content (big data from DB and cech authentication cookie).
 */
const useFirstPainfullLoad = (): null => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    
    const { adminSession, groupSelection } = COOKIES_OBJECT;
    
    const dispatcher = useDispatch();
    const isMount = useIsMount();
    
    useEffect(() => {
        dispatcher(SessActions.changeAdminLoggedStatus(Boolean(cookie![adminSession])))
    }, [ adminSession, cookie, dispatcher ]);

    useEffect(() => {
        if(isMount) { //Prevent dispatcher DB on next re-renders
            dispatcher(getAllCovidWarningElements());
            dispatcher(getAllFooterFormElements());
            dispatcher(getAllLastUpdateElements());
            dispatcher(getAllSubjectsElements());
            dispatcher(getAllScheduleElements(cookie![groupSelection]));
            dispatcher(getAllCalendarElements());
            dispatcher(getAllHelpersLinks());
        }
    }, [ isMount ]);
    
    return null;
};

export default useFirstPainfullLoad;