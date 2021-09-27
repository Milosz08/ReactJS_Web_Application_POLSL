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

import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * @details Interface of object types captured from the database. Interface exported to the main page
 *          (MainStoreProvider) that stores in the object all the data downloaded from the API.
 */
interface MainStoreStateProvider {
    covidData: {
        _id: string,
        description: string,
        actualRiskNumber: number,
        __v: number
    }[];
    footerForms: {
        _id: string,
        userIdentity: string,
        userChoice: string,
        userMessage: string,
        sendDate: {
            fullDate: string,
            fullTime: string
        }, __v: number
    }[];
    subjectsData: {
        _id: string,
        semesters: string[],
        departments: string[],
        icon: IconProp,
        ifEnd: boolean;
        classesPlatforms: {
            type: string,
            place: string,
            link: string
        }[],
        title: string,
        __v: number
    }[];
    scheduleSubjects: {
        _id: string,
        title: string,
        group: string,
        day: string,
        type: string,
        start: string,
        end: string,
        pzeInfo: {
            platform: string,
            pzeLink: string
        }
    }[];
    calendarRecords: {
        day: number,
        month: number,
        year: number,
        items: {
            start: string,
            message: string,
            importantLevel: string
        }[]
    }[];
}

export default MainStoreStateProvider;