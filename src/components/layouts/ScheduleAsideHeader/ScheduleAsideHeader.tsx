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
import { useContext } from 'react';

import { searchInputs } from '../../../redux/preferencesReduxStore/types';
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';
import { ExecuteScrollContext, ExecuteScrollContextTypes } from '../../pages/SchedulePage';

import {
    ScheduleAsideHeaderContainer, ScheduleAsideHeaderParamsContainer, ScheduleAsideHeaderWrapper
} from './ScheduleAsideHeader.styles';

import UniversalHeader from '../UniversalHeader/UniversalHeader';
import ScheduleAsideHeaderParams from './subcomponents/ScheduleAsideHeaderParams';
import ScheduleAsideHeaderDate from './subcomponents/ScheduleAsideHeaderDate';
import UniversalSearch from '../UniversalSearch/UniversalSearch';

/**
 * Component responsible for generating all addition schedule info and header components.
 */
const ScheduleAsideHeader: React.FC = (): JSX.Element => {

    const { executeScrollRef } = useContext<Partial<ExecuteScrollContextTypes>>(ExecuteScrollContext);

    return (
        <ScheduleAsideHeaderContainer>
            <ScheduleAsideHeaderWrapper>
                <UniversalHeader
                    iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaCalendarCheck' }}
                    content = 'Wygenerowany Plan Zajęć'
                    ifCloseButtonVisible = {false}
                    changeIconSize = '1.5rem'
                />
                <ScheduleAsideHeaderParamsContainer
                    ref = {executeScrollRef}
                >
                    <ScheduleAsideHeaderParams/>
                    <ScheduleAsideHeaderDate/>
                </ScheduleAsideHeaderParamsContainer>
                <UniversalSearch
                    type = {searchInputs.SCHEDULE_SEARCH}
                    placeholder = 'Wyszukaj przedmiot'
                />
            </ScheduleAsideHeaderWrapper>
        </ScheduleAsideHeaderContainer>
    );
};

export default ScheduleAsideHeader;