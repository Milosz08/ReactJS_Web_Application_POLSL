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

import { PrivacyPolicyHeaderContainer, PrivacyPolicyTextContent } from '../PrivacyPolicy.styles';

const UniversalHeader = React.lazy(() => import('../../../reusable/UniversalHeader/UniversalHeader'));

/**
 * Component responsible to generate hashing and app protections info content.
 */
const PrivacyPolicyHashingInfo: React.FC = (): JSX.Element => (
    <PrivacyPolicyHeaderContainer>
        <UniversalHeader
            iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUserLock' }}
            content = 'Bezpieczeństwo Aplikacji'
            ifCloseButtonVisible = {false}
            changeIconSize = '1.5rem'
        />
        <PrivacyPolicyTextContent>
            Wrażliwe dane wpisywane do formularzy (hasła, tokeny), dane wysyłane do administratorów i moderatorów
             w formularzach przez Użytkowników oraz wrażliwe dane w bazie danych przechowywane są po
            wcześniejszym zaszyfrowaniu. Aplikacja używa jednego z najbardziej niezawodnych symetrycznych
            algorytmów kryptograficznych wraz każdorazowo generowanym sekretnym kluczem, używając przy tym  środowiska i
            bibliotek jezyka Java znanego ze swojego dużego bezpieczeństwa i stabilności działania.
        </PrivacyPolicyTextContent>
    </PrivacyPolicyHeaderContainer>
);

export default PrivacyPolicyHashingInfo;