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
import { a_rs } from '../../../styles/reset.styles';
import { FiExternalLink } from 'react-icons/all';

import {
    BorderWithPseudoElement, StandardContainer, StandardSafetyAreaWrapperWithTopMargin
} from '../../../styles/mixins.styles';

export const ScheduleTypeManagementContainer = styled.section`
    ${StandardContainer()};
    margin-bottom: 40px;
`;

export const ScheduleTypeManagementWrapper = styled.article`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    @media only screen and (max-width: 1250px) {
        margin-top: 160px;
    }
    @media only screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const ScheduleManagementCookiesInfoContainer = styled.div`
    ${BorderWithPseudoElement({
        _color: 'var(--redColor)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: 'Uwaga',
        _fontSize: '1.2rem',
        _fontWeight: 500
    })};
    font-size: 1.2rem;
    color: var(--redColor);
    font-weight: 400;
`;

export const ScheduleManagementCookiesInfoAnchor = styled(a_rs)`
    font-weight: 500;
`;

export const OuterLinkIcon = styled(FiExternalLink)`
    display: inline-block;
    position: relative;
    top: 1px;
    margin-left: 4px;
    font-size: 1rem;
`;