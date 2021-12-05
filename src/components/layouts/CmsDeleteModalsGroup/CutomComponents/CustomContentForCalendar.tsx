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

import { LEVELS } from '../../../../helpers/structs/calendar.config';
import ConvertTimeUTC from '../../../../helpers/functionsAndClasses/convertTimeUTC';
import useFindMatchingElement from '../../../../helpers/hooks/useFindMatchingElement';

import { allModals } from '../../../../redux/modalsReduxStore/types';
import { apiReducerTypes } from '../../../../redux/apiReduxStore/types';
import { CalendarContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import {
    CustomContentAsideText, CustomContentContainer, DeleteMultipleCalendarElementsContainer, DeleteSingleCalendarDateElement,
    DeleteSingleCalendarElement,
} from '../DeleteContentModal/DeleteContentModal.styles';

/**
 * Component responsible for generating custom content for delete calendar single record modal.
 */
const CustomContentForCalendar: React.FC = (): JSX.Element => {

    const { LOW, MEDIUM } = LEVELS;

    const matchElm: CalendarContentTypes | any  = useFindMatchingElement(
        allModals.CALENDAR_MODAL, apiReducerTypes.CALENDAR
    );

    const generateDeleteItemsStructure = Boolean(matchElm) ? matchElm.items.map((item: any) => (
        <DeleteSingleCalendarElement
            key = {item.message}
            colorCSS = {item.importantLevel === LOW ? 'green' : item.importantLevel === MEDIUM ? 'darkOrange' : 'red'}
        >
            {item.message}
            <DeleteSingleCalendarDateElement
                colorCSS = {item.importantLevel === LOW ? 'green' : item.importantLevel === MEDIUM ? 'darkOrange' : 'red'}
            >
                Rozpoczęcie aktywności: {item.start}
            </DeleteSingleCalendarDateElement>
        </DeleteSingleCalendarElement>
    )) : null;

    return (
        <>
            {Boolean(matchElm) && <CustomContentContainer>
                <CustomContentAsideText>
                    Czy na pewno chcesz usunąć następujące wpisy w kalendarzu z {' '}
                    {matchElm.day} {ConvertTimeUTC.getMonthPolishNameParam(matchElm.month - 1).toLowerCase()} {matchElm.year}:
                </CustomContentAsideText>
                <DeleteMultipleCalendarElementsContainer>
                    {generateDeleteItemsStructure}
                </DeleteMultipleCalendarElementsContainer>
            </CustomContentContainer>}
        </>
    );
};

export default CustomContentForCalendar;