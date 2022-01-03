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

const UniversalInfoSection = React.lazy(() => import('../../../../UniversalInfoSection/UniversalInfoSection'));

/**
 * Component responsible for generating usage info of covid warning selectors block element.
 */
const UsageInfoElement: React.FC = (): JSX.Element => (
    <UniversalInfoSection
        leadingColor = 'redColor'
        headerContent = 'Modyfikacja zagrożeń Covid'
        marginTop = {10}
        marginBottom = {30}
    >
        Bezpośrednio po modyfikacji jednego elementu, dane zapisywane są <strong>asynchronicznie</strong> w bazie danych. Nie
        musisz potwierdzać <strong>żadnym</strong> przyciskiem, a przy kolejnym przeładowaniu strony aplikacja pobierze i wstawi
        zmienione przez Ciebie informacje w tej sekcji oraz w sekcji głównej na stronie startowej. Należy jednak po wprowadzeniu
        zmian chwilę <strong>odczekać</strong>, aż zmieniona wartość zostanie umieszczona w polu wprowadzania.
    </UniversalInfoSection>
);

export default UsageInfoElement;