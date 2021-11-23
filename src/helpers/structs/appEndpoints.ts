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

import { BsBookmarkCheck, BsCalendar, BsChatDots, BsClipboard, BsLightning } from 'react-icons/all';

export enum FRONT_ENDPOINTS {
    ABSOLUTE = '/',
    SCHEDULE = '/interaktywny-plan-zajęć',
    CALENDAR = '/kalendarz-studenta',
    TERMS = '/przedmioty-i-zaliczenia',
    HELPS = '/pomoce-naukowe',
    ADMIN_LOGIN = '/logowanie-do-systemu',
    ADMIN_PANEL = '/system-zarządzania-treścią',
    PRIVACY_POLICY = '/polityka-prywatności'
}

export enum API_ENDPOINTS {
    ABSOLUTE = '/',
    FOOTER_FORM = '/footer-form',
    COVID_WARNINGS = '/covid-data',
    LAST_UPDATE = '/last-update',
    SUBJECTS_ELMS = '/subject-data',
    SCHEDULE_SUBJECTS = '/schedule-subjects',
    CALENDAR_RECORDS = '/calendar',
    AUTHENTICATIONS = '/authentications',
}

export const CMS_ENDPOINTS = [
    {
        path: '/modyfikuj-zagrożenia-covid',
        icon: 'BsShield',
        title: 'Ograniczenia Covid 19',
        description: 'Przejdź, aby zmodyfikować aktualne ograniczenia związane z wirusem Sars-Cov-2.',
    },
    {
        path: '/modyfikuj-przedmioty',
        icon: 'BsBookmarkCheck',
        title: 'Przedmioty',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować przedmiot.',
    },
    {
        path: '/modyfikuj-plan-zajęć',
        icon: 'BsClipboard',
        title: 'Plan Zajęć',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować plan zajęć.',
    },
    {
        path: '/modyfikuj-kalendarz',
        icon: 'BsCalendar',
        title: 'Kalendarz',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować wpis w kalendarzu.',
    },
    {
        path: '/wiadomości-użytkowników',
        icon: 'BsEnvelope',
        title: 'Skrzynka',
        description: 'Przejdź, aby przejrzeć lub usunąć wiadomość od użytkownika.',
    },
    {
        path: '/modyfikuj-pomoce-naukowe',
        icon: 'BsDownload',
        title: 'Pomoce Naukowe',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować linki do pomocy naukowych.',
    },
    {
        path: '/modyfikuj-wpisy',
        icon: 'BsFiles',
        title: 'Wpisy z Aktualnościami',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować wpisy z aktualnościami.',
    },
] as const;