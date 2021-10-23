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
import { DisclaimerFooterContainer, DisclaimerTextInfo, SectionSeparator } from '../Footer.styles';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import { FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';

/**
 *
 */
const DisclaimerFooter: React.FC = (): JSX.Element => (
    <DisclaimerFooterContainer>
        <SectionSeparator/>
        <DisclaimerTextInfo>
            Strona nie jest powiązania ani zarządzana przez Politechnikę Śląską. Strona służy jedynie w
            celach informacyjnych dla studentów kierunku Informatyka na wydziale Elektrycznym,
            rozpoczętym w roku akademickim 2020/2021. Administratorzy/Moderatorzy systemu WCMS nie ponoszą
            odpowiedzialności za błędne i/lub nieaktualne dane.
        </DisclaimerTextInfo>
        <DelayRouterLink
            render = {() => 'Logowanie do Panelu Administratora'}
            pathTo = {FRONT_ENDPOINTS.ADMIN_LOGIN}
        />
    </DisclaimerFooterContainer>
);

export default DisclaimerFooter;