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
import { MdSettingsBackupRestore } from 'react-icons/all';

import { ModalBackground, ModalContainer } from '../../../styles/mixins.styles';

export const ScheduleClearModalContainer = styled.section`
    ${ModalBackground({ _width: 800 })};
`;

export const ScheduleClearModalWrapper = styled.div`
    ${ModalContainer({ _width: 800 })};
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 830px) {
        margin: 0 20px 20px;
        padding: 30px;
    }
`;

export const ScheduleClearModalSections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MdSettingsBackupRestoreIconComponent = styled(MdSettingsBackupRestore)`
    font-size: 5rem;
    color: var(--orangeColor);
    margin: 20px 0;
`;

export const ScheduleClearModalSaveInfo = styled.div`
    font-size: 1.4rem;
    color: var(--navyBlueColor);
    font-weight: 500;
    text-align: center;
`;

export const ScheduleClearModalEstimateCounter = styled.div`
    font-size: 1.7rem;
    margin-top: 30px;
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