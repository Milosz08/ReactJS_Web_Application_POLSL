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
    UniversalHeaderContainer, UniversalHeaderHeadling, UniversalHeaderIconWrapper, UniversalHeaderMainContent,
    AdditionalHeaderTitle, Separator, CloseButton, CloseButtonTime, UniversalHeaderTitleSection
} from './UniversalHeader.styles';

const IconComponent = React.lazy(() => import('../../../helpers/componentsAndMiddleware/IconComponent'));

interface PropsProvider {
    iconP: {
        family: string;
        name: string;
    };
    content: string | JSX.Element;
    ifCloseButtonVisible: boolean;
    changeIconSize?: string;
    addHeaderDayIndicator?: string;
    setCloseButton?: () => void;
}

/**
 * Component that implements the main header in sections. Depending on the given props, the header
 * is generated with a close button (for modal windows).
 *
 * @param iconP { family: string, name: string } - an array with two string parameters describing the icon.
 * @param content { string } - the text content of the header.
 * @param ifCloseButtonVisible { boolean } - a boolean value, indicating whether the header should have a close button.
 * @param setCloseButton { () => void? } - function transferred to the operation of the modal closing button.
 * @param addHeaderDayIndicator { string? } - for the modal adding / modifying subjects in the timetable.
 * @param changeIconSize { string } - custom icon size (by default is 1rem).
 */
const UniversalHeader: React.FC<PropsProvider> = ({
    iconP, content, ifCloseButtonVisible, setCloseButton, addHeaderDayIndicator, changeIconSize
}): JSX.Element => (
    <UniversalHeaderContainer>
        <UniversalHeaderHeadling>
            <UniversalHeaderTitleSection>
                <UniversalHeaderIconWrapper
                    customSize = {changeIconSize}
                >
                    <IconComponent
                        family = {iconP.family}
                        name = {iconP.name}
                    />
                </UniversalHeaderIconWrapper>
                <UniversalHeaderMainContent>
                    {content}
                    {addHeaderDayIndicator &&
                    <AdditionalHeaderTitle>
                        {addHeaderDayIndicator}
                    </AdditionalHeaderTitle>
                    }
                </UniversalHeaderMainContent>
            </UniversalHeaderTitleSection>
            <Separator/>
            {ifCloseButtonVisible &&
                <CloseButton
                    onClick = {setCloseButton}
                >
                    <CloseButtonTime/>
                </CloseButton>
            }
        </UniversalHeaderHeadling>
    </UniversalHeaderContainer>
);

export default UniversalHeader;