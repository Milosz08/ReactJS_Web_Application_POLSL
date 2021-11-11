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

import { groupsTypes } from '../../../redux/preferencesReduxStore/types';
import GROUPS_STATIC from '../../../helpers/structs/allGroups';

import {
    ScheduleBackgroundImage, ScheduleFormContainer, ScheduleFormStyle, ScheduleFormInputsWrapper
} from './ScheduleForm.styles';

import ScheduleGroupRadio from './subcomponents/ScheduleGroupRadio';
import ScheduleFormButtons from './subcomponents/ScheduleFormButtons';
import useScheduleCookiesOnload from '../../../helpers/hooks/useScheduleCookiesOnload';

/**
 *
 */
const ScheduleForm: React.FC = (): JSX.Element => {

    const { NORMAL_GROUPS, ENG_GROUPS, SK_GROUPS } = GROUPS_STATIC;
    const { NORMAL, ENGLISH, SK  } = groupsTypes;

    useScheduleCookiesOnload();

    return (
        <ScheduleFormContainer>
            <ScheduleBackgroundImage
                src = {process.env.PUBLIC_URL + '/images/sheduleBgc.png'}
                alt = 'background image'
            />
            <ScheduleFormStyle noValidate>
                <ScheduleFormInputsWrapper>
                    <ScheduleGroupRadio
                        groupArray = {NORMAL_GROUPS}
                        groupType = {NORMAL}
                        content = 'Grupa główna'
                    />
                    <ScheduleGroupRadio
                        groupArray = {ENG_GROUPS}
                        groupType = {ENGLISH}
                        content = 'Grupa Język Angielski'
                    />
                    <ScheduleGroupRadio
                        groupArray = {SK_GROUPS}
                        groupType = {SK}
                        content = 'Grupa Sieci Komputerowe'
                    />
                </ScheduleFormInputsWrapper>
                <ScheduleFormButtons/>
            </ScheduleFormStyle>
        </ScheduleFormContainer>
    );
};

export default ScheduleForm;