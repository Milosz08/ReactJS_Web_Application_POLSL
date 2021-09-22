/**
 * @file aidsTilesData.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/18/2021
 */

import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Interface that defines the data types in the object.
 */
export interface TilesDataTypes {
    title: string;
    link: string;
    icon: IconProp;
}

/**
 * @details An object representing each tiles element.
 */
const TILES_DATA: TilesDataTypes[] = [
    {
        title: 'Grupa MS Teams',
        link: 'https://teams.microsoft.com/l/team/19%3aUMGgtKGt9r1uF-vocetHPzvoU4CqDlY0gEAknZ3BIJ81%40thread.tacv2/conversations?groupId=beeca57e-2aa4-43f4-bc6c-89bfd727d12c&tenantId=ab840be7-206b-432c-bd22-4c20fdc1b261',
        icon: [ 'fas', 'user-friends' ],
    },
    {
        title: 'Grupa Facebook',
        link: 'https://www.facebook.com/groups/3622273614473972',
        icon: [ 'fab', 'facebook-square' ],
    },
    {
        title: 'Grupa Discord',
        link: 'https://discord.gg/wkJG8uaYPx',
        icon: [ 'fab', 'discord' ],
    },
    {
        title: 'Dysk I semestr',
        link: 'https://mega.nz/folder/hjwCFC4A#K3bnSBoMNK30bcQCNbP0Dw',
        icon: [ 'fas', 'database' ],
    },
    {
        title: 'Dysk własne materiały',
        link: 'https://mega.nz/folder/QiwEXSJK#btpZcXAhqPX4MjKh3mAngQ',
        icon: [ 'fas', 'database' ],
    },
];

export default TILES_DATA;