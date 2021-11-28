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
import { useState } from 'react';

import IconComponent, { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { PasswordInputFieldContainer, PasswordInputFieldInput, PasswordToggleButton } from './PasswordInputField.styles';

interface PropsProvider {
    ifError: boolean;
    grabber: any;
    changeCallback?: () => void;
    placeholder?: string;
    fontSize?: string;
    maxWidth?: string;
    disabled?: boolean;
}

/**
 * Component responsible for generating password field with visibility switcher button and
 * error referential indicator.
 *
 * @param ifError { boolean } - error flag indicator.
 * @param grabber { React.MutableRefObject<any> } - react referential JSX grabber for HTML element.
 * @param changeCallback { () => void } - callback listener function input on every change.
 * @param placeholder { string } - optional placeholder value, different of "Hasło".
 * @param fontSize { string } - css font size inside placeholer and input element.
 * @param maxWidth { string } - css max width of input element.
 * @param disabled
 */
const PasswordInputField: React.FC<PropsProvider> = ({
    ifError, grabber, changeCallback, placeholder, fontSize, maxWidth, disabled
}): JSX.Element => {

    const [ icon, setIcon ] = useState<string>('MdVisibility');
    const [ visibility, setVisibility ] = useState<boolean>(false);

    const handleToggleVisiblePassword = (): void => {
        if (grabber.current.value !== '') {
            setIcon(prevState => prevState === 'MdVisibility' ? 'MdVisibilityOff' : 'MdVisibility');
            setVisibility(prevState => !prevState);
        }
    };

    return (
        <PasswordInputFieldContainer
            maxWidthCSS = {maxWidth}
        >
            <PasswordInputFieldInput
                type = {visibility ? 'text' : 'password'}
                placeholder = {placeholder || 'Hasło'}
                ifError = {ifError}
                onChange = {changeCallback}
                ref = {grabber}
                fontSizeCSS = {fontSize}
                maxLength = {20}
                disabled = {disabled}
            />
            <PasswordToggleButton
                onClick = {handleToggleVisiblePassword}
                title = {`${visibility ? 'Ukryj' : 'Pokaż'} hasło`}
                type = 'button'
                ifError = {ifError}
            >
                <IconComponent
                    family = {IconFamiliesType.MaterialDesignIcons}
                    name = {icon}
                />
            </PasswordToggleButton>
        </PasswordInputFieldContainer>
    );
};

export default PasswordInputField;