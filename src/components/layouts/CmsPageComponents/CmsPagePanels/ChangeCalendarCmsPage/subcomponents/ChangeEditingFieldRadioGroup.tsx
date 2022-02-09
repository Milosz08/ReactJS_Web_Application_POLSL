/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { PrefActions } from '../../../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../../../redux/preferencesReduxStore/initialState';
import { calendarEditingMode, prefFields } from '../../../../../../redux/preferencesReduxStore/types';

import cookieExpires from '../../../../../../context/cookiesContext/cookieExpires';
import COOKIES_OBJECT from '../../../../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../../../context/cookiesContext/CookiesObjectsProvider';

import { SelectedCalendarModeListContainer } from '../ChangeCalendarCmsPage.styles';

const UniversalRadioInput = React.lazy(() => import('../../../../../reusable/UniversalRadioInput/UniversalRadioInput'));

/**
 * Component responsible for choosing calendar editing mode (list or WYSIWYG).
 */
const ChangeEditingFieldRadioGroup: React.FC = (): JSX.Element => {

    const { calendarEditingMode: editMode }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const { cookie, setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const dispatcher = useDispatch();
    const { LIST } = calendarEditingMode;

    const handleRadioInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(PrefActions.changeRootPrefField(prefFields.CALENDAR_EDITING_MODE, target.id as calendarEditingMode));
        setCookie!(COOKIES_OBJECT.editorMode, target.id, { path: '/', expires: cookieExpires(365) });
    };

    useEffect(() => {
        if(cookie![COOKIES_OBJECT.editorMode] !== undefined) {
            const mode = cookie![COOKIES_OBJECT.editorMode];
            dispatcher(PrefActions.changeRootPrefField(prefFields.CALENDAR_EDITING_MODE, mode as calendarEditingMode));
        }
    }, [ cookie, dispatcher ]);
    
    const generateRadioInputs = Object.values(calendarEditingMode).map(el => (
        <UniversalRadioInput
            key = {el}
            content = {el === LIST ? 'Używam standardowej listy' : 'Używam edytora "WYSIWYG"'}
            radioProps = {{
                id: el,
                name: 'rangeFields',
                checked: editMode === el,
                onChangeCallback: handleRadioInput
            }}
        />
    ));

    return (
        <SelectedCalendarModeListContainer>
            {generateRadioInputs}
        </SelectedCalendarModeListContainer>
    );
};

export default ChangeEditingFieldRadioGroup;