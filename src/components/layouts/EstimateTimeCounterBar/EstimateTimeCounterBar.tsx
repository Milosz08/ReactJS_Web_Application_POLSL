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
    EstimateTimeCounterBarActiveElement, EstimateTimeCounterBarContainer, EstimateTimeCounterBarLine
} from './EstimateTimeCounterBar.styles';

interface PropsProvider {
    visibility: boolean;
    width: number;
    content?: string;
}

/**
 * Component responsible for generate progress bar line, counting to wait or generating content.
 *
 * @param visibility { boolean } - flag decided, if element is visible or not.
 * @param width { number } - progress bar width.
 * @param content { ?string } - custom content before progress bar number indicator.
 */
const EstimateTimeCounterBar: React.FC<PropsProvider> = ({ visibility, width, content }): JSX.Element => (
    <EstimateTimeCounterBarContainer
        ifActive = {visibility}
    >
        <EstimateTimeCounterBarLine>
            {content} {width} %
        </EstimateTimeCounterBarLine>
        <EstimateTimeCounterBarActiveElement
            widthCSS = {width}
        />
    </EstimateTimeCounterBarContainer>
);

export default EstimateTimeCounterBar;