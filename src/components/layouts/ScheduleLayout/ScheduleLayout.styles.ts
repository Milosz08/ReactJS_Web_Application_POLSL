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
import { FaCalendarTimes, FaChevronDown } from 'react-icons/all';

import { a_rs, button_rs } from '../../../styles/reset.styles';
import { DefaultButton } from '../../../styles/mixins.styles';

export const ScheduleLayoutContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--lightGray);
    @media only screen and (max-width: 1250px) {
        margin-top: 40px;
    }
`;

export const ScheduleLayoutWrapper = styled.article`
    display: flex;
    margin: 30px 0;
    width: 80%;
    max-width: 1600px;
    min-width: var(--widthVertical);
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        max-width: 100%;
        min-width: 100%;
    }
`;

export const ScheduleSingleDayColumnContainer = styled.div`
    width: 20%;
    margin: 0 10px;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px 40px 30px;
    }
`;

export const ScheduleSingleDayIndicator = styled('header')<{ ifActive: boolean }>`
    display: flex;
    padding: 30px 0;
    background-color: var(${props => props.ifActive ? '--orangeColor' : '--navyBlueColor'});
    color: var(--cleanWhiteColor);
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    line-height: 1;
    font-size: 1.7rem;
    font-weight: 400;
    border-radius: 10px;
`;

export const ScheduleSingleDayEndingSeparator = styled('aside')<{ ifActive: boolean, ifNonSchedule?: boolean }>`
    width: ${props => props.ifNonSchedule ? 20 : 100}%;
    height: 10px;
    border-radius: 10px;
    background-color: var(${props => props.ifActive ? '--orangeColor' : '--navyBlueColor'});
    margin: ${props => props.ifNonSchedule ? ' 0 10px' : '13px 0 0'};
`;

export const ScheduleSingleDayTileContainer = styled('div')<{ ifActive: boolean, ifGrayscale: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 13px;
    padding: 15px;
    background-color: var(--cleanWhiteColor);
    border: 2px solid var(${props => props.ifActive ? '--orangeColor' : '--darkGrayTint3'});
    opacity: ${props => props.ifGrayscale ? .4 : 1};
    filter: ${props => props.ifGrayscale ? 'grayscale(1)' : 'none'};
    border-radius: 10px;
    transition: var(--transitionDuration);
`;

export const ScheduleSingleDayTileType = styled.p`
    text-transform: uppercase;
    font-size: 1rem;
    color: var(--darkGrayTint1);
`;

export const ScheduleSingleDayTileSubjectHeader = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    padding: 10px 20px;
    color: var(--darkBlueColor);
`;

export const ScheduleSingleDayTileSeparatorContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    color: var(--darkGrayTint1);
    margin: 10px 0;
`;

export const ScheduleSingleDayTileSeparatorLine = styled.span`
    background-color: var(--darkGrayTint1);
    flex-grow: 1;
    height: 1px;
    width: 100%
`;

export const ScheduleSingleDayTileSeparatorIconWrapper = styled.div`
    margin: 0 10px;
    font-size: .9rem;
`;

export const ScheduleExpandedPanelButtonStyle = styled(button_rs)`
    width: 100%;
    height: 30px;
    margin-top: 10px;
    &:hover * {
        transition: var(--transitionDuration);
        color: var(--orangeColor);
    }
`;

export const ScheduleExpandedPanelIcon = styled(FaChevronDown)<{ $ifActive: boolean }>`
    font-size: 1.3rem;
    color: var(--darkBlueColor);
    transition: var(--transitionDuration);
    transform: rotate(${props => props.$ifActive ? '180deg' : 0});
    transform-origin: center;
`;

export const ScheduleExpandedPanelContainer = styled('div')<{ ifActive: boolean }>`
    overflow-y: hidden;
    margin: ${props => props.ifActive ? '10px 0' : 0};
    max-height: ${props => props.ifActive ? '300px' : 0};
    transition: .5s;
    text-align: center;
`;

export const ScheduleExpandedPanelInfo = styled.div`
    font-size: 1.1rem;
    color: var(--darkBlueColor);
    margin: 10px 0 30px 0;
    font-weight: 500;
    span {
        text-transform: capitalize;
    }
    strong {
        color: var(--orangeColor);
        font-weight: 500;
    }
`;

export const ScheduleExpandedPanelRoomContainer = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
`;

export const ScheduleExpandedPanelPzeAnchor = styled(a_rs)`
    ${DefaultButton({ _fontSize: '1rem', _fontWeight: 400, _ifEmpty: false })};
    padding: 10px 20px 12px;
    display: inline-block;
    width: 100%;
`;

export const ScheduleExpandedPanelInnerRouter = styled.div`
    ${DefaultButton({ _fontSize: '1rem', _fontWeight: 500, _ifEmpty: true })};
    padding: 10px 20px 12px;
    margin-top: 15px;
    display: inline-block;
    width: 100%;
`;

export const ScheduleSummerBreakSingleDayWrapper = styled('header')<{ ifActive: boolean }>`
    display: flex;
    width: 20%;
    margin: 0 10px;
    padding: 30px 0;
    background-color: var(${props => props.ifActive ? '--orangeColor' : '--navyBlueColor'});
    color: var(--cleanWhiteColor);
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    line-height: 1;
    font-size: 1.7rem;
    font-weight: 400;
    border-radius: 10px;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px 40px 30px;
    }
`;

export const ScheduleSummerBreakHeadersWrapper = styled('div')<{ ifNonSchedule?: boolean }>`
    display: flex;
    margin:  ${props => props.ifNonSchedule ? '15px 0' : '30px 0 15px'};
    max-width: 1600px;
    min-width: var(--widthVertical);
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const ScheduleSummerBreakMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    width: 80%;
    max-width: 1600px;
    min-width: var(--widthVertical);
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        max-width: 100%;
        min-width: 100%;
    }
`;

export const ScheduleSummerBreakContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    border: 2px solid var(--darkGrayTint3);
    background-color: var(--cleanWhiteColor);
    color: var(--navyBlueColor);
    border-radius: 10px;
    padding: 50px 0;
    @media only screen and (max-width: 1250px) {
        margin: 0 30px;
        padding: 50px 30px;
    }
`;

export const NoCalendarIconStyles = styled(FaCalendarTimes)`
    font-size: 4rem;
`;

export const NoCalendarHeader = styled.h3`
    font-size: 2rem;
    font-weight: 500;
    padding: 15px 0;
`;

export const NoCalendarAlternativeText = styled.p`
    color: var(--darkGrayTint2);
    max-width: 500px;
    text-align: center;
    font-size: 1.2rem;
`;