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

import { CookiesMainSectionContainer } from '../CookiesNotification.styles';

/**
 * Component responsible for generating cookies notification text content.
 */
const CookiesSectionContainer: React.FC = (): JSX.Element => (
    <CookiesMainSectionContainer>
        W celu optymalizacji treści i wygody użytkowania, strona którą będziesz przeglądał korzysta z
        plików Cookies zapisanych na Twoim urządzeniu. Pliki Cookies, potocznie nazywane Ciasteczkami,
        możesz kontrolować za pomocą ustawień swojej przeglądarki internetowej. Dalsze korzystanie ze
        strony lub zamknięcie tego okna bez zmiany ustawień przeglądarki, oznacza że akceptujesz
        stosowanie polityki plików Cookies.
    </CookiesMainSectionContainer>
);

export default CookiesSectionContainer;