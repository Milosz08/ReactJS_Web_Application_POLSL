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

import { IconFamiliesType } from '../componentsAndMiddleware/IconComponent';

export interface TilesDataTypes {
    title: string;
    link: string;
    icon: {
        family: string;
        name: string;
    };
}

/**
 * An object representing each tiles element.
 */
const TILES_DATA: TilesDataTypes[] = [
    {
        title: 'Skrypt Teoria Układów Cyfrowych Laboratoria',
        link: 'https://delibra-1bg-1polsl-1pl-1n1joo8a20250.han.polsl.pl/dlibra/publication/80918/edition/72033/content',
        icon: {
            family: IconFamiliesType.VSCodeIcons,
            name: 'VscBook'
        }
    },
    {
        title: 'Skrypt Elektronika i Miernictwo Laboratoria',
        link: 'https://delibra-1bg-1polsl-1pl-1n1joo8a20250.han.polsl.pl/dlibra/publication/79989/edition/71018/content',
        icon: {
            family: IconFamiliesType.VSCodeIcons,
            name: 'VscBook'
        }
    },
    {
        title: 'Grupa MS Teams',
        link: 'https://teams.microsoft.com/l/team/19%3aUMGgtKGt9r1uF-vocetHPzvoU4CqDlY0gEAknZ3BIJ81%40thread.tacv2/conversations?groupId=beeca57e-2aa4-43f4-bc6c-89bfd727d12c&tenantId=ab840be7-206b-432c-bd22-4c20fdc1b261',
        icon: {
            family: IconFamiliesType.SimpleIcons,
            name: 'SiMicrosoftteams'
        }
    },
    {
        title: 'Grupa Facebook',
        link: 'https://www.facebook.com/groups/3622273614473972',
        icon: {
            family: IconFamiliesType.SimpleIcons,
            name: 'SiFacebook'
        }
    },
    {
        title: 'Grupa Discord',
        link: 'https://discord.gg/wkJG8uaYPx',
        icon: {
            family: IconFamiliesType.SimpleIcons,
            name: 'SiDiscord'
        }
    },
    {
        title: 'Dysk I semestr',
        link: 'https://mega.nz/folder/hjwCFC4A#K3bnSBoMNK30bcQCNbP0Dw',
        icon: {
            family: IconFamiliesType.SimpleIcons,
            name: 'SiMega'
        }
    },
    {
        title: 'Dysk własne materiały',
        link: 'https://mega.nz/folder/QiwEXSJK#btpZcXAhqPX4MjKh3mAngQ',
        icon: {
            family: IconFamiliesType.SimpleIcons,
            name: 'SiMega'
        }
    },
];

export default TILES_DATA;