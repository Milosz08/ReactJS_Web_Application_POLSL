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
import { BorderWithPseudoElement, StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';
import { a_rs } from '../../../styles/reset.styles';
import { BiBlanket } from 'react-icons/all';

export const CurrentSubjectActiveContainer = styled.section`
    ${StandardContainer()};
`;

export const CurrentSubjectActiveWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
`;

export const CurrentSubjectAllSubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CurrentSubjectAllSubjectWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 1006px) {
        width: 100%;
    }
`;

export const CurrentSubjectDuringSubjectContainer = styled.section`
    width: 100%;
    padding: 30px;
    position: relative;
    background-color: var(--navyBlueColor);
    border-radius: 10px;
    min-height: 120px;
    font-weight: 400;
    font-size: 1.1rem;
    color: var(--whiteColor);
    overflow: hidden;
    margin-top: 30px;
`;

export const CurrentSubjectDuringSubjectTitlesContent = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    @media only screen and (max-width: 1006px) {
        flex-direction: column;
    }
`;

export const CurrentSubjectDuringSubjectBackground = styled('aside').attrs<{ clockWidth: number }>(({ clockWidth }) => ({
   style: {
       width: `${clockWidth}%`
   }
}))<{ clockWidth: number }>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--darkBlueColor);
    z-index: 1;
    transition: var(--transitionDuration);
`;

export const CurrentSubjectDuringSubjectLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: fit-content;
    height: 100%;
    overflow: hidden;
    margin-right: 20px;
    @media only screen and (max-width: 1006px) {
        margin-right: 0;
        padding-bottom: 2px;
    }
`;

export const CurrentSubjectDuringSubjectRight = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    @media only screen and (max-width: 1006px) {
        padding-top: 10px;
        margin-left: 0;
    }
`;

export const CurrentSubjectDuringSubjectTitle = styled.header`
    font-size: 2rem;
    line-height: .8;
    @media only screen and (max-width: 666px) {
        font-size: 1.4rem;
    }
`;

export const CurrentSubjectDuringSubjectInfo = styled.div`
    margin-top: 13px;
`;

export const CurrentSubjectDuringSubjectPlatformAnchor = styled(a_rs)`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px;
    @media only screen and (max-width: 666px) {
        display: none;
    }
`;

export const CurrentSubjectDuringSubjectPlatformIcon = styled(BiBlanket)`
    font-size: 2.5rem;
`;

export const CurrentSubjectPrevAndNextContainer = styled.aside`
    display: flex;
    justify-content: center;
    width: 90%;
    min-height: 100px;
    background-color: var(--lightGrayTint1);
    color: var(--darkGrayTint1);
    border-radius: 10px;
    padding: 40px 30px 30px;
    transform: translateY(-15px);
    position: relative;
    z-index: -1;
    @media only screen and (max-width: 666px) {
        flex-direction: column;
    }
`;

export const CurrentSubjectPrevAndNextLeft = styled.div`
    position: relative;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    ::after {
        position: absolute;
        content: '';
        top: 0;
        margin-left: 10px;
        width: 2px;
        height: 100%;
        background-color: var(--darkGrayTint1);
        opacity: .8;
        border-radius: 10px;
    }
    @media only screen and (max-width: 666px) {
        ::after {
            left: -10px;
            top: 27px;
            width: 50px;
            height: 2px;
        }
    }
`;

export const CurrentSubjectPrevAndNextRight = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    @media only screen and (max-width: 666px) {
        margin-left: 0;
        padding-top: 20px;
    }
`;

export const CurrentSubjectPrevAndNextRightTitle = styled.header`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: .9;
`;

export const CurrentSubjectPrevAndNextRightInfo = styled.div`
    font-size: 1rem;
    margin-top: 8px;
`;

export const CurrentSubjectSeparateLine = styled.span`
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: var(--orangeColor);
    @media only screen and (max-width: 1006px) {
        width: 80px;
        height: 10px;
    }
`;

export const CurrentSubjectImportantInfoContainer = styled.div`
    ${BorderWithPseudoElement({
        _color: 'var(--redColor)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: 'Działanie',
        _fontSize: '1.2rem',
        _fontWeight: 500
    })};
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--redColor);
    margin-top: 50px;
`;