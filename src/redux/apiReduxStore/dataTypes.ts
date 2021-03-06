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

import { covidTypes, updateSections } from './types';

export interface FooterFormTypes {
    _id: string;
    userIdentity: string;
    userChoice: string;
    userMessage: string;
    ifClicked: boolean;
    servletTime: {
        fullDate: string;
        fullTime: string;
    }
}

export interface CovidWarningsTypes {
    _id: string;
    description: string;
    type: covidTypes;
    actualRiskNumber: number;
}

export interface LastUpdateTypes {
    _id: string;
    updateDateFor: updateSections;
    servletTime: {
        fullDate: string;
        fullTime: string;
    }
}

export interface SubjectsContentTypes {
    _id: string;
    title: string;
    ifEnd: boolean;
    semesters: {
        identity: number;
        name: string;
    }[];
    departments: {
        title: string;
        shortName: string;
        link: string;
    }[];
    icon: {
        family: string;
        name: string;
    };
    classesPlatforms: {
        type: string;
        place: string;
        link: string;
    }[];
}

export interface ScheduleContentTypes {
    _id: string;
    title: string;
    day: number;
    group: string;
    startHour: string;
    endHour: string;
    room: string;
    classesInfo: {
        type: string;
        place: string;
        link: string;
    };
    icon: {
        family: string;
        name: string;
    };
}

export interface CalendarContentTypes {
    _id: string;
    day: number;
    month: number;
    year: number;
    items: {
        start: string;
        message: string;
        importantLevel: string;
    }[];
}

export interface CurrentScheduleContentTypes {
    title: string;
    room: string;
    classesInfo: {
        type: string;
        place: string;
        link: string;
    };
    icon: {
        family: string;
        name: string;
    };
    hours: {
        start: number;
        end: number;
        startHour: string;
        endHour: string;
    };
}

export interface HelpersLinksContentTypes {
    _id: string;
    helperTitle: string;
    helperLink: string;
    helperIcon: {
        family: string;
        name: string;
    }
}