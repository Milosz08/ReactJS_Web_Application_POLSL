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
import { UserLogoutModalEstimateCounter, UserLogoutModalLogoutInfo, UserLogoutModalSections } from '../UserLogoutModal.styles';

interface PropsProvider {
    estimate: number;
}

/**
 * Component responsible for generate user logout preferences info and estimate counter.
 *
 * @param estimate { number } - time until close modal.
 */
const UserLogoutModalInfo: React.FC<PropsProvider> = ({ estimate }): JSX.Element => (
    <UserLogoutModalSections>
        <UserLogoutModalLogoutInfo>
            Nastąpiło udane wylogowanie z systemu.
        </UserLogoutModalLogoutInfo>
        <UserLogoutModalEstimateCounter>
            Okno zamknie się automatycznie za: <strong>{estimate}</strong> sekund.
        </UserLogoutModalEstimateCounter>
    </UserLogoutModalSections>
);

export default UserLogoutModalInfo;