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
import { Fragment } from 'react';

import {
    NoIcomingActivitiesIcon, NoIcomingActivitiesTitle, NoIncomingActivitiesContainer
} from '../CalendarIncomingActivities.styles';

import { DAYS_INCOME } from '../../../../helpers/structs/calendar.config';

interface PropsProvider {
    jsxElms: (JSX.Element | null)[];
}

/**
 * Component responsible for generating alternative content, when there is no
 * activity in the selected time period
 *
 * @param jsxElms { (JSX.Element | null)[] } - ReactDOM activities rendered array.
 */
const NoIncomingActivities: React.FC<PropsProvider> = ({ jsxElms }): JSX.Element => {

    const generateNonActivities: JSX.Element | null = jsxElms!.every((curValue) => !Boolean(curValue)) ? (
        <NoIncomingActivitiesContainer>
            <NoIcomingActivitiesIcon/>
            <span>Brak nadchodzących wydarzeń.</span>
            <NoIcomingActivitiesTitle>
                Wydarzenia wyświetlane są automatycznie z {DAYS_INCOME - 1}-dniowym wyprzedzeniem.
            </NoIcomingActivitiesTitle>
        </NoIncomingActivitiesContainer>
    ) : null;

    return (
        <Fragment>
            {generateNonActivities}
        </Fragment>
    );
};

export default NoIncomingActivities;