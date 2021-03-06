/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

export interface GroupsStaticTypes {
    NORMAL_GROUPS: string[];
    ENG_GROUPS: string[];
    SK_GROUPS: string[];
    MERGE_SK_GROUPS: string[];
}

const GROUPS_STATIC: GroupsStaticTypes = {
    NORMAL_GROUPS: [
        'pierwsza', 'druga'
    ],
    ENG_GROUPS: [
        'b2a', 'b2b', 'c1'
    ],
    SK_GROUPS: [
        'pon', 'czw', 'pt'
    ],
    MERGE_SK_GROUPS: [
        'pierwsza, pon', 'pierwsza, pt', 'druga, pon', 'druga, czw', 'druga, pt'
    ]
};

export default GROUPS_STATIC;