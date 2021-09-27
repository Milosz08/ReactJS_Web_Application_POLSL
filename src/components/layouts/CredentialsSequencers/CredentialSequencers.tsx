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

import React, { Fragment, useContext } from 'react';
import { LoginSessionContext } from '../../../contextStore/LoginSessionProvider';

const SessionActivityCount = React.lazy(() => import('./SessionActivityCount'));

/**
 * @details The component is responsible for generating timers counting down the time of an active
 *          user/moderator/administrator session. In the present case, only a timer counting down the session time
 *          of the administrator / moderator of the content management system (CMS) is implemented.
 *          The component uses React Context. Extendable component.
 */
const CredentialSequencers = (): JSX.Element => {

    const { adminAuth } = useContext<any>(LoginSessionContext);

    return (
        <Fragment>
            <SessionActivityCount authCredentialPerson = {adminAuth}/>
        </Fragment>
    );
}

export default CredentialSequencers;