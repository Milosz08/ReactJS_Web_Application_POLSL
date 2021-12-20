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

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { FooterFormTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import {
    CmsIdElement, CmsSingleListNormalElement, CmsUnorderedListElement
} from '../../HighOrderComponents/HighOrderComponents.styles';
import useResizeListener from '../../../../../../helpers/hooks/useResizeListener';

const SingleElementButtons = React.lazy(() => import('../../HighOrderComponents/SingleElementButtons'));

interface PropsProvider {
    element: FooterFormTypes;
    index: number;
}

/**
 * Component reponsible for generating single row in cms user messages panel multiple elements list.
 *
 * @param element { FooterFormTypes } - object represent single row.
 * @param index { number } - row index.
 */
const MessageManagementSingleListElement: React.FC<PropsProvider> = ({ element, index }): JSX.Element => {

    const width = useResizeListener();

    return (
        <CmsUnorderedListElement>
            <CmsIdElement ifNotHeader = {true}>
                {index + 1}
            </CmsIdElement>
            <CmsSingleListNormalElement
                flexBasis = {width < 680 ? false : '250px'}
            >
                {element.userIdentity}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                ifNotVisible = {width < 680}
            >
                {element.userChoice}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                flexBasis = '310px'
                colorCSS = {element.ifClicked ? 'green' : 'red'}
                ifNotVisible = {width < 1080}
            >
                {element.ifClicked ? 'odczytana' : 'nieodczytana'}
            </CmsSingleListNormalElement>
            <SingleElementButtons
                dataID = {element._id}
                modalTypeEnum = {allModals.USER_MESSAGES_MODAL}
                ifViewmodeActive = {true}
            />
        </CmsUnorderedListElement>
    );
};

export default MessageManagementSingleListElement;