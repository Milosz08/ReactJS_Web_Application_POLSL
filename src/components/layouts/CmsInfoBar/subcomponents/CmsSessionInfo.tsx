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
import { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';

import { CmsHamburgerMenuElement } from '../CmsInfoBar.styles';
import useCountingFromUpToDown from '../../../../helpers/hooks/useCountingFromUpToDown';
import { RANGS_NAMES } from '../../../../helpers/structs/cmsSystem.config';

/**
 * Component responsible for show basic CMS user session info (auth level, and session estimated time).
 */
const CmsSessionInfo: React.FC = (): JSX.Element => {

    const { adminAuthStatus, sessionInfo }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const upToDown = useCountingFromUpToDown(sessionInfo.adminSessionCounter);

    return (
        <Fragment>
            <CmsHamburgerMenuElement>
                Zalogowany jako: <strong>{RANGS_NAMES[adminAuthStatus.identity]}</strong>
            </CmsHamburgerMenuElement>
            <CmsHamburgerMenuElement>
                Pozostały czas sesji: <strong>{upToDown}</strong>
            </CmsHamburgerMenuElement>
        </Fragment>
    );
};

export default CmsSessionInfo;