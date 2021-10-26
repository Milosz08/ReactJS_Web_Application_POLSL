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
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../redux/sessionReduxStore/initialState';
import { increaseSessionCounter, toggleWarningSessionModal } from '../../../redux/sessionReduxStore/actions';

import { ACTIVITY_EVENTS, MAX_INACTIVITY_TIME } from './SessionSequencer.config';

/**
 * Component that generates a countdown after a successful login (active session time). If the user is not
 * active, it counts down according to the number of minutes in the variable "MAX_INACTIVITY_TIME" After the
 * countdown is over, a modal informing about the end of the session is opened.
 */
const SessionSequencer: React.FC = (): null => {

    const { adminAuthStatus, sessionInfo }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const dispatcher = useDispatch();

    useEffect(() => {
        let index: NodeJS.Timeout;
        let secondsSinceLastActivity: number = 0;
        const maxInactivity: number = (60 * MAX_INACTIVITY_TIME);
        const activity = (): number => secondsSinceLastActivity = 0;

        ACTIVITY_EVENTS.forEach((eventName: string) => document.addEventListener(eventName, activity, true));

        const asyncCountingSession = () => {
            dispatcher(increaseSessionCounter(++secondsSinceLastActivity));
            if (secondsSinceLastActivity > maxInactivity) {
                dispatcher(toggleWarningSessionModal(true));
                secondsSinceLastActivity = 0;
                clearInterval(index);
            }
        };

        if (adminAuthStatus.logged && !sessionInfo.ifModalOpen) {
            index = setInterval(asyncCountingSession, 1000);
        }

        return () => {
            clearInterval(index);
            secondsSinceLastActivity = 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ adminAuthStatus.logged, sessionInfo.ifModalOpen ]);

    return null;
};

export default SessionSequencer;