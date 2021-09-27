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

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const {
    universalHeader, universalHeaderIcon, universalHeaderButton, additionalTitleHeader
} = require('./UniversalHeader.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    iconP: IconProp;
    content: string;
    ifCloseButtonVisible: boolean;
    addHeaderDayIndicator?: string;
    setCloseButton?: () => void;
}

/**
 * @details Component that implements the main header in sections. Depending on the given props, the header
 *          is generated with a close button (for modal windows).
 *
 * @param iconP { IconProp } - an array with two string parameters describing the icon.
 * @param content { string } - the text content of the header.
 * @param ifCloseButtonVisible { boolean } - a boolean value, indicating whether the header should have a close button.
 * @param setCloseButton { () => void? } - function transferred to the operation of the modal closing button.
 * @param addHeaderDayIndicator { string? } - for the modal adding / modifying subjects in the timetable.
 */
const UniversalHeader: React.FC<PropsProvider> = ({
    iconP, content, ifCloseButtonVisible, setCloseButton, addHeaderDayIndicator
}): JSX.Element => {
    return (
        <header className = {universalHeader}>
            <h3>
                <FontAwesomeIcon
                    icon = {iconP}
                    className = {universalHeaderIcon}
                />
                <span>
               {content}
                    {addHeaderDayIndicator && <span className = {additionalTitleHeader}>{addHeaderDayIndicator}</span>}
            </span>
                <aside/>
                {ifCloseButtonVisible && <button
                    className = {universalHeaderButton}
                    onClick = {setCloseButton}
                >
                    <span/>
                </button>}
            </h3>
        </header>
    );
}

export default UniversalHeader;