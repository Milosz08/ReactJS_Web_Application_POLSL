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

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { HelpersLinksContentTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import {
    CmsIdElement, CmsSingleListNormalElement, CmsUnorderedListElement
} from '../../HighOrderComponents/HighOrderComponents.styles';

const SingleElementButtons = React.lazy(() => import('../../HighOrderComponents/SingleElementButtons'));

interface PropsProvider {
    element: HelpersLinksContentTypes;
    index: number;
}

/**
 * Component responsible for generating single list element structure in CMS panel calendar section.
 *
 * @param element { CalendarContentTypes } - single tile object element.
 * @param index { number } - single tile index in global array.
 */
const HelpersLinksSingleListElement: React.FC<PropsProvider> = ({ element, index }): JSX.Element => (
    <CmsUnorderedListElement>
        <CmsIdElement ifNotHeader = {true}>
            {index + 1}
        </CmsIdElement>
        <CmsSingleListNormalElement>
            {element.helperTitle}
        </CmsSingleListNormalElement>
        <SingleElementButtons
            dataID = {element._id}
            modalTypeEnum = {allModals.HELPERS_LINKS_MODAL}
            ifViewmodeActive = {false}
        />
    </CmsUnorderedListElement>
);

export default HelpersLinksSingleListElement;