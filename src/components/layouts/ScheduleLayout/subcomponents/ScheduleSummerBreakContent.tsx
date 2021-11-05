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

import {
    NoCalendarAlternativeText, NoCalendarHeader, NoCalendarIconStyles, ScheduleSummerBreakContentContainer
} from '../ScheduleLayout.styles';

/**
 * Component responsible for generate content for schedule break (no schedule) preferences.
 */
const ScheduleSummerBreakContent: React.FC = (): JSX.Element => (
    <ScheduleSummerBreakContentContainer>
        <NoCalendarIconStyles/>
        <NoCalendarHeader>
            Brak zajęć
        </NoCalendarHeader>
        <NoCalendarAlternativeText>
            Jeśli widzisz ten komunikat mimo odbywanych zajęć, skontaktuj się z administratorem systemu.
        </NoCalendarAlternativeText>
    </ScheduleSummerBreakContentContainer>
);

export default ScheduleSummerBreakContent;