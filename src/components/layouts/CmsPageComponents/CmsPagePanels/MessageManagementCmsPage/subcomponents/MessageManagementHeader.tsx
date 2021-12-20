/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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
import { useContext } from 'react';

import useResizeListener from '../../../../../../helpers/hooks/useResizeListener';
import { SearchingContext, SearchingTypes } from '../../../../../../context/searchingContext/SearchingProvider';

import {
    CmsIdElement, CmsListHeaderContainer, CmsSingleListNormalElement
} from '../../HighOrderComponents/HighOrderComponents.styles';

/**
 * Component responsible for generating header structure for user messages CMS page list.
 */
const MessageManagementHeader: React.FC = (): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);

    const width = useResizeListener();

    return (
        <>
            {filteredState?.length !== 0 && <CmsListHeaderContainer>
                <CmsIdElement>
                    lp
                </CmsIdElement>
                <CmsSingleListNormalElement flexBasis = '250px'>
                    imię/nick
                </CmsSingleListNormalElement>
                <CmsSingleListNormalElement
                    ifNotVisible = {width < 680}
                >
                    typ wiadomości
                </CmsSingleListNormalElement>
                <CmsSingleListNormalElement
                    flexBasis = '410px'
                    ifNotVisible = {width < 1080}
                >
                    status
                </CmsSingleListNormalElement>
            </CmsListHeaderContainer>}
        </>
    );
};

export default MessageManagementHeader;