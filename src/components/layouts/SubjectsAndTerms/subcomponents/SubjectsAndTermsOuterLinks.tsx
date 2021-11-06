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

import * as React from 'react';

import {
    SubjectsAndTermsExcelIcon, SubjectsAndTermsOuterLinkAnchor, SubjectsAndTermsOuterLinksContainer, SubjectsAndTermsZipIcon
} from '../SubjectsAndTerms.styles';

/**
 * Component responsible for generate all outer servers files downloads links.
 */
const SubjectsAndTermsOuterLinks: React.FC = (): JSX.Element => (
    <SubjectsAndTermsOuterLinksContainer>
        <SubjectsAndTermsOuterLinkAnchor
            href = 'https://www.elektr.polsl.pl/images/files/szjk/karty/2020/Karty_I_ST_1-2019.zip'
        >
            Karty przedmiotów
            <SubjectsAndTermsZipIcon/>
        </SubjectsAndTermsOuterLinkAnchor>
        <SubjectsAndTermsOuterLinkAnchor
            href = 'https://www.elektr.polsl.pl/images/files/szjk/karty/2018/Karty_I_ST_1.zip'
        >
            Karty przedmiotów (stare)
            <SubjectsAndTermsZipIcon/>
        </SubjectsAndTermsOuterLinkAnchor>
        <SubjectsAndTermsOuterLinkAnchor
            href = 'https://www.elektr.polsl.pl/images/files/szjk/plany/2019/Plan_I_st_stacjonarne_Ist_2019-2020.xls'
        >
            Plan studiów
            <SubjectsAndTermsExcelIcon/>
        </SubjectsAndTermsOuterLinkAnchor>
    </SubjectsAndTermsOuterLinksContainer>
);

export default SubjectsAndTermsOuterLinks;