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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';
import { changeAdminLoggedStatus, toggleWarningSessionModal } from '../../../../redux/sessionReduxStore/actions';

import ROUTING_PATH_NAMES from '../../../../helpers/structs/routingPathNames';

import { SessionEndModalButtonsContainer, SessionEndModalLogout, SessionEndModalStaysession } from '../SessionEndModal.styles';

interface PropsProvider {
    logoutCallback: () => void;
}

/**
 * Component resposible for generating end session modal buttons, which provided keep
 * session or logout from the system.
 *
 * @params logoutCallback { () => void } - logout callback function.
 */
const SessionEndModalButtons: React.FC<PropsProvider> = ({ logoutCallback }): JSX.Element => {

    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const dispatcher = useDispatch();

    const handleStaysession = (): void => {
        document.title = ROUTING_PATH_NAMES.CMS_PANEL_PAGE;
        dispatcher(changeAdminLoggedStatus(true, adminAuthStatus.identity));
        dispatcher(toggleWarningSessionModal(false));
    };

    return (
        <SessionEndModalButtonsContainer>
            <SessionEndModalLogout
                onClick = {logoutCallback}
            >
                Wyloguj
            </SessionEndModalLogout>
            <SessionEndModalStaysession
                onClick = {handleStaysession}
            >
                Przedłuż sesję
            </SessionEndModalStaysession>
        </SessionEndModalButtonsContainer>
    );
};

export default SessionEndModalButtons;