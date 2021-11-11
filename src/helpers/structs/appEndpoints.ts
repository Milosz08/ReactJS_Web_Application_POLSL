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

export enum FRONT_ENDPOINTS {
    ABSOLUTE = '/',
    SCHEDULE = '/interaktywny-plan-zajęć',
    CALENDAR = '/kalendarz-studenta',
    TERMS = '/warunki-zaliczenia-przedmiotów',
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
    SUBJECTS_ELMS = '/subjects-data'
}