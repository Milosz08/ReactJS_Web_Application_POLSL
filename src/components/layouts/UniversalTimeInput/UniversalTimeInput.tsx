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

import { UniversalTimeClockIcon, UniversalTimeInputContainer, UniversalTimeInputElement } from './UniversalTimeInput.styles';

interface PropsProvider {
    timeValue: string;
    changeCallback: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    ifError: boolean;
}

/**
 * Component responsible for generating universal time input.
 *
 * @param timeValue { string } - time string value in HH-MM.
 * @param changeCallback { ({ target }: React.ChangeEvent<HTMLInputElement>) => void } - callback changing state function.
 * @param ifError { boolean } - flag, decided if input has errors.
 */
const UniversalTimeInput: React.FC<PropsProvider> = ({ timeValue, changeCallback, ifError }): JSX.Element => (
    <UniversalTimeInputContainer>
        <UniversalTimeInputElement
            type = 'time'
            $ifError = {ifError}
            value = {timeValue}
            onChange = {changeCallback}
        />
        <UniversalTimeClockIcon
            $ifError = {ifError}
        />
    </UniversalTimeInputContainer>
);

export default UniversalTimeInput;