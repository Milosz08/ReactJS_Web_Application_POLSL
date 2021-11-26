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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';

import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { HelpersLinksContentTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { AllHelpersTilesContainer, HelpersForbiddenSection } from '../HelpersContent.styles';

const SingleHelperTileContent = React.lazy(() => import('./SingleHelperTileContent'));

/**
 * Component responsible for generating all helpers tiles component on helpers page.
 */
const AllHelpersTilesContent: React.FC = (): JSX.Element => {

    const { helpersLinks }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { userLoggedStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const generateAllTiles = helpersLinks.map((helper: HelpersLinksContentTypes): JSX.Element => (
        <SingleHelperTileContent
            key = {helper.helperTitle}
            tile = {helper}
        />
    ));

    return (
        <AllHelpersTilesContainer>
            {!userLoggedStatus && <HelpersForbiddenSection/>}
            {generateAllTiles}
        </AllHelpersTilesContainer>
    );
};

export default AllHelpersTilesContent;