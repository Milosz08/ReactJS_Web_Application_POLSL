/**
 * @file navigationStatic.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/18/2021
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