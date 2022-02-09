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

import styled from 'styled-components';

import { FiEdit } from 'react-icons/all';
import { a_rs } from '../../../../../styles/reset.styles';
import { CmsSingleListRemoveButtonTime } from '../HighOrderComponents/HighOrderComponents.styles';

export const SelectedCalendarModeListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
`;

export const CalendarTileAddEditButtonsContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    flex-grow: 1;
    bottom: -15px;
    min-height: 80px;
`;

export const CalendarTileAddEditButtonsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid var(--darkGrayTint4);
    @media only screen and (max-width: 500px) {
        height: 80px;
    }
`;

export const CalendarTileAddEditSingleButtonElement = styled(a_rs)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: var(--darkBlueColor);
    min-height: 30px !important;
    width: 30px;
`;

export const CalendarTileEditIcon = styled(FiEdit)`
    font-size: 1.2rem;
`;

export const AddNewContentIcon = styled(CmsSingleListRemoveButtonTime)`
    background-color: var(--navyBlueColor);
    ::after {
        background-color: var(--navyBlueColor);
    }
    transform: rotate(90deg);
`;