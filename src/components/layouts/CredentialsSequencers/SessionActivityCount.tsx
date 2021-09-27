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

import React, { useContext, useEffect } from 'react';
import { GlobalModalsStateContext } from '../../../contextStore/GlobalModalsStateProvider';

/**
 * Maximum session time (inactivity on the part of the user). Exported variable.
 */
export const MAX_INACTIVITY_TIME: number = 5;

/**
 * A string array that stores every possible event (user interaction with the page). Used to reset the timer.
 */
const ACTIVITY_EVENTS: string[] = [
    'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'
];

/**
 * Interface defining the type of props.
 */
interface PropsProvider {
    authCredentialPerson: boolean;
}

/**
 * @details Component that generates a countdown after a successful login (active session time). If the user is not
 *          active, it counts down according to the number of minutes in the variable "MAX_INACTIVITY_TIME" After the
 *          countdown is over, a modal informing about the end of the session is opened (you can reset it or
 *          manually log out of the system).
 *
 * @param adminAuth { boolean } - props deciding whether the countdown is to be run for a user or an administrator.
 */
const SessionActivityCount: React.FC<PropsProvider> = ({ authCredentialPerson }): null => {

    const { adminSessionInfo, setAdminSessionInfo } = useContext<any>(GlobalModalsStateContext);

    useEffect(() => {
        let index: NodeJS.Timeout;
        let secondsSinceLastActivity: number = 0;
        const maxInactivity: number = (60 * MAX_INACTIVITY_TIME);
        const activity = (): number => secondsSinceLastActivity = 0;

        ACTIVITY_EVENTS.forEach((eventName: string) => document.addEventListener(eventName, activity, true));

        const asyncCountingSession = () => {
            secondsSinceLastActivity++;
            setAdminSessionInfo({ ...adminSessionInfo, counter: secondsSinceLastActivity });
            if (secondsSinceLastActivity > maxInactivity) {
                setAdminSessionInfo({ ...adminSessionInfo, modalOpen: true });
                secondsSinceLastActivity = 0;
                clearInterval(index);
            }
        }

        if (authCredentialPerson && !adminSessionInfo.modalOpen) {
            index = setInterval(asyncCountingSession, 1000);
        }

        return () => {
            secondsSinceLastActivity = 0;
            clearInterval(index);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ authCredentialPerson, adminSessionInfo.modalOpen ]);

    return null;
}

export default SessionActivityCount;