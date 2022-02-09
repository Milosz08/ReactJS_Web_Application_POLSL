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
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../redux/sessionReduxStore/initialState';

import { HelpersContentContainer, HelpersContentWrapper } from './HelpersContent.styles';

const UniversalHeader = React.lazy(() => import('../../reusable/UniversalHeader/UniversalHeader'));
const AllHelpersTilesContent = React.lazy(() => import('./subcomponents/AllHelpersTilesContent'));
const LoggedInfoContent = React.lazy(() => import('./subcomponents/LoggedInfoContent'));
const UserLogin = React.lazy(() => import('../UserLogin/UserLogin'));
const HelpersContentLogout = React.lazy(() => import('./subcomponents/HelpersContentLogout'));

/**
 * Component responsible for generating Helpers all subcomponents structure page content.
 */
const HelpersContent: React.FC = (): JSX.Element => {

    const { userLoggedStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    return (
        <HelpersContentContainer>
            <HelpersContentWrapper>
                <UniversalHeader
                    iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaLightbulb' }}
                    content = 'Pomoce Naukowe'
                    ifCloseButtonVisible = {false}
                    changeIconSize = '1.6rem'
                />
                <AllHelpersTilesContent/>
                {userLoggedStatus && <HelpersContentLogout/>}
                {!userLoggedStatus && <>
                    <LoggedInfoContent/>
                    <UserLogin/>
                </>}
            </HelpersContentWrapper>
        </HelpersContentContainer>
    );
};

export default HelpersContent;