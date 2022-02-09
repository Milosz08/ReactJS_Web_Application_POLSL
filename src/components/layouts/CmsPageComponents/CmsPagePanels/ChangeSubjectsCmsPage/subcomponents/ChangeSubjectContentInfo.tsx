/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
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

/**
 * Component responsible for show additional info about removing and/or modyfiying subject.
 */
const ChangeSubjectContentInfo: React.FC = (): JSX.Element => (
    <UniversalInfoSection
        leadingColor = 'redColor'
        headerContent = 'Modyfikacja/Usuwanie przedmiotu'
        marginTop = {10}
        marginBottom = {40}
    >
        Podczas jakielkowiek zmiany przedmiotu (modyfikacja tytułu, usunięcie przedmiotu itp.) wszystkie powiązane z nim
        instancje (głównie w planie zajęć) zostaną <strong>usunięte</strong>. Pamiętaj, aby modyfikować przedmiot tylko wtedy
        kiedy to konieczne!
    </UniversalInfoSection>
);

export default ChangeSubjectContentInfo;