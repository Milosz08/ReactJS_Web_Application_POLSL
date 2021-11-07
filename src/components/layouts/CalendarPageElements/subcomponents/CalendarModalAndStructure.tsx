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
import { IconFamiliesType } from '../../../../helpers/componentsAndMiddleware/IconComponent';

import { CalendarPageModalAndStructureContainer } from '../CalendarPageElements.styles';

const UniversalHeader = React.lazy(() => import('../../UniversalHeader/UniversalHeader'));
const CalendarModal = React.lazy(() => import('./CalendarModal'));
const CalendarContainer = React.lazy(() => import('./CalendarContainer'));

/**
 * Component responsible for generating calendar structure and header.
 */
const CalendarModalAndStructure: React.FC = (): JSX.Element => (
    <Fragment>
        <UniversalHeader
            iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaCalendarAlt' }}
            content = 'Kalendarz Studenta'
            ifCloseButtonVisible = {false}
            changeIconSize = '1.4rem'
        />
        <CalendarPageModalAndStructureContainer>
            <CalendarModal/>
            <CalendarContainer/>
        </CalendarPageModalAndStructureContainer>
    </Fragment>
);

export default CalendarModalAndStructure;