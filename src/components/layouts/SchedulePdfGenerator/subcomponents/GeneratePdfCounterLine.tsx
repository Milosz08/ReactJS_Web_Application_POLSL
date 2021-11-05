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
    SchedulePdfGenerateActiveBar, SchedulePdfGenerateBarContainer, SchedulePdfGenerateBarLine
} from '../SchedulePdfGenerator.styles';

interface PropsProvider {
    visibility: boolean;
    width: number;
}

/**
 * Component responsible for generate progress bar line, counting to generate pdf schedule.
 */
const GeneratePdfCounterLine: React.FC<PropsProvider> = ({ visibility, width }): JSX.Element => (
    <SchedulePdfGenerateBarContainer
        ifActive = {visibility}
    >
        <SchedulePdfGenerateBarLine>
            {width}%
        </SchedulePdfGenerateBarLine>
        <SchedulePdfGenerateActiveBar
            widthCSS = {width}
        />
    </SchedulePdfGenerateBarContainer>
);

export default GeneratePdfCounterLine;