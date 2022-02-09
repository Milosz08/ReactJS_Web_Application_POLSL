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

import {
    UniversalInfoSectionBorderElement, UniversalInfoSectionContainer, UniversalInfoSectionHeader, UniversalInfoSectionTextContent
} from './UniversalInfoSection.styles';

interface PropsProvider {
    children: React.ReactNode;
    leadingColor?: string;
    headerContent: string;
    marginTop?: number;
    marginBottom?: number;
}

/**
 * Universal component responsible for generating info block message.
 *
 * @param children { React.ReactNode } - custom content.
 * @param leadingColor { string? } - leading color in CSS variable format: --color. By default is --navyBlueColor
 * @param headerContent { string } - text in box header.
 * @param marginTop { number? } - custom top margin in px. By default is 50px.
 * @param marginBottom { number? } - custom bottom margin in px. By default is 0.
 */
const UniversalInfoSection: React.FC<PropsProvider> = ({
    children, leadingColor, headerContent, marginTop, marginBottom
}): JSX.Element => (
    <UniversalInfoSectionContainer
        $marginTop = {marginTop || 0}
        $marginBottom = {marginBottom}
    >
        <UniversalInfoSectionHeader
            leadingColor = {leadingColor}
        >
            {headerContent}
        </UniversalInfoSectionHeader>
        <UniversalInfoSectionTextContent>
            {children}
        </UniversalInfoSectionTextContent>
        <UniversalInfoSectionBorderElement
            leadingColor = {leadingColor}
        />
    </UniversalInfoSectionContainer>
);

export default UniversalInfoSection;