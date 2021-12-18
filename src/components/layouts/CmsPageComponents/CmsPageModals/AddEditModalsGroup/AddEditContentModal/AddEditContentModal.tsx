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

import useModalShowHide from '../../../../../../helpers/hooks/useModalShowHide';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ModalsInitialTypes } from '../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsActions } from '../../../../../../redux/modalsReduxStore/types';

import { AddEditContentModalContainer, AddEditContentModalWrapper } from './AddEditContentModal.styles';
import { IconFamiliesType } from '../../../../../../helpers/componentsAndMiddleware/IconComponent';

const UniversalHeader = React.lazy(() => import('../../../../UniversalHeader/UniversalHeader'));
const AddEditContentModalButtons = React.lazy(() => import('./subcomponents/AddEditContentModalButtons'));

interface PropsProvider {
    modalType: allModals;
    RenderCustomComponent: React.FC<{ modalData: object }>;
}

/**
 * Component responsible for generating basic structure for add/edit content modal in CMS panel.
 *
 * @param modalType { allModals } - typeof modal.
 * @param RenderCustomComponent { React.FC<{ modaldata: object }>> } - customised component.
 */
const AddEditContentModal: React.FC<PropsProvider> = ({ modalType, RenderCustomComponent }): JSX.Element => {

    const initialTypes: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const modalObject = initialTypes[modalType];

    const currentModeIsEdit: boolean = modalObject.action === allModalsActions.EDIT_ELEMENT;
    const currentModeIsAdd: boolean = modalObject.action === allModalsActions.ADD_ELEMENT;

    const [ modal, background ] = useModalShowHide(modalObject.ifOpen && (currentModeIsEdit || currentModeIsAdd));

    return (
        <AddEditContentModalContainer
            ref = {background}
        >
            <AddEditContentModalWrapper
                ref = {modal}
            >
                <UniversalHeader
                    iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUsersCog' }}
                    ifCloseButtonVisible = {false}
                    content = {`${currentModeIsAdd ? 'Dodaj' : 'Modyfikuj'} ${modalObject.titleContent}`}
                    changeIconSize = '1em'
                />
                <RenderCustomComponent
                    modalData = {modalObject}
                />
                <AddEditContentModalButtons
                    modalType = {modalType}
                    title = {modalObject.pageTitle}
                    mode = {modalObject.action}
                    id = {modalObject.dataID}
                />
            </AddEditContentModalWrapper>
        </AddEditContentModalContainer>
    );
};

export default AddEditContentModal;