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
import { EmptyContentBasicMessage, EmptyContentContainer, EmptyContentIcon } from './HighOrderComponents.styles';

interface PropsProvider {
    content: string;
}

/**
 * Component reponsible for showing alternative content, if arraylist is empty (no data).
 *
 * @param content { string } - custom text message content.
 */
const EmptyContent: React.FC<PropsProvider> = ({ content }): JSX.Element => (
    <EmptyContentContainer>
        <EmptyContentIcon/>
        <EmptyContentBasicMessage>
            Nie znalazłem żadnego <strong>{content}</strong> na tej liście. Jeśli jest taka możliwość, spróbuj dodać
            nowy element przy pomocy przycisku <strong>Dodaj nowy element</strong>.
        </EmptyContentBasicMessage>
    </EmptyContentContainer>
);

export default EmptyContent;