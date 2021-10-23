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
import { a_rs, ul_rs } from '../../../styles/reset.styles';

export const FooterContainer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: var(--lightGray);
    font-size: 1rem;
`;

export const MainFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: var(--widthVertical);
    margin: 60px 0;
    @media only screen and (max-width: 1250px) {
        margin: 60px 30px;
        width: calc(100% - 60px);
    }
    @media only screen and (max-width: 966px) {
        flex-direction: column;
    }
`;

export const MainFooterLeftSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media only screen and (max-width: 1250px) {
        justify-content: space-around;
    }
    @media only screen and (max-width: 966px) {
        padding-bottom: 40px;
    }
    @media only screen and (max-width: 600px) {
        justify-content: center;
    }
`;

export const FooterLinksContainer = styled('div')<{ ifInnerLinks?: boolean }>`
    font-size: 1.1rem;
    padding-right: 170px;
    @media only screen and (max-width: 1250px) {
        padding-right: 0;
    }
    @media only screen and (max-width: 600px) {
        flex-basis: 100%;
        margin-top: ${props => props.ifInnerLinks ? '50px' : 0}
    }
`;

export const FooterHeadling = styled.h3`
    font-weight: 500;
    color: var(--lightBlack);
    margin-bottom: 15px;
    height: 30px;
    width: 100%;
`;

export const FooterLinksUnorderedList = styled(ul_rs)``;

export const SingleFooterLinkElement = styled.li`
    color: var(--darkGray);
    line-height: 1.8;
    font-weight: 300;
    width: fit-content;
    :hover {
        color: var(--navyBlueColor);
        text-decoration: underline;
    }
`;

export const FooterExternalLink = styled(a_rs)``;

export const FooterFormContainer = styled.div`
    display: flex;
    min-width: 360px;
    flex-direction: column;
    @media only screen and (max-width: 966px) {
        margin-top: 30px;
        min-width: 100%;
    }
`;

export const CopyrightFooterContainer = styled.div`
    flex-basis: 100%;
    background-color: var(--cleanWhiteColor);
    padding: 40px 0;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 1250px) {
        padding: 20px 0;
    }
    @media only screen and (max-width: 966px) {
        padding: 20px 0;
    }
    @media only screen and (max-width: 500px) {
        padding: 20px 0 70px;
    }
`;

export const CopyrightFooterWrapper = styled.div`
    width: 100%;
    max-width: 1900px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media only screen and (max-width: 1250px) {
        flex-wrap: wrap;
        justify-content: center;
    }
    @media only screen and (max-width: 966px) {
        flex-wrap: wrap;
    }
`;

export const CopyrightFooterSingleSection = styled.div`
    color: var(--darkGray);
    flex-basis: calc(100% / 3);
    text-align: center;
    div[role = 'link'] {
        display: inline-block;
        color: var(--lightBlack);
        font-weight: 500;
    }
    @media only screen and (max-width: 1250px) {
        flex-basis: 50%;
        margin: 10px 0;
    }
    @media only screen and (max-width: 966px) {
        flex-basis: 100%;
    }
`;

export const CopyrightFooterSectionAnchor = styled(a_rs)`
    font-weight: 500;
    color: var(--lightBlack);
    margin-left: 6px;
`;

export const DisclaimerFooterContainer = styled.div`
    flex-basis: 100%;
    margin: 60px 100px 0 0;
    div[role = 'link'] {
        display: inline-block;
        margin-top: 30px;
        color: var(--lightBlack);
        text-decoration: underline;
    }
    @media only screen and (max-width: 966px) {
        margin: 60px 0 0 0;
    }
`;

export const IconNormalisedWrapper = styled.div`
    position: relative;
    display: inline-block;
    top: 2px;
    margin: 0 7px;
`;

export const SectionSeparator = styled.aside`
    height: 1px;
    background-color: var(--darkGrayTint2);
`;

export const DisclaimerTextInfo = styled.div`
    padding-top: 20px;
    color: var(--darkGray);
`;