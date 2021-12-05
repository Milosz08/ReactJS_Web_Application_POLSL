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

import {
    CalendarContentTypes, CovidWarningsTypes, CurrentScheduleContentTypes, FooterFormTypes, HelpersLinksContentTypes,
    LastUpdateTypes, ScheduleContentTypes, SubjectsContentTypes
} from './dataTypes';

export interface ScheduleSubjectDays {
    [value: string]: ScheduleContentTypes[];
}

export interface ApiInitialTypes {
    footerFormMessages: FooterFormTypes[],
    covidWarningLevels: CovidWarningsTypes[];
    lastUpdate: LastUpdateTypes[];
    subjectsContent: SubjectsContentTypes[];
    scheduleContent: ScheduleSubjectDays;
    currentScheduleContent: {
        [value: string]: CurrentScheduleContentTypes[];
    };
    calendarContent: CalendarContentTypes[];
    helpersLinks: HelpersLinksContentTypes[];
    summerBreakActive: boolean;
}

export const apiInitialState: ApiInitialTypes = {
    footerFormMessages: [],
    covidWarningLevels: [],
    lastUpdate: [],
    subjectsContent: [],
    scheduleContent: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    },
    currentScheduleContent: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    },
    calendarContent: [],
    helpersLinks: [],
    summerBreakActive: false,
};