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

import { CalendarPageUsageBox, CalendarPageWarningBox } from '../CalendarPageElements.styles';

const UniversalHeader = React.lazy(() => import('../../UniversalHeader/UniversalHeader'));

/**
 * Component responsible for generate used and mobile devices info for calendar usage.
 */
const CalendarHowToUse: React.FC = (): JSX.Element => (
    <Fragment>
        <UniversalHeader
            iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaQuestion' }}
            content = 'Jak używać kalendarza'
            ifCloseButtonVisible = {false}
            changeIconSize = '1.4rem'
        />
        <CalendarPageUsageBox>
            Interaktywny kalendarz z ważnymi datami. Kalendarz posiada możliwość nawigacji przy pomocy
            strzałek (pojedyncza przenosi o miesiąc, podwójna przenosi o rok). Po kliknięciu w środkowy
            panel daty kalendarz umożliwia szybki skok do miesiąca/roku/dekady. Kolor żółty na kafelku
            kalendarza wskazuje aktualny dzień tygodnia.
        </CalendarPageUsageBox>
        <CalendarPageWarningBox>
            Na urządzeniu moblinym kalendarz jest w formie zmimifikowanej. Aby zobaczyć, jakie aktywności
            kryją się pod poszczególnymi dniami tygodnia, kliknik w kafelek, aby otworzyć Modal.
        </CalendarPageWarningBox>
    </Fragment>
);

export default CalendarHowToUse;