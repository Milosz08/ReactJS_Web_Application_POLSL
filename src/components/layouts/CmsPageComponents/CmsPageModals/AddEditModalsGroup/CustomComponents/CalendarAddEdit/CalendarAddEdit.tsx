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

import { LEVELS } from '../../../../../../../helpers/structs/calendar.config';
import useAutoFilledModalEdit from '../../../../../../../helpers/hooks/useAutoFilledModalEdit';
import useFindMatchingElement from '../../../../../../../helpers/hooks/useFindMatchingElement';

import { useDispatch } from 'react-redux';
import { apiReducerTypes } from '../../../../../../../redux/apiReduxStore/types';
import { ModalsActions } from '../../../../../../../redux/modalsReduxStore/actions';
import { CalendarContentTypes } from '../../../../../../../redux/apiReduxStore/dataTypes';
import { initialStateForModalsInputs } from '../../../../../../../redux/modalsReduxStore/singleInitialStates';
import { allModals, allModalsInputs, modalInputHeader } from '../../../../../../../redux/modalsReduxStore/types';

import { AddEditCustomContentContainer } from '../../AddEditContentModal/AddEditContentModal.styles';

const CalendarAddEditDateInput = React.lazy(() => import('./subcomponents/CalendarAddEditDateInput'));
const ItemsListMultipleInjection = React.lazy(() => import('../../HighOrderComponents/ItemsListMultipleInjection'));
const CalendarSingleInject = React.lazy(() => import('./subcomponents/CalendarSingleInject'));

/**
 * Component responsible for generating all calendar modal add/edit custom structure.
 */
const CalendarAddEdit: React.FC = (): JSX.Element => {

    const { CALENDAR_MODAL } = allModals;
    const { DATE, ITEMS } = allModalsInputs;

    const itemSchema = initialStateForModalsInputs[CALENDAR_MODAL].normal.items[0];
    const itemErrSchema = initialStateForModalsInputs[CALENDAR_MODAL].errors.items[0];

    const dispatcher = useDispatch();
    const matchElm: CalendarContentTypes | any = useFindMatchingElement(
        allModals.CALENDAR_MODAL, apiReducerTypes.CALENDAR
    );

    const loadAdditionalContent = (): void => {
        if(matchElm) {
            matchElm!.items.forEach((_: any) => {
                dispatcher(ModalsActions.addElementIntoArray(CALENDAR_MODAL, ITEMS, itemSchema));
                dispatcher(ModalsActions.addElementIntoArray(CALENDAR_MODAL, ITEMS, itemErrSchema, modalInputHeader.ERROR));
            });
        }
    };

    const filledArr = matchElm ? [ matchElm!.dateString, matchElm!.items ] : [ '', '' ];
    useAutoFilledModalEdit(CALENDAR_MODAL, [ DATE, ITEMS ], filledArr, loadAdditionalContent);

    return (
        <AddEditCustomContentContainer>
            <CalendarAddEditDateInput/>
            <ItemsListMultipleInjection
                modalType = {CALENDAR_MODAL}
                elementKey = {allModalsInputs.ITEMS}
                insertObj = {{ start: '', message: '', importantLevel: LEVELS.LOW, }}
                insertErrObj = {{ start: false, message: false }}
                CustomComponent = {CalendarSingleInject}
                addContent = 'wpis'
            />
        </AddEditCustomContentContainer>
    );
};

export default CalendarAddEdit;