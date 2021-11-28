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

import { updateSections } from '../../redux/apiReduxStore/types';

const { COVID, SUBJECTS, SCHEDULE, CALENDAR, HELPERS, BLOG_INJECTIONS, USER_MESS, AUTH } = updateSections;

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
    FOOTER_FORM = '/footer-form',
    COVID_WARNINGS = '/covid-data',
    LAST_UPDATE = '/last-update',
    SUBJECTS_ELMS = '/subject-data',
    SCHEDULE_SUBJECTS = '/schedule-subjects',
    CALENDAR_RECORDS = '/calendar',
    AUTHENTICATIONS = '/authentications',
    HELPERS_LINKS = '/helpers-links',
}

export interface CmsEndpointsTypes {
    [key: string]: string | updateSections;
}

export const CMS_ENDPOINTS: CmsEndpointsTypes[] = [
    {
        path: '/modyfikuj-zagrożenia-covid',
        icon: 'BsShield',
        type: COVID,
        title: 'Zagrożenia Covid 19',
        description: 'Przejdź, aby zmodyfikować aktualne ograniczenia związane z wirusem Sars-Cov-2.',
    },
    {
        path: '/modyfikuj-przedmioty',
        icon: 'BsBookmarkCheck',
        type: SUBJECTS,
        title: 'Przedmioty',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować przedmiot.',
    },
    {
        path: '/modyfikuj-plan-zajęć',
        icon: 'BsClipboard',
        type: SCHEDULE,
        title: 'Plan Zajęć',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować plan zajęć.',
    },
    {
        path: '/modyfikuj-kalendarz',
        icon: 'BsCalendar',
        type: CALENDAR,
        title: 'Kalendarz',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować wpis w kalendarzu.',
    },
    {
        path: '/wiadomości-użytkowników',
        icon: 'BsEnvelope',
        type: USER_MESS,
        title: 'Skrzynka',
        description: 'Przejdź, aby przejrzeć lub usunąć wiadomość od użytkownika.',
    },
    {
        path: '/modyfikuj-pomoce-naukowe',
        icon: 'BsDownload',
        type: HELPERS,
        title: 'Pomoce Naukowe',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować linki do pomocy naukowych.',
    },
    {
        path: '/modyfikuj-wpisy-redakcji',
        icon: 'BsFiles',
        type: BLOG_INJECTIONS,
        title: 'Wpisy z Aktualnościami',
        description: 'Przejdź, aby dodać, usunąć lub zmodyfikować wpisy z aktualnościami.',
    },
    {
        path: '/modyfikuj-dane-logowania',
        icon: 'BsPeople',
        type: AUTH,
        title: 'Dane logowania',
        description: 'Przejdź, aby zmienić dane logowania dla użytkowników i moderatorów.',
    },
];