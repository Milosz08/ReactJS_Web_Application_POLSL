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

import { LEVELS } from '../../../../../../helpers/structs/calendar.config';
import ConvertTimeUTC from '../../../../../../helpers/functionsAndClasses/convertTimeUTC';
import useResizeListener from '../../../../../../helpers/hooks/useResizeListener';

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { CalendarContentTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import {
    ChangeCalendarDotsContainer, ChangeCalendarSingleColorDotElement, CmsIdElement, CmsSingleListNormalElement,
    CmsUnorderedListElement
} from '../../HighOrderComponents/HighOrderComponents.styles';

const SingleElementButtons = React.lazy(() => import('../../HighOrderComponents/SingleElementButtons'));

interface PropsProvider {
    element: CalendarContentTypes;
    index: number;
}

/**
 * Component responsible for generating single list element structure in CMS panel calendar section.
 *
 * @param element { CalendarContentTypes } - single tile object element.
 * @param index { number } - single tile index in global array.
 */
const ChangeCalendarSingleListElement: React.FC<PropsProvider> = ({ element, index }): JSX.Element => {

    const width = useResizeListener();
    const { LOW, MEDIUM } = LEVELS;

    const generateTime = width < 880
        ? `/${element.month}/` : ` ${ConvertTimeUTC.getMonthPolishNameParam(element.month - 1).toLowerCase()} `;

    const generateColorCalendarDots = element.items.map(item => (
        <ChangeCalendarSingleColorDotElement
            key = {item.message}
            colorCSS = {item.importantLevel === LOW ? 'green' : item.importantLevel === MEDIUM ? 'orange' : 'red'}
        />
    ));

    return (
        <>
            <CmsUnorderedListElement>
                <CmsIdElement ifNotHeader = {true}>
                    {index + 1}
                </CmsIdElement>
                <CmsSingleListNormalElement>
                    {element.day}{generateTime}{element.year}
                </CmsSingleListNormalElement>
                <CmsSingleListNormalElement
                    flexBasis = '210px'
                    ifNotVisible = {width < 1080}
                >
                    {element.items.length}
                </CmsSingleListNormalElement>
                <CmsSingleListNormalElement
                    flexBasis = {width < 880 ? '60px' :'360px'}
                    ifNotVisible = {width < 880}
                >
                    <ChangeCalendarDotsContainer>
                        {generateColorCalendarDots}
                    </ChangeCalendarDotsContainer>
                </CmsSingleListNormalElement>
                <SingleElementButtons
                    dataID = {element._id}
                    modalTypeEnum = {allModals.CALENDAR_MODAL}
                    ifViewmodeActive = {false}
                />
            </CmsUnorderedListElement>
        </>
    );
};

export default ChangeCalendarSingleListElement;