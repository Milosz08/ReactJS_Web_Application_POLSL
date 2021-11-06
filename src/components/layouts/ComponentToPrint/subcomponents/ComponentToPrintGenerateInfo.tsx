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

import { ComponentToPrintInfoContainer, ComponentToPrintJavaIcon } from '../ComponentToPrint.styles';

/**
 * Component responsible for generate software PDF generator info.
 */
const ComponentToPrintGenerateInfo: React.FC = (): JSX.Element => (
    <ComponentToPrintInfoContainer>
        Wygenerowano przy użyciu:
        <ComponentToPrintJavaIcon/>
        Java Servlet PDF
    </ComponentToPrintInfoContainer>
);

export default ComponentToPrintGenerateInfo;