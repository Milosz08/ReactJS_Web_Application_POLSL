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

import styled, { css } from 'styled-components';
import { SiJava } from 'react-icons/all';

export const ComponentToPrintContainer = styled.div`
    margin: 50px;
    font-size: .9rem;
`;

export const ComponentToPrintHeader = styled.header`
    border: 1px solid var(--darkGrayTint3);
    text-align: center;
`;

export const ComponentToPrintRow = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px 0 12px 0;
    font-size: 1rem;
`;

export const ComponentToPrintDates = styled(ComponentToPrintRow)`
    font-size: .8rem;
    padding: 4px 0 5px 0;
    background-color: var(--darkGrayTint3);
`;

const BasicTableElements = () => css`
    border-spacing: 0;
    border: 1px solid var(--darkGrayTint3);
    border-collapse: collapse;
`;

export const ComponentToPrintTable = styled.table`
    ${BasicTableElements()};
    width: 100%;
    font-size: .9rem;
    margin-top: 10px;
`;

export const ComponentToPrintTh = styled.th`
    ${BasicTableElements()};
    padding: 15px 10px;
    text-align: left;
`;

export const ComponentToPrintTd = styled.td`
    ${BasicTableElements()};
    padding: 15px 10px;
    text-align: left;
`;

export const ComponentToPrintWeekDays = styled.th`
    ${BasicTableElements()};
    background-color: var(--darkGrayTint3);
    text-transform: capitalize;
    font-weight: 500;
    padding: 5px;
`;

export const ComponentToPrintInfoContainer = styled.div`
    margin-top: 20px;
`;

export const ComponentToPrintJavaIcon = styled(SiJava)`
    margin: 0 3px 0 8px;
    font-size: 1rem;
`;

export const ComponentToPrintSeparator = styled.tr`
    width: 100%;
    height: 10px;
    background-color: var(--darkGrayTint3);
`;