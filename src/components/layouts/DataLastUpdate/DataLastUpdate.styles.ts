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

export const DataLastUpdateContainer = styled.section`
    display: flex;
    justify-content: flex-end;
    margin: 30px 0 40px 0;
    @media only screen and (max-width: 1250px) {
        justify-content: center;
    }
`;

export const DataLastUpdateParagraph = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    @media only screen and (max-width: 1250px) {
        margin: 0 30px 0 15px;
    }
`;