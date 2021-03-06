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

import { MAX_INJECTIONS } from '../../../../../../helpers/structs/calendar.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs, modalInputHeader } from '../../../../../../redux/modalsReduxStore/types';

import {
    MultipleInjectionContainer, SingleInjectionContainer, SingleInjectionCustomContentWrapper, SingleInjectionRemoveElementButton
} from './HighOrderComponents.styles';

import { CmsAddNewContentButtonStyles } from '../../../CmsAddNewContentButton/CmsAddNewContentButton.styles';
import { CmsSingleListRemoveButtonTime } from '../../../CmsPagePanels/HighOrderComponents/HighOrderComponents.styles';

interface PropsProvider {
    modalType: allModals;
    elementKey: allModalsInputs;
    insertObj: object;
    insertErrObj: object;
    CustomComponent: React.FC<{ tileIdx: number }>;
    addContent?: string;
    ifBorderInactive?: boolean;
    ifSmallMargins?: boolean;
    maxInjcts?: number;
}

/**
 * High order component resposible for generating and managing list elements in choose modal.
 *
 * @param modalType { allModals } - type of modal.
 * @param elementKey { allModalsInputs } - modal initial state object key.
 * @param insertObj { object } - inserting object into redux state array.
 * @param insertErrObj { object } - inserting errors object into redux state array.
 * @param CustomComponent { React.FC<{ tileIdx: number }>> } - generating custom React component.
 * @param addContent { string? } - additional text value in button.
 * @param ifBorderInactive { boolean? } - show or hide border aroung custom element.
 * @param ifSmallMargins
 * @param maxInjcts
 */
const ItemsListMultipleInjection: React.FC<PropsProvider> = ({
    modalType, elementKey, insertObj, insertErrObj, CustomComponent, addContent, ifBorderInactive, ifSmallMargins, maxInjcts
}): JSX.Element => {

    const modals: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const elements = modals[modalType].modalInputFields![elementKey];

    const maxInjections = maxInjcts || MAX_INJECTIONS;
    const maxInj: boolean = maxInjections - elements.length === 0;

    const dispatcher = useDispatch();

    const handleAddNewContent = () => {
        if (elements.length < maxInjections) {
            dispatcher(ModalsActions.addElementIntoArray(modalType, elementKey, insertObj));
            dispatcher(ModalsActions.addElementIntoArray(modalType, elementKey, insertErrObj, modalInputHeader.ERROR));
        }
    };

    const handleRemoveContent = (idx: number) => {
        dispatcher(ModalsActions.removeElementFromArray(modalType, elementKey, idx));
        dispatcher(ModalsActions.removeElementFromArray(modalType, elementKey, idx, modalInputHeader.ERROR));
    };

    const generateSingleInjection = Boolean(elements) ? elements.map((tile: any, idx: number) => (
        <SingleInjectionContainer
            ifBorderInactive = {ifBorderInactive}
            ifSmallMargins = {ifSmallMargins}
            key = {idx}
        >
            <SingleInjectionCustomContentWrapper
                ifSmallMargins = {ifSmallMargins}
            >
                <CustomComponent
                    tileIdx = {idx}
                />
            </SingleInjectionCustomContentWrapper>
            {idx !== 0 && <SingleInjectionRemoveElementButton
                onClick = {() => handleRemoveContent(idx)}
                title = 'Usuń element'
            >
                <CmsSingleListRemoveButtonTime/>
            </SingleInjectionRemoveElementButton>}
        </SingleInjectionContainer>
    )) : null;

    return (
        <MultipleInjectionContainer>
            {generateSingleInjection}
            <CmsAddNewContentButtonStyles
                title = {maxInj ? `Wprowadzono maksymalną liczbę elementów.` : `Kliknij, aby dodać nowy ${addContent}`}
                onClick = {handleAddNewContent}
                disabled = {maxInj}
                ifSmallMargins = {ifSmallMargins}
            >
                Dodaj nowy {addContent} ({maxInjections - elements.length}/{maxInjections})
            </CmsAddNewContentButtonStyles>
        </MultipleInjectionContainer>
    );
};

export default ItemsListMultipleInjection;