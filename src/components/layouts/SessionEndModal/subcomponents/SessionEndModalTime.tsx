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

import IconComponent, { IconFamiliesType } from '../../../../helpers/componentsAndMiddleware/IconComponent';
import useWarningLogout from '../../../../helpers/hooks/useWarningLogout';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';

import { MAX_INACTIVITY_TIME, MODAL_REMAIN_SECONDS } from '../../SessionSequencer/SessionSequencer.config';

import {
    SessionEndModalCountingDown, SessionEndModalTextInfo, SessionEndModalTimeContainer, SessionEndModalTimeIconWrapper
} from '../SessionEndModal.styles';

interface PropsProvider {
    logoutCallback: () => void;
}

/**
 * Component responsible for generating main content in session end warning modal (hourglass animation,
 * and basic data getting from redux store).
 *
 * @params logoutCallback { () => void } - logout callback function.
 */
const SessionEndModalTime: React.FC<PropsProvider> = ({ logoutCallback }): JSX.Element => {

    const { sessionInfo }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const [ timerValue, hourglass ] = useWarningLogout(sessionInfo.ifModalOpen, MODAL_REMAIN_SECONDS, logoutCallback);

    return (
        <SessionEndModalTimeContainer>
            <SessionEndModalTimeIconWrapper>
                <IconComponent
                    family = {IconFamiliesType.FontAwesomeIcons}
                    name = {hourglass}
                />
            </SessionEndModalTimeIconWrapper>
            <SessionEndModalTextInfo>
                Byłeś/byłaś nieaktywny/nieaktywna przez {MAX_INACTIVITY_TIME} minut. W celu ochrony systemu przed
                wprowadzeniem danych przez nieautoryzowanych użytkowników nastąpi automatyczne
                wylogowanie z systemu.
            </SessionEndModalTextInfo>
            <SessionEndModalCountingDown>
                Pozostało {timerValue} sekund do automatycznego wylogowania z systemu.
            </SessionEndModalCountingDown>
        </SessionEndModalTimeContainer>
    );
};

export default SessionEndModalTime;