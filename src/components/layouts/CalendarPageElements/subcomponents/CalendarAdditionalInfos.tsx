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

import { CALENDAR_LEVELS } from '../../../../helpers/structs/calendar.config';
import { IconFamiliesType } from '../../../../helpers/componentsAndMiddleware/IconComponent';

import {
    CalendarPageLegendBox, CalendarPageLegendSpanElement, CalendarPageLegendUnorderedElement, CalendarPageLegendUnorderedList
} from '../CalendarPageElements.styles';

import UniversalHeader from '../../UniversalHeader/UniversalHeader';

/**
 * Component responsible for generating all levels calendar structure info.
 */
const CalendarAdditionalInfos: React.FC = (): JSX.Element => {

    const generateLegendElements: JSX.Element[] = CALENDAR_LEVELS.map(level => (
        <CalendarPageLegendUnorderedElement
            key = {level.name}
        >
            <CalendarPageLegendSpanElement
                colorValue = {level.color}
            >
                Kolor {level.colorPolish}
            </CalendarPageLegendSpanElement> - aktywności o {level.name}m priorytecie.
        </CalendarPageLegendUnorderedElement>
    ));

    return (
        <Fragment>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaInfo' }}
                content = 'Dodatkowe Informacje'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.5rem'
            />
            <CalendarPageLegendBox>
                <CalendarPageLegendUnorderedList>
                    {generateLegendElements}
                </CalendarPageLegendUnorderedList>
            </CalendarPageLegendBox>
        </Fragment>
    );
};

export default CalendarAdditionalInfos;