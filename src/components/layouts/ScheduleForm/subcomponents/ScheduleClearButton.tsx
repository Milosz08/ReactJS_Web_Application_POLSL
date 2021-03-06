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
import { useContext, useEffect } from 'react';

import GROUPS_STATIC from '../../../../helpers/structs/allGroups';

import COOKIES_OBJECT from '../../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../context/cookiesContext/CookiesObjectsProvider';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiActionsSort } from '../../../../redux/apiReduxStore/actions';
import { PrefActions } from '../../../../redux/preferencesReduxStore/actions';
import { groupsTypes, prefFields } from '../../../../redux/preferencesReduxStore/types';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { ScheduleClearInputsButton } from '../ScheduleForm.styles';

/**
 * Component responsible for generating clear all schedule preferences button.
 */
const ScheduleClearButton: React.FC = (): JSX.Element => {

    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const { removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { groupSelection } = COOKIES_OBJECT;

    const dispatcher = useDispatch();

    const { NORMAL, ENGLISH, SK } = groupsTypes;
    const { normalGroup, engGroup, skGroup } = chooseGroups;
    const { NORMAL_GROUPS, ENG_GROUPS, SK_GROUPS } = GROUPS_STATIC;

    const handleClearButton = (): void => {
        window.scrollTo(0, 0);
        dispatcher(PrefActions.changeRootPrefField(prefFields.SCHEDULE_CLEAR_MODAL, true));
        dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, NORMAL, NORMAL_GROUPS[0]));
        dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, ENGLISH, ENG_GROUPS[0]));
        dispatcher(PrefActions.changeSecondRootPrefField(prefFields.CHOOSE_GROUP, SK, SK_GROUPS[0]));
        removeCookie!(groupSelection);
    };

    useEffect(() => {
        dispatcher(ApiActionsSort.filteredScheduleSubjects(normalGroup, engGroup, skGroup));
    }, [ normalGroup, engGroup, skGroup, dispatcher ]);

    return (
        <ScheduleClearInputsButton
            onClick = {handleClearButton}
            title = 'Przywróć ustawienia domyślne'
            type = 'button'
        >
            Przywróć domyślne
        </ScheduleClearInputsButton>
    );
};

export default ScheduleClearButton;