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

import useResizeListener from '../../../../../../helpers/hooks/useResizeListener';

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { ScheduleContentTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import {
    CmsIdElement, CmsSingleListNormalElement, CmsUnorderedListElement
} from '../../HighOrderComponents/HighOrderComponents.styles';

const SingleElementButtons = React.lazy(() => import('../../HighOrderComponents/SingleElementButtons'));

interface PropsProvider {
    element: ScheduleContentTypes,
    index: number;
    day: string;
}

/**
 * Component responsible for generating single subject list tile in schedule day of weeks multiple list elements.
 */
const ChangeScheduleSingleListElement: React.FC<PropsProvider> = ({ element, index, day }): JSX.Element => {

    const width = useResizeListener();

    return (
        <CmsUnorderedListElement>
            <CmsIdElement ifNotHeader = {true}>
                {index + 1}
            </CmsIdElement>
            <CmsSingleListNormalElement>
                {element.title}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                flexBasis = '200px'
                ifNotVisible = {width < 1250}
            >
                {element.startHour} - {element.endHour}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                flexBasis = '200px'
                ifNotVisible = {width < 1250}
            >
                {element.classesInfo.type}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                flexBasis = '200px'
                ifNotVisible = {width < 1250}
            >
                {element.group}
            </CmsSingleListNormalElement>
            <SingleElementButtons
                dataID = {element._id}
                modalTypeEnum = {allModals.SCHEDULE_MODAL}
                ifViewmodeActive = {false}
                day = {day}
            />
        </CmsUnorderedListElement>
    );
};

export default ChangeScheduleSingleListElement;