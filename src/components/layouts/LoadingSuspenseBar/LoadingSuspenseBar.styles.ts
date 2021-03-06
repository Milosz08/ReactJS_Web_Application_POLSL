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

import styled from 'styled-components';

export const LoadingSuspenseBarContainer = styled('div')<{ ifVisible: boolean }>`
    display: ${props => props.ifVisible ? 'block' : 'none'};
    width: 100%;
    height: 3px;
    background-color: var(--navyBlueColor);
`;

export const LoadingProgressBar = styled('div').attrs(props => ({
    style: {
        width: `${props.widthValue}%`
    }
}))<{ ifVisible: boolean }>`
    display: ${props => props.ifVisible ? 'block' : 'none'};
    background-color: var(${props => props.ifVisible ? '--orangeColor' : '--navyBlueColor'});
    height: 100%;
    width: 0;
`;