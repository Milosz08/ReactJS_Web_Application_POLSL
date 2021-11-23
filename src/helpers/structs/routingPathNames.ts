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

export interface RoutingTypes {
    [pathNames: string]: string;
}

/**
 * Constant prefix on every PATH name constant.
 */
const _DEFAULT_PREFIX: string = 'Informatyka | ';
const _CMS_PREFIX: string = 'Panel CMS | ';

/**
 * An object that stores all dependencies related to title names while
 * rendering subsequent page componentsAndMiddleware.
 */
const ROUTING_PATH_NAMES: RoutingTypes = {

    START_PAGE: `${_DEFAULT_PREFIX}Wydział Elektryczny Politechniki Śląskiej`,
    SCHEDULE_PAGE: `${_DEFAULT_PREFIX}Interaktywny Plan Zajęć`,
    CALENDAR_PAGE: `${_DEFAULT_PREFIX}Kalendarz Studenta`,
    AISD_PAGE: `${_DEFAULT_PREFIX}Pomoce Naukowe`,
    LOGIN_PAGE: `${_DEFAULT_PREFIX}Logowanie do Systemu`,
    CMS_LOGIN_PAGE: `${_DEFAULT_PREFIX}Logowanie do Panelu WCMS`,
    CMS_PANEL_PAGE: `${_DEFAULT_PREFIX}Panel Administratora`,
    COOKIES_POLICY: `${_DEFAULT_PREFIX}Polityka Prywatności`,
    SUBJECT_PASS_PAGE: `${_DEFAULT_PREFIX}Przedmioty i Zaliczenia`,

    COVID_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Zagrożenia Covid 19`,
    SUBJECT_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Przedmioty`,
    SCHEDULE_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Plan Zajęć`,
    CALENDAR_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Kalendarz`,
    USERS_MESS_CMS_PAGE: `${_CMS_PREFIX}Wiadomości Użytkowników`,
    HELPS_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Pomoce Naukowe`,
    CONTENT_CMS_PAGE: `${_CMS_PREFIX}Modyfikuj Wpisy`,

} as const;

export default ROUTING_PATH_NAMES;