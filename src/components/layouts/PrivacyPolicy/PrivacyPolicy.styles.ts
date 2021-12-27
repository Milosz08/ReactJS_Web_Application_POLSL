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

export const PrivacyPolicyContainer = styled.section`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const PrivacyPolicyWrapper = styled.div`
    position: relative;
    width: var(--widthVertical);
    margin-top: 200px;
    @media only screen and (max-width: 1250px) {
        width: 100%;
        margin-top: 110px;
    }
`;

export const PrivacyPolicyHeaderContainer = styled.header`
    margin-bottom: 60px;
`;

export const PrivacyPolicyTextContent = styled.article`
    font-size: 1.3rem;
    color: var(--lightBlack);
`;

export const PrivacyPolicyListContainer = styled.ul`
    margin-left: 25px;
`;

export const PrivacyPolicyUnorderedListElement = styled.li`
    font-size: 1.3rem;
    padding: 6px 0;
    color: var(--lightBlack);
    strong {
        font-weight: 500;
        color: var(--darkBlueColor);
    }
`;

export const PrivacyPolicySectionSign = styled.span`
    font-size: 2.3rem;
    margin-right: 20px;
    color: var(--orangeColor);
    font-weight: 500;
    @media only screen and (max-width: 1250px) {
        display: flex;
        min-width: 50px;
    }
`;

export const PrivacyPolicyListHeader = styled.h3`
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1;
    color: var(--darkBlueColor);
    margin-bottom: 30px;
`;

export const PrivacyPolicyHeaderSeparator = styled.aside`
    flex-grow: 1;
    height: 1px;
    background-color: var(--darkGrayTint1);
    margin-left: 30px;
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const PrivacyPolicyExternalAnchor = styled(a_rs)`
    color: var(--navyBlueColor)
`;

export const PrivacyPolicyExternalAnchorIcon = styled(FiExternalLink)`
    position: relative;
    top: 1px;
    margin-left: 5px;
    font-size: 1.1rem;
`;

export const PrivacyPolicyAsideParagraphIcon = styled.div`
    position: absolute;
    z-index: -1;
    right: 0;
    top: 50px;
    line-height: .8;
    font-size: 50em;
    color: var(--lightGrayTint1);
`;