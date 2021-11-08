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
import { BiBlanket } from 'react-icons/all';

import { StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';
import { LEVELS } from '../../../helpers/structs/calendar.config';
const { LOW, HIGH } = LEVELS;

export const CalendarIcomingActivitiesContainer = styled.section`
    ${StandardContainer()};
`;

export const CalendarIcomingActivitiesWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
`;

export const IncomingActivitiesMainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const IncomingActivitesContainer = styled.div`
    position: relative;
    border: 1px solid var(--darkGrayTint3);
    border-radius: 10px;
    padding: 30px 150px;
    width: 90%;
    margin: 10px 0;
    @media only screen and (max-width: 648px) {
        padding: 35px 40px;
        text-align: center;
        margin: 20px 0;
        width: 100%;
    }
`;

export const IncomingActivitiesDateInfo = styled('span')<{ colorCSS: string }>`
    position: absolute;
    width: fit-content;
    left: -30px;
    top: 50%;
    transform: translate(0, -50%);
    padding: 8px 20px 10px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--cleanWhiteColor);
    background-color: var(--${({ colorCSS }) => (
        colorCSS === LOW ? 'greenColor' : colorCSS === HIGH ? 'redColor' : 'orangeColor'
    )});
    @media only screen and (max-width: 648px) {
        left: 50%;
        transform: translate(-50%, 0);
        top: -20px;
    }
`;

export const IncomingActivitiesContentMessage = styled.span`
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    line-height: 1;
`;

export const IncomingActivitiesIndicator = styled('span')<{ colorCSS: string }>`
    position: absolute;
    right: -8px;
    width: 15px;
    height: 60%;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 10px;
    background-color: var(--${({ colorCSS }) => (
        colorCSS === LOW ? 'greenColor' : colorCSS === HIGH ? 'redColor' : 'orangeColor'
    )});
    @media only screen and (max-width: 648px) {
        right: 20%;
        transform: translate(-50%, 0);
        width: 30%;
        height: 10px;
        top: 96%;
    }
`;

export const NoIncomingActivitiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--navyBlueColor);
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin-top: 30px;
    
`;

export const NoIcomingActivitiesIcon = styled(BiBlanket)`
    font-size: 4.5rem;
    margin-bottom: 25px;
`;

export const NoIcomingActivitiesTitle = styled.div`
    font-size: 1.2rem;
    margin-top: 15px;
    color: var(--darkGrayTint2);
    font-weight: 400;
`;