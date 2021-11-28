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

import { ROLES } from '../../../helpers/functionsAndClasses/LoginValidator';

import {
    UniversalRadioInputContainer, UniversalRadioInputElement, UniversalRadioInputLabel, UniversalRadiomarkElement
} from './UniversalRadioInput.styles';

interface PropsProvider {
    content: string;
    radioProps: {
        id: number | string;
        name: string;
        checked: boolean;
        onChangeCallback: (type: ROLES) => void;
    }
    size?: number;
    color?: string;
    textSize?: number;
}

/**
 * Component responsible for generating universal radio input components group.
 *
 * @param content
 * @param radioProps
 * @param size { number } - size of radio button (in px).
 * @param color { string } - css color variable.
 * @param textSize { number } - css font size (in rem).
 */
const UniversalRadioInput: React.FC<PropsProvider> = ({ content, radioProps, size, color, textSize }): JSX.Element => (
    <UniversalRadioInputContainer>
        <UniversalRadioInputElement
            type = 'radio'
            id = {radioProps.id}
            name = {radioProps.name}
            checked = {radioProps.checked}
            onChange = {({ target }: any) => radioProps.onChangeCallback(target.id)}
            sizeCSS = {size}
            colorCSS = {color}
        />
        <UniversalRadioInputLabel
            htmlFor = {radioProps.id}
            styleCSS = {{ color, textSize }}
        >
            {content}
        </UniversalRadioInputLabel>
        <UniversalRadiomarkElement
            sizeCSS = {size}
            colorCSS = {color}
        />
    </UniversalRadioInputContainer>
);

export default UniversalRadioInput;