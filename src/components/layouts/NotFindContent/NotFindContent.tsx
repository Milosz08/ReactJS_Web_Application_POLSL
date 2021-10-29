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

import { NotFindContentContainer, NotFindMainTitle, NotFindMainTitleStrong, SadFaceIcon } from './NotFindContent.styles';

interface PropsProvider {
    ifVisible: boolean;
    content?: string;
}

/**
 * Component responsible for generate alternative content, when default content not found.
 *
 * @param ifVisible { boolean } - component visibility toggle.
 * @param content { string? } - aria label text content.
 */
const NotFindContent: React.FC<PropsProvider> = ({ ifVisible, content }): JSX.Element => {
    return (
        <NotFindContentContainer
            ifVisible = {ifVisible}
        >
            <SadFaceIcon/>
            <NotFindMainTitle>
                Przykro mi, ale nie znalazłem szukanego przez Ciebie <NotFindMainTitleStrong>{content}</NotFindMainTitleStrong>.
                Sprawdź, czy wpisana przez Ciebie fraza jest poprawna i nie zawiera literówek.
            </NotFindMainTitle>
        </NotFindContentContainer>
    );
};

export default NotFindContent;