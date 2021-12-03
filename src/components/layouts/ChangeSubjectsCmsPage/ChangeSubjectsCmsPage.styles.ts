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
import { button_rs, ul_rs } from '../../../styles/reset.styles';

export const ChangeSubjectsCmsPageContainer = styled.section`
    width: calc(100% - 60px);
    margin: 0 30px;
`;

export const ChangeSubjectsHeaderContainer = styled.header`
    display: flex;
    font-weight: 500;
    padding: 15px;
    color: var(--lightBlack);
    font-size: 1rem;
    text-transform: uppercase;
`;

export const ChangeSubjectsIdElement = styled('div')<{ ifNotHeader?: boolean }>`
    color: var(${({ ifNotHeader }) => ifNotHeader ? '--darkGrayTint1' : 'inherit'});
    flex-basis: 60px;
`;

export const ChangeSubjectsTitleElement = styled.div`
    flex-grow: 1;
`;

export const ChangeSubjectsSemesterElement = styled.div`
    flex-basis: 220px;
`;

export const ChangeSubjectsStatusElement = styled('div')<{ ifNotHeader?: boolean, color?: string }>`
    color: var(${({ ifNotHeader, color }) => ifNotHeader ? `--${color}Color` : 'inherit'});
    flex-basis: ${({ ifNotHeader }) => ifNotHeader ? 210 : 310}px;
`;

export const ChangeSubjectsUnorderedList = styled(ul_rs)`
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const ChangeSubjectsUnorderedListElement = styled.li`
    display: flex;
    align-items: center;
    border: 1px solid var(--darkGrayTint3);
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 10px;
    min-height: 55px;
`;

export const ChangeSubjectSingleListButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-basis: 100px;
`;

export const ChangeSubjectSingleListEditButton = styled(button_rs)`
    display: flex;
    align-items: center;
    padding: 5px;
    color: var(--darkBlueColor);
`;

export const ChangeSubjectSingleListRemoveButton = styled(ChangeSubjectSingleListEditButton)``;

export const ChangeSubjectSingleListRemoveButtonTime = styled.span`
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    background-color: var(--redColor);
    transform: rotate(45deg);
    ::after {
        position: absolute;
        content: '';
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: var(--redColor);
        transform: translateX(-50%) rotate(90deg);
    }
`;