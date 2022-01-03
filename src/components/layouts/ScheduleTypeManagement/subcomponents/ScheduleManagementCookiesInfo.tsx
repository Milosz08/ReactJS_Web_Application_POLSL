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

import { OuterLinkIcon, ScheduleManagementCookiesInfoAnchor } from '../ScheduleTypeManagement.styles';

const UniversalInfoSection = React.lazy(() => import('../../UniversalInfoSection/UniversalInfoSection'));

/**
 * Component responsible for generate Cookies turn on info.
 */
const ScheduleManagementCookiesInfo: React.FC = (): JSX.Element => (
    <UniversalInfoSection
        leadingColor = 'redColor'
        headerContent = 'Zapisywanie wybranych preferencji'
        marginTop = {20}
    >
        Po wybraniu właściwych opcji, poniższy plan wygeneruje się <strong>automatycznie</strong>. Jeśli jednak chcesz zapisać
        swój wybór nawet po zamknięciu przeglądarki, kliknij w niebieski przycisk po prawej stronie. Aby zapisywanie wyboru
        zadziałało, twoja przeglądarka musi mieć <strong>włączoną obsługę plików Cookies</strong>. Jeśli nie wiesz jak włączyć
        obsługę plików Cookies w twojej przeglądarce, przejdź pod {' '}
        <ScheduleManagementCookiesInfoAnchor
            href = 'https://jakwylaczyccookie.pl/jak-wylaczyc-pliki-cookies/'
            target = '_blank'
            rel = 'noreferrer'
        >
            ten link<OuterLinkIcon/>
        </ScheduleManagementCookiesInfoAnchor>
    </UniversalInfoSection>
);

export default ScheduleManagementCookiesInfo;