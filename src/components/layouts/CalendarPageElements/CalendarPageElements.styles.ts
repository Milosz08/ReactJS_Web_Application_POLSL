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
import { FaExclamation } from 'react-icons/all';

import { button_rs, ul_rs } from '../../../styles/reset.styles';
import { DefaultButton, StandardContainer, StandardSafetyAreaWrapperWithTopMargin } from '../../../styles/mixins.styles';

import { LEVELS } from '../../../helpers/structs/calendar.config';

export const CalendarPageElementsContainer = styled.section`
    ${StandardContainer()};
`;

export const CalendarPageElementsWrapper = styled.div`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    @media only screen and (max-width: 1250px) {
        margin-top: 150px;
        width: 100%;
    }
`;

export const CalendarPageLegendSpanElement = styled('span')<{ colorValue: string }>`
    display: inline;
    color: var(--cleanWhiteColor);
    background-color: var(--${props => props.colorValue});
    border-radius: 5px;
    font-weight: 400;
    margin-right: 6px;
    padding: 3px 10px 5px 10px;
    @media only screen and (max-width: 648px) {
        margin: 2px 10px 0 0;
        font-size: 0;
        height: 20px;
        border-radius: 50%;
    }
`;

export const CalendarPageLegendUnorderedList = styled(ul_rs)`
    @media only screen and (max-width: 648px) {
        margin-left: -20px;
    }
`;

export const CalendarPageLegendUnorderedElement = styled('li')`
    margin: 15px 0;
    @media only screen and (max-width: 648px) {
        margin: 15px 0 15px 30px;
        display: flex;
        align-items: center;
        font-size: 1.1rem;
    }
`;

export const CalendarPageModalAndStructureContainer = styled.section`
    position: relative;
    border: 1px solid var(--darkGrayTint3);
    border-radius: 10px;
    padding: 10px;
    margin: 20px 0;
    overflow: hidden;
`;

export const CalendarPageModalContainer = styled('div')<{ ifActive: boolean }>`
    display: ${props => props.ifActive ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 3;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background-color: var(--cleanWhiteColor);
    @media only screen and (min-width: 1250px) {
        display: none;
    }
`;

export const CalendarModalHeader = styled.h2`
    margin-top: 20px;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const CalendarModalDateInfo = styled.span`
    margin: 15px 0 40px 0;
    font-size: 1.1rem;
    text-transform: uppercase;
    color: var(--darkGrayTint2);
`;

export const CalendarModalButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.1rem', _fontWeight: 500, _ifEmpty: false })};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 50px;
    &::after, &::before {
        position: absolute;
        content: '';
        width: 30px;
        height: 2px;
        background-color: var(--cleanWhiteColor);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;

const selectedColor = (color: string) => {
    switch(color) {
        case LEVELS.LOW: return '--greenColor';
        case LEVELS.MEDIUM: return '--orangeColor';
        case LEVELS.HIGH: return '--redColor';
    }
};

export const CalendarOneTaskContainer = styled('div')<{ colorCSS: string }>`
    border: 2px solid var(--redColor);
    border-radius: 10px;
    padding: 20px;
    position: relative;
    width: calc(100% - 60px);
    margin: 15px 0;
    border-color: var(${props => selectedColor(props.colorCSS)});
`;

export const CalendarTaskMessage = styled('h2')<{ colorCSS: string }>`
    color: var(${props => selectedColor(props.colorCSS)});
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
`;

export const CalendarHourContainer = styled('span')<{ colorCSS: string }>`
    display: block;
    margin: 0;
    background-color: var(--cleanWhiteColor);
    position: absolute;
    bottom: -10px;
    text-transform: none;
    right: 20px;
    padding: 0 5px;
    color: var(${props => selectedColor(props.colorCSS)});
    font-weight: 500;
`;

export const CalendarModalNoActivities = styled.div`
    margin-top: 120px;
    font-size: 1.6rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CalendarModalNoActivitiesIcon = styled(FaExclamation)`
    font-size: 2.3rem;
    margin-bottom: 20px;
`;

export const CalendarHourWrapper = styled('span')<{ $ifExpired: boolean }>`
    display: block;
    font-weight: ${({ $ifExpired }) => $ifExpired ? 500 : 600};
    padding-top: 10px;
    color: var(--${({ $ifExpired }) => $ifExpired ? 'darkGrayTint1' : 'darkBlueColor'});
    text-align: right;
`;

export const CalendarLastUpdateContainer = styled.section`
    ${StandardContainer()};
`;

export const CalendarLastUpdateWrapper = styled.div`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    margin-top: 20px;
    @media only screen and (max-width: 1250px) {
        margin: -10px 0 20px;
    }
`;