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
import useDate from '../../../../helpers/hooks/useDate';

import { ScheduleAsideHeaderParamsWrapper } from '../ScheduleAsideHeader.styles';

/**
 * Component responsible for generating schedule actual date indicator element.
 */
const ScheduleAsideHeaderDate: React.FC = (): JSX.Element => {

    const date = useDate();

    return (
        <ScheduleAsideHeaderParamsWrapper>
            Dzisiaj jest <strong>{date.day}</strong>,{' '}
            <strong>{date.dayNmb} {date.month} {date.year}</strong> roku.
        </ScheduleAsideHeaderParamsWrapper>
    );
};

export default ScheduleAsideHeaderDate;