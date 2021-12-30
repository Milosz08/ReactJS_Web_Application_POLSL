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
import { BorderWithPseudoElement } from '../../../../../../../styles/mixins.styles';

export const ScheduleSelectSubjectTitleContainer = styled.div`
    display: flex;
    width: 100%;
    label {
        width: 100%;
    }
`;

export const ScheduleGroupTypeAndRoomContainer = styled.div`
    ${BorderWithPseudoElement({
        _color: 'var(--darkGrayTint2)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: 'parametry przedmiotu',
        _fontSize: '1rem',
        _fontWeight: 400
    })};
    margin: 30px 10px 0 0;
    width: calc(100% - 10px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    ::before {
        top: -11px;
        text-transform: uppercase;
    }
    @media only screen and (max-width: 1160px) {
        flex-direction: column;
        height: 300px;
        justify-content: space-between;
        label {
            margin-right: 0;
            margin-bottom: 10px;
        }
    }
    @media only screen and (max-width: 531px) {
        margin-right: 0;
        width: 100%;
    }
`;

export const StartAndEndTimeScheduleSubjectContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 10px;
    @media only screen and (max-width: 1160px) {
        justify-content: center;
        margin-left: 0;
    }
    @media only screen and (max-width: 555px) {
        justify-content: space-between;
        width: 100%;
    }
`;

export const StartAndEndAsideTextContent = styled.div`
    font-size: 1.4rem;
    margin: 0 10px;
    color: var(--navyBlueColor);
    font-weight: 500;
    @media only screen and (max-width: 555px) {
        display: none;
    }
`;

export const DisabledBackgroundElement = styled('div')<{ $ifVisible: boolean }>`
    position: absolute;
    display: ${({ $ifVisible }) => $ifVisible ? 'block' : 'none'};
    z-index: 3;
    border-radius: 10px;
    width: 100%;
    height: calc(100% - 10px);
    top: 10px;
    left: 0;
    background-color: rgba(255, 255, 255, .5);
`;