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

import styled from 'styled-components';
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/all';

import { a_rs } from '../../../styles/reset.styles';
import { DefaultButton } from '../../../styles/mixins.styles';

export const SubjectsAndTermsContainer = styled.div`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const SubjectsAndTermsWrapper = styled.div`
    position: relative;
    width: var(--widthVertical);
    margin-top: 230px;
    @media only screen and (max-width: 1250px) {
        width: 100%;
        margin-top: 150px;
    }
`;

export const SubjectsAndTermsParagraph = styled.p`
    font-size: 1.2rem;
    color: var(--navyBlueColor);
    font-weight: 500;
`;

export const SubjectsAndTermsOuterLinksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

export const SubjectsAndTermsOuterLinkAnchor = styled(a_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    margin: 20px 20px 0;
    @media only screen and (max-width: 620px) {
        width: 100%;
        text-align: center;
    }
`;

export const SubjectsAndTermsZipIcon = styled(AiOutlineFileZip)`
    position: relative;
    top: 2px;
    margin-left: 5px;
`;

export const SubjectsAndTermsExcelIcon = styled(AiOutlineFileExcel)`
    position: relative;
    top: 2px;
    margin-left: 5px;
`;