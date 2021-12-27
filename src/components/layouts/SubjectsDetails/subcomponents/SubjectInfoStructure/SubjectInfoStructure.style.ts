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
import { FiExternalLink } from 'react-icons/all';

import { DefaultButton } from '../../../../../styles/mixins.styles';
import { a_rs } from '../../../../../styles/reset.styles';

export const SingleSubjectIconSeparatorContainer = styled.aside`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: var(--darkGrayTint1);
    margin: 40px 0;
    width: 80%;
`;

export const SeparatorLine = styled.span`
    width: 50%;
    height: 1px;
    background-color: var(--darkGrayTint1);
`;

export const SeparatorIcon = styled.span`
    margin: 0 15px;
`;

export const SingleSubjectStatusContainer = styled.div`
    font-size: 1.5rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    text-align: center;
    @media only screen and (max-width: 715px) {
        font-size: 1.2rem;
    }
`;

export const StatusEndAndSemesterInfo = styled('p')<{ ifEnd: boolean, ifSemester?: boolean }>`
    span {
        display: inline;
        text-transform: uppercase;
        font-weight: ${props => props.ifSemester ? 600 : 'inherit'};
        color: var(${props => props.ifSemester ? '--navyBlueColor' : props.ifEnd ? '--greenColor' : '--redColor'});
    }
`;

export const ClassesPlatformInfoContainer = styled.div`
    font-size: 1.2rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    margin: 30px 0;
    line-height: 1.3;
`;

export const ClassesPlatformInfoSingleElement = styled.div`
    text-align: center;
    strong {
        color: var(--darkOrangeColor);
        font-weight: 500;
        text-transform: capitalize;
    }
`;

export const SingleSubjectNavigationButtonContainer = styled.div`
    font-size: 1.1rem;
    line-height: 1;
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin-top: 30px;
    @media only screen and (max-width: 772px) {
        flex-wrap: wrap;
        width: 100%;
    }
`;

export const SubjectsTermsLinkWrapper = styled.span`
    ${DefaultButton({ _fontSize: '1.1rem', _fontWeight: 500, _ifEmpty: true })};
    padding: 10px 20px 12px;
    @media only screen and (max-width: 772px) {
        margin: 10px;
        width: 100%;
        text-align: center;
    }
    @media only screen and (max-width: 715px) {
        font-size: 1rem;
    }
`;

export const PzePlatformLinkAnchor = styled(a_rs)`
    ${DefaultButton({ _fontSize: '1.1rem', _fontWeight: 400, _ifEmpty: false })};
    padding: 10px 20px 12px;
    @media only screen and (max-width: 772px) {
        margin: 10px;
        width: 100%;
        text-align: center;
    }
    @media only screen and (max-width: 715px) {
        font-size: 1rem;
    }
`;

export const ExternalIconLink = styled(FiExternalLink)`
    position: relative;
    top: 3px;
    margin-left: 8px;
    @media only screen and (max-width: 500px) {
        display: none;
    }
`;