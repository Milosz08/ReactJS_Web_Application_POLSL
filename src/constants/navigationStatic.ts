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

import { IconName } from '@fortawesome/fontawesome-svg-core';

/**
 * Interface that defines the data types in the object.
 */
export interface StaticNavTypes {
    icon: IconName;
    alt: string;
}

/**
 * @details An object representing each navigation element.
 */
const STATIC_NAV: StaticNavTypes[] = [
    {
        icon: 'home',
        alt: 'Przejź do głównej zakładki',
    },
    {
        icon: 'virus',
        alt: 'Przejź do ustawień informacji o Covid-19',
    },
    {
        icon: 'chalkboard',
        alt: 'Przejź do ustawień zarządzania przedmiotami',
    },
    {
        icon: 'clock',
        alt: 'Przejź do zarządzania planem zajęć',
    },
    {
        icon: 'calendar-alt',
        alt: 'Przejdź do zarządzania wpisami do kalendarza',
    },
    {
        icon: 'envelope',
        alt: 'Przejdź do zarządzania wiadomościami użytkowników',
    },
];

export default STATIC_NAV;