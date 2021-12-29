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
import { FiArrowRight } from 'react-icons/all';

import { button_rs } from '../../../../../styles/reset.styles';

export const ChangeScheduleCmsPageContainer = styled.div`
    margin-top: 10px;
`;

export const ChangeScheduleSingleDayElements = styled.div`
    display: block;
`;

export const ChangeScheduleSingleDayHeader = styled(button_rs)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: var(--navyBlueColor);
    color: var(--cleanWhiteColor);
    margin-bottom: 10px;
    padding: 15px 30px;
    font-size: 1.2rem;
    text-transform: capitalize;
    border-radius: 10px;
    text-align: left;
`;

export const ChangeScheduleSingleDayIcon = styled(FiArrowRight)<{ ifActive: boolean }>`
    margin-right: 20px;
    transform: rotate(${({ ifActive }) => ifActive ? '90deg' : 0});
    transition: var(--transitionDuration);
`;

export const ChangeScheduleSingleDayTitle = styled.div``;

export const ChangeScheduleSingleDayCount = styled.div``;