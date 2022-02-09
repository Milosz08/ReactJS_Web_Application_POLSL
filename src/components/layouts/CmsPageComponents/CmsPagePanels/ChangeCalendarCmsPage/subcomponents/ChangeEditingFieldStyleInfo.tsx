/*
 * Copyright (c) 2022-2022, by Miłosz Gilga <https://miloszgilga.pl>
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

const UniversalInfoSection = React.lazy(() => import('../../../../../reusable/UniversalInfoSection/UniversalInfoSection'));
const ChangeEditingFieldRadioGroup = React.lazy(() => import('./ChangeEditingFieldRadioGroup'));

/**
 * Component responsible for showing additional info about available calendar editing modes.
 */
const ChangeEditingFieldStyleInfo: React.FC = (): JSX.Element => (
    <UniversalInfoSection
        headerContent = 'Nowość! Zmiana widoku trybu edycji'
        marginTop = {10}
        marginBottom = {40}
    >
        Wpisy kalendarza możesz modyfikować w dotychczasowy sposób przy pomocy (niezbyt wygodnej) standardowej
        <strong> listy edycyjnej</strong> lub przy pomocy wygodniejszej formy interfejsu <strong>WYSIWYG</strong> pokazującej
        zawartość podobną do tej jaką widzi użytkownik aplikacji. Twój wybór zapisze się w pliku <strong>Cookie</strong> i
        będzie utrzymywany aż do jego usunięcia.
        <ChangeEditingFieldRadioGroup/>
    </UniversalInfoSection>
);

export default ChangeEditingFieldStyleInfo;