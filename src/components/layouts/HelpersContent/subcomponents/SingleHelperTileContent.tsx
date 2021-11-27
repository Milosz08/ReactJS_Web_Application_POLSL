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

import IconComponent from '../../../../helpers/componentsAndMiddleware/IconComponent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { HelpersLinksContentTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';

import {
    SingleHelperTileAnchor, SingleHelperTileAnchorArrow, SingleHelperTileAnchorIconWrapper, SingleHelperTileAnchorTitle
} from '../HelpersContent.styles';
import CryptoJS, { AES } from 'crypto-js';

interface PropsProvider {
    tile: HelpersLinksContentTypes;
}

/**
 * Component responsible for generating single help tile structure.
 */
const SingleHelperTileContent: React.FC<PropsProvider> = ({ tile }): JSX.Element => {

    const { userLoggedStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const hashKey: string = process.env.REACT_APP_HASH_CODE ? process.env.REACT_APP_HASH_CODE : '';
    const encryptedPath: string = CryptoJS.enc.Utf8.stringify(AES.decrypt(tile.helperLink, hashKey));

    return (
        <SingleHelperTileAnchor
            href = {userLoggedStatus ? encryptedPath : '/'}
            target = '_blank'
            rel = 'noreferrer'
        >
            <SingleHelperTileAnchorIconWrapper>
                <IconComponent
                    family = {tile.helperIcon.family}
                    name = {tile.helperIcon.name}
                />
            </SingleHelperTileAnchorIconWrapper>
            <SingleHelperTileAnchorTitle>
                {tile.helperTitle}
            </SingleHelperTileAnchorTitle>
            <SingleHelperTileAnchorArrow/>
        </SingleHelperTileAnchor>
    );
};

export default SingleHelperTileContent;