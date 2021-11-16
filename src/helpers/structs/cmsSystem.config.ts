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

export interface StaticNavTypes {
    icon: string;
    alt: string;
}

export const RANGS_NAMES: string[] = [
    'Niezdefiniowany', 'Użytkownik', 'Moderator', 'Administrator'
];

export const STATIC_NAV: StaticNavTypes[] = [
    {
        icon: 'FaHome',
        alt: 'Przejź do głównej zakładki',
    },
    {
        icon: 'FaVirus',
        alt: 'Przejź do ustawień informacji o Covid-19',
    },
    {
        icon: 'FaChalkboard',
        alt: 'Przejź do ustawień zarządzania przedmiotami',
    },
    {
        icon: 'FaClock',
        alt: 'Przejź do zarządzania planem zajęć',
    },
    {
        icon: 'FaCalendarAlt',
        alt: 'Przejdź do zarządzania wpisami do kalendarza',
    },
    {
        icon: 'FaEnvelope',
        alt: 'Przejdź do zarządzania wiadomościami użytkowników',
    },
];