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

const UniversalInfoSection = React.lazy(() => import('../../UniversalInfoSection/UniversalInfoSection'));

/**
 * Component responsible for generating static info element.
 */
const CurrentSubjectImportantInfo: React.FC = (): JSX.Element => (
    <UniversalInfoSection
        leadingColor = 'redColor'
        headerContent = 'Wyświetlanie przedmiotów'
        marginTop = {80}
    >
        Sekcja "Aktualnie odbywające się Zajęcia" jest ściśle powiązana z <strong>interaktywnym planem zajęć</strong>. Aby sekcja
        działała prawidłowo (wyświetlała przedmioty tylko dla konkretnej grupy dziekańskiej) należy za każdym razem po wejściu
        na stronę <strong>zapisać wybór</strong> w zakładce "Interaktywny Plan Zajęć" jeśli obsługa plików Cookies jest
        <strong> wyłączona</strong>. W przypadku <strong>włączonej</strong> obsługi plików Cookies, wystarczy dokonać wyboru
        <strong> tylko raz</strong>, a przy kolejnym załadowaniu strony na tym samym urządzeniu, Twoje preferencje zostaną
        zapamiętane i załadowane przez aplikacje.
    </UniversalInfoSection>
);

export default CurrentSubjectImportantInfo;