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
import { ModalBackground, ModalContainer } from '../../../styles/mixins.styles';
import { BiCheckDouble } from 'react-icons/all';

export const ScheduleSaveModalContainer = styled.section`
    ${ModalBackground({ _width: 800 })};
`;

export const ScheduleSaveModalWrapper = styled.div`
    ${ModalContainer({ _width: 800 })};
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 830px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const ScheduleSaveModalSections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BiCheckDoubleIconComponent = styled(BiCheckDouble)`
    font-size: 6rem;
    color: var(--orangeColor);
    margin: 20px 0;
`;

export const ScheduleSaveModalSaveInfo = styled.div`
    font-size: 1.4rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    text-align: center;
`;

export const ScheduleSaveModalEstimateCounter = styled.div`
    font-size: 1.7rem;
    margin: 30px 0 40px;
    color: var(--navyBlueColor);
    font-weight: 400;
    strong {
        font-weight: 600;
    }
    @media only screen and (max-width: 830px) {
        margin: 30px 0;
        text-align: center;
    }
`;