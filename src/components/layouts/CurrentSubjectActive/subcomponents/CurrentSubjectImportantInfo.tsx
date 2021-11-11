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

import { CurrentSubjectImportantInfoContainer } from '../CurrentSubjectActive.styles';

/**
 * Component responsible for generating static info element.
 */
const CurrentSubjectImportantInfo: React.FC = (): JSX.Element => (
    <CurrentSubjectImportantInfoContainer>
        Sekcja "Aktualnie odbywające się Zajęcia" jest ściśle powiązana z interaktywnym planem zajęć. Aby sekcja działała
        prawidłowo (wyświetlała przedmioty tylko dla konkretnej grupy dziekańskiej) należy za każdym razem po wejściu na stronę
        zapisać wybór w zakładce "Interaktywny Plan Zajęć" jeśli obsługa plików Cookies jest wyłączona. W przypadku włączonej
        obsługi plików Cookies, wystarczy dokonać wyboru tylko raz, a przy kolejnym załadowaniu strony na tym samym urządzeniu,
        Twoje preferencje zostaną zapamiętane i załadowane przez aplikacje.
    </CurrentSubjectImportantInfoContainer>
);

export default CurrentSubjectImportantInfo;