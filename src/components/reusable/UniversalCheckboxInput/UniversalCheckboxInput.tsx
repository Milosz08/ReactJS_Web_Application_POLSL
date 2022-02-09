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

import {
    CheckboxInput, CheckboxCheckmark, UniversalCheckboxInputContainer, CheckFieldLabel
} from './UniversalCheckboxInput.styles';

interface PropsProvider {
    ifChecked: boolean;
    changeCheckedCallback: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    id: string | number;
    name?: string;
    size?: number;
    color?: string;
    labelContent?: string;
    ifError?: boolean;
    ifExtraMargin?: boolean;
    disabledProp?: boolean;
}

/**
 * Universal component responsible for generating basic structure of checkbox field used in this
 * web application.
 *
 * @param ifChecked { boolean } - flag decided, if checkbox is active.
 * @param changeCheckedCallback { () => void } - callback for change checkbox state.
 * @param id { string | number } - checkbox ID.
 * @param size { number? } - checkbox size (square).
 * @param color { string? } - checkbox active color.
 * @param labelContent { string? } - checkbox label content.
 * @param ifError { boolean? } - checkbox validate field flag.
 * @param ifExtraMargin { boolean? } - add separating margin between checkbox and text label.
 * @param disabledProp { boolean? } - checkbox disabled flag.
 * @param name { string? } - optional input name.
 */
const UniversalCheckboxInput: React.FC<PropsProvider> = ({
    ifChecked, changeCheckedCallback, id, size, color, labelContent, ifError, ifExtraMargin, disabledProp, name
}): JSX.Element => (
    <UniversalCheckboxInputContainer>
        <CheckboxInput
            type = 'checkbox'
            id = {id}
            onChange = {changeCheckedCallback}
            checked = {ifChecked}
            checkboxSize = {size}
            checkboxColor = {disabledProp ? 'var(--lightGrayTint4)' : color}
            ifExtraMargin = {ifExtraMargin}
            disabled = {disabledProp}
            name = {name}
        />
        <CheckboxCheckmark
            ifError = {ifError || false}
            checkmarkSize = {size}
            disabledCSS = {disabledProp}
        />
        <CheckFieldLabel
            htmlFor = {id}
            disabledCSS = {disabledProp}
        >
            {labelContent}
        </CheckFieldLabel>
    </UniversalCheckboxInputContainer>
);

export default UniversalCheckboxInput;