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

import { ScheduleTypeManagementContainer, ScheduleTypeManagementWrapper } from './ScheduleTypeManagement.styles';

import UniversalHeader from '../UniversalHeader/UniversalHeader';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import ScheduleManagementCookiesInfo from './subcomponents/ScheduleManagementCookiesInfo';

/**
 * Component responsible for generating other component, created all schedule form preferences.
 */
const ScheduleTypeManagement: React.FC = () => (
    <ScheduleTypeManagementContainer>
        <ScheduleTypeManagementWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaClipboardList' }}
                content = 'Panel Zarządzania'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.6rem'
            />
            <ScheduleForm/>
            <ScheduleManagementCookiesInfo/>
        </ScheduleTypeManagementWrapper>
    </ScheduleTypeManagementContainer>
);

export default ScheduleTypeManagement;