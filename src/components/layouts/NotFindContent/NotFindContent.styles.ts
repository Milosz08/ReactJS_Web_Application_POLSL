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
import { FaRegSadTear } from 'react-icons/all';

export const NotFindContentContainer = styled('div')<{ ifVisible: boolean }>`
    display: ${props => props.ifVisible ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

export const SadFaceIcon = styled(FaRegSadTear)`
    font-size: 5rem;
    color: var(--navyBlueColor);
`;

export const NotFindMainTitle = styled.div`
    margin-top: 30px;
    font-size: 1.4rem;
    text-align: center;
    max-width: 700px;
    width: 100%;
    color: var(--navyBlueColor);
`;

export const NotFindMainTitleStrong = styled.strong`
    color: var(--orangeColor);
    font-weight: 500;
`;