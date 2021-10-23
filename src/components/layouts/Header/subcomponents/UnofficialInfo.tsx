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

import { UnofficialInfoContainer } from '../Header.styles';

interface PropsProvider {
    offset: number;
}

/**
 *
 *
 * @param offset { number } -
 */
const UnofficialInfo: React.FC<PropsProvider> = ({ offset }): JSX.Element => (
    <UnofficialInfoContainer
        offsetValue = {offset > 90 ? 90 : offset}
    >
        Nieoficjalna witryna internetowa kierunku "Informatyka" na wydziale Elektrycznym 2020/2021.
    </UnofficialInfoContainer>
);

export default UnofficialInfo;