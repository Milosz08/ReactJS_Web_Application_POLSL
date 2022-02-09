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

import { IconFamiliesType } from '../../../../helpers/componentsAndMiddleware/IconComponent';

const UniversalHeader = React.lazy(() => import('../../../reusable/UniversalHeader/UniversalHeader'));
const UniversalInfoSection = React.lazy(() => import('../../../reusable/UniversalInfoSection/UniversalInfoSection'));

/**
 * Component responsible for generate used and mobile devices' info for calendar usage.
 */
const CalendarHowToUse: React.FC = (): JSX.Element => (
    <>
        <UniversalHeader
            iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaQuestion' }}
            content = 'Jak używać kalendarza'
            ifCloseButtonVisible = {false}
            changeIconSize = '1.4rem'
        />
        <UniversalInfoSection
            leadingColor = 'darkOrangeColor'
            headerContent = 'Podstawowa konfiguracja'
            marginTop = {10}
        >
            Interaktywny kalendarz z ważnymi datami. Kalendarz posiada możliwość nawigacji przy pomocy strzałek
            (<strong>pojedyncza</strong> przenosi o <strong>miesiąc</strong>, <strong>podwójna</strong> przenosi
            o <strong>rok</strong>). Po kliknięciu w środkowy panel daty kalendarz umożliwia szybki skok do miesiąca/roku/dekady.
            Niebieskie obramowanie kafelka kalendarza wskazuje aktualny dzień tygodnia. Szarym kolorem zaznaczono aktywności
            które uległy przedawnieniu.
        </UniversalInfoSection>
        <UniversalInfoSection
            leadingColor = 'redColor'
            headerContent = 'Urządzenia mobilne'
            marginTop = {30}
            marginBottom = {50}
        >
            Na urządzeniu moblinym kalendarz jest w formie <strong>zmimifikowanej</strong>. Aby zobaczyć, jakie aktywności
            kryją się pod poszczególnymi dniami tygodnia, <strong>kliknij w kafelek</strong>, aby otworzyć modal.
        </UniversalInfoSection>
    </>
);

export default CalendarHowToUse;