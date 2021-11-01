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
    ScheduleSaveModalEstimateCounter, ScheduleSaveModalSaveInfo, ScheduleSaveModalSections
} from '../ScheduleSaveModal.styles';

interface PropsProvider {
    estimate: number;
}

/**
 * Component responsible for generate schedule save preferences info and estimate counter.
 *
 * @param estimate { number } - time until close modal.
 */
const ScheduleSaveModalInfo: React.FC<PropsProvider> = ({ estimate }): JSX.Element => (
    <ScheduleSaveModalSections>
        <ScheduleSaveModalSaveInfo>
            Twoje preferencje zostały zapisane.
        </ScheduleSaveModalSaveInfo>
        <ScheduleSaveModalEstimateCounter>
            Okno zamknie się automatycznie za: <strong>{estimate}</strong> sekund.
        </ScheduleSaveModalEstimateCounter>
    </ScheduleSaveModalSections>
);

export default ScheduleSaveModalInfo;