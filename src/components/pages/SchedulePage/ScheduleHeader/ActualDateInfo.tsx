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

import React, { useContext } from 'react';

import { ActualDateContext, ActualDateTypes } from '../../../../contextStore/ActualDateProvider';
import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';

const { dateInfoContainer } = require('../SchedulePage.module.scss');

/**
 * @details A component generating an information section over a grid of classes. It informs about the current selection
 *          of groups on the set and the current date, including the name of the day of the week (collected from context).
 */
const ActualDateInfo = (): JSX.Element => {

    const { date } = useContext<Partial<ActualDateTypes>>(ActualDateContext);
    const { groupSelected, engSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

    return (
        <div className = {dateInfoContainer}>
         <span>Wyświetlam plan dla parametrów:
            <strong> Grupa {groupSelected}</strong>,
            <strong> Grupa {engSelected!.toLocaleUpperCase()} </strong>
         </span>
            <span>
         Dzisiaj jest
            <strong> {date!.dayStr}</strong>,
            <strong> {date!.day} {date!.monthStr} {date!.year} </strong>
         roku.
         </span>
        </div>
    );
}

export default ActualDateInfo;