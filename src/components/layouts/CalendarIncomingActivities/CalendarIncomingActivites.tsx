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
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import {
    CalendarIcomingActivitiesContainer, CalendarIcomingActivitiesWrapper
} from './CalendarIncomingActivities.styles';

const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));
const IncomingActivitiesContent = React.lazy(() => import('./subcomponents/IncomingActivitiesContent'));

/**
 * Component responsible for generating all structure for last activities (based on calendar
 * records) main page section.
 */
const CalendarIncomingActivites: React.FC = (): JSX.Element => {
    return (
        <CalendarIcomingActivitiesContainer>
            <CalendarIcomingActivitiesWrapper>
                <UniversalHeader
                    iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaBusinessTime' }}
                    content = 'Nadchodzące Wydarzenia'
                    ifCloseButtonVisible = {false}
                    changeIconSize = '1.6rem'
                />
                <IncomingActivitiesContent/>
            </CalendarIcomingActivitiesWrapper>
        </CalendarIcomingActivitiesContainer>
    );
};

export default CalendarIncomingActivites;