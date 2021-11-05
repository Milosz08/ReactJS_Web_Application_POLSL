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

import {
    ScheduleSingleDayTileSeparatorContainer, ScheduleSingleDayTileSeparatorIconWrapper, ScheduleSingleDayTileSeparatorLine
} from '../ScheduleLayout.styles';

import IconComponent from '../../../../helpers/componentsAndMiddleware/IconComponent';

interface PropsProvider {
    icon: {
        family: string;
        name: string;
    }
}

/**
 * Component responsible for generating single tile separator line in subjects schedule.
 */
const ScheduleSingleDaySingleTileSeparator: React.FC<PropsProvider> = ({ icon }): JSX.Element => (
    <ScheduleSingleDayTileSeparatorContainer>
        <ScheduleSingleDayTileSeparatorLine/>
        <ScheduleSingleDayTileSeparatorIconWrapper>
            <IconComponent
                family = {icon.family}
                name = {icon.name}
            />
        </ScheduleSingleDayTileSeparatorIconWrapper>
        <ScheduleSingleDayTileSeparatorLine/>
    </ScheduleSingleDayTileSeparatorContainer>
);

export default ScheduleSingleDaySingleTileSeparator;