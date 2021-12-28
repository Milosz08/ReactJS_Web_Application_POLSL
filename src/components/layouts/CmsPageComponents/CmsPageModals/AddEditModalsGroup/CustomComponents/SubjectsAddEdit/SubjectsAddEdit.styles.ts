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

import styled, { css } from 'styled-components';

import { BorderWithPseudoElement } from '../../../../../../../styles/mixins.styles';

const AllSingleModalElementsBorder = (_content: string, _ifError: boolean) => css`
    ${BorderWithPseudoElement({
        _color: _ifError ? 'var(--redColor)' : 'var(--darkGrayTint2)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: _content,
        _fontSize: '1rem',
        _fontWeight: 400
    })};
    margin-top: 30px;
    ::before {
        top: -11px;
        text-transform: uppercase;
    }
    @media only screen and (max-width: 677px) {
        margin: 30px 0 0;
    }
`;

export const SubjectSingleModalAutoGrowElement = styled.div`
    flex-grow: 1;
    flex-basis: 55%;
`;

export const SemestersStatusAndDepartmentsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    @media only screen and (max-width: 677px) {
        width: 100%;
    }
`;

export const SemestersAndStatusWrapper = styled.div`
    width: 40%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 1250px) {
        width: 100%;
        margin-right: 0;
    }
`;

export const SemestersElementsWrapper = styled('div')<{ $ifError: boolean }>`
    ${({ $ifError }) => AllSingleModalElementsBorder('semestry', $ifError)};
    display: flex;
    flex-wrap: wrap;
    flex: 1;
`;

export const SingleSemesterElementWrapper = styled.div`
    margin-right: 20px;
`;

export const StatusElementsWrapper = styled.div`
    ${AllSingleModalElementsBorder('status', false)};
    display: flex;
    justify-content: space-around;
    flex: 1;
`;

export const DepartmentsElementsWrapper = styled.div`
    ${AllSingleModalElementsBorder('wydziały', false)};
    flex-grow: 1;
`;

export const SubjectsTypesElementsWrapper = styled.div`
    ${AllSingleModalElementsBorder('typy zajęć', false)};
    width: calc(100% - 40px);
    @media only screen and (max-width: 677px) {
        width: 100%;
    }
`;

export const SubjectSingleListElementContainer = styled('div')<{ disableFlex?: boolean }>`
    margin-top: 10px;
    display: ${({ disableFlex }) => disableFlex ? 'block' : 'flex'};
    width: 100%;
`;

export const SubjectSingleListTitleAndShortWrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
`;

export const SubjectSingleListElementWrapper = styled('div')<{ widthCSS?: string, extraMargin?: boolean }>`
    flex-grow: 1;
    margin-top: ${({ extraMargin }) => extraMargin ? '10px' : 0};
`;