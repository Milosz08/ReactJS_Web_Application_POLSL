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

import * as React from 'react';
import useEstimateCounter from '../../../helpers/hooks/useEstimateCounter';

import {
    DesktopDateContainer, DesktopDateSpan, EstimateCounterContainer, EstimateCounterHeader, EstimateCounterWrapper,
    MobileDateConainer, MobileDateSpan
} from './EstimateCounter.styles';

/**
 * A constant representing the day and time of the counting end.
 */
const EXP_TIME: number = new Date('2021-10-01T10:00:00').getTime();

/**
 * Component on the deductible main page to the date stored in the permanent Exp_Time. The refreshed component
 * is every second with the UselayoutEffect function and counts down the time from the current date, collected every
 * time the Date class component is refreshed. Time values take a permanent number of characters (for <10 is added 0).
 */
const EstimateCounter: React.FC = (): JSX.Element => {

    const date = useEstimateCounter(EXP_TIME);

    return (
        <EstimateCounterContainer>
            <EstimateCounterWrapper>
                <EstimateCounterHeader>
                    Od rozpoczęcia <strong>III semestru</strong> minęło:
                </EstimateCounterHeader>
                <DesktopDateContainer>
                    <DesktopDateSpan><strong>{date.days}</strong> dni, </DesktopDateSpan>
                    <DesktopDateSpan><strong>{date.hours}</strong> godzin, </DesktopDateSpan>
                    <DesktopDateSpan><strong>{date.minutes}</strong> minut, </DesktopDateSpan>
                    <DesktopDateSpan><strong>{date.seconds}</strong> sekund </DesktopDateSpan>
                </DesktopDateContainer>
                <MobileDateConainer>
                    <MobileDateSpan>
                        {date.days}:{date.hours}:{date.minutes}:{date.seconds}
                    </MobileDateSpan>
                </MobileDateConainer>
            </EstimateCounterWrapper>
        </EstimateCounterContainer>
    );
};

export default EstimateCounter;