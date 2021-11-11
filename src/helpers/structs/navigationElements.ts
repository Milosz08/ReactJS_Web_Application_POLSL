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

import { FRONT_ENDPOINTS } from './appEndpoints';

interface PropsProvider {
    readonly TOP_NAVBAR_ELMS: {
        readonly [name: string]: string;
    }[];
    readonly SITES: {
        readonly path: FRONT_ENDPOINTS;
        readonly title: string;
        readonly description: string;
    }[];
}

const NAVIGATION_ELEMENTS: PropsProvider = {
    TOP_NAVBAR_ELMS: [
        {
            title: 'Politechnika Śląska',
            link: 'https://www.polsl.pl/',
        },
        {
            title: 'Strona wydziału Elektrycznego',
            link: 'https://www.elektr.polsl.pl/',
        },
        {
            title: 'Poczta POLSL',
            link: 'https://outlook.office.com/mail/inbox',
        },
        {
            title: 'Pełny plan zajęć',
            link: 'https://plan.polsl.pl/',
        },
        {
            title: 'Platforma Zdalnej Edukacji',
            link: 'https://platforma.polsl.pl/re/',
        },
        {
            title: 'USOS',
            link: 'https://usoscas.polsl.pl/cas/login',
        },
    ],
    SITES: [
        {
            path: FRONT_ENDPOINTS.SCHEDULE,
            title: 'Interaktywny plan zajęć',
            description: 'Przejrzysty i interaktywny harmonogram spotkań dopasowany do konkretnej grupy.',
        },
        {
            path: FRONT_ENDPOINTS.CALENDAR,
            title: 'Kalendarz studenta',
            description: 'Nowoczesny kalendarz z najważniejszymi datami zaliczeń i dni wolnych od nauki.',
        },
        {
            path: FRONT_ENDPOINTS.TERMS,
            title: 'Przedmioty i zaliczenia',
            description: 'Szczegółowy opis przedmiotu i wymagań niezbędnych do jego zaliczenia.',
        },
        {
            path: FRONT_ENDPOINTS.HELPS,
            title: 'Pomoce naukowe',
            description: 'Pod tym linkiem znajdziesz pomoce do nauki obejmujące autorskie materiały z zajęć.',
        },
    ],
};

export default NAVIGATION_ELEMENTS;