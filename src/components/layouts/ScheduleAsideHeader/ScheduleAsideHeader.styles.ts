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
import { StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';

export const ScheduleAsideHeaderContainer = styled.section`
    ${StandardContainer()};
`;

export const ScheduleAsideHeaderWrapper = styled.aside`
    ${StandardSafetyAreaWrapper()};
    margin-bottom: 0;
`;

export const ScheduleAsideHeaderParamsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 30px;
`;

export const ScheduleAsideHeaderParamsWrapper = styled.span`
    font-size: 1.2rem;
    color: var(--darkGrayTint2);
    margin: 20px 0;
    strong {
        font-weight: 500;
        color: var(--navyBlueColor);
        text-transform: capitalize;
    }
`;