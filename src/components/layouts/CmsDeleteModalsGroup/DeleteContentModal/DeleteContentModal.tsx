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

import useModalShowHide from '../../../../helpers/hooks/useModalShowHide';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ModalsInitialTypes } from '../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsActions } from '../../../../redux/modalsReduxStore/types';

import {
    DeleteContentDatabaseID, DeleteContentModalContainer, DeleteContentModalWrapper, DeleteContentTitle
} from './DeleteContentModal.styles';

const DeleteContentModalIconsComponent = React.lazy(() => import('./subcomponents/DeleteContentModalIconsComponent'));
const DeleteContentModalButtons = React.lazy(() => import('./subcomponents/DeleteContentModalButtons'));

interface PropsProvider {
    modalType: allModals;
    pageTitle: string;
    RenderCustomComponent: React.FC;
}

/**
 * High order component responsible for generating universal modal responsible for deleting content from CMS.
 *
 * @param modalType { allModals } - deleting content type (based modal type).
 * @param pageTitle { string } - page title setting after finished removed data.
 * @param RenderCustomComponent { React.FC } - rendering component with custom structure for different elements.
 */
const DeleteContentModal: React.FC<PropsProvider> = ({ modalType, pageTitle, RenderCustomComponent }): JSX.Element => {

    const initialTypes: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const modalObject = initialTypes[modalType];
    const checkIfCurrentModeIsRemove: boolean = modalObject.action === allModalsActions.REMOVE_ELEMENT

    const [ modal, background ] = useModalShowHide(modalObject.ifOpen && checkIfCurrentModeIsRemove);

    return (
        <DeleteContentModalContainer
            ref = {background}
        >
            <DeleteContentModalWrapper
                ref = {modal}
            >
                <DeleteContentModalIconsComponent
                    deleteContentIcon = {modalObject.iconComponent}
                />
                <DeleteContentTitle>
                    Usuwanie zawartości <strong>{modalObject.titleContent}</strong> z bazy danych
                </DeleteContentTitle>
                <DeleteContentDatabaseID>
                    Database identifier: {modalObject.dataID || 'Not Find Database Identifier'}
                </DeleteContentDatabaseID>
                <RenderCustomComponent/>
                <DeleteContentModalButtons
                    buttonContent = {modalObject.titleContent}
                    modalType = {modalType}
                    dataID = {modalObject.dataID}
                    title = {pageTitle}
                />
            </DeleteContentModalWrapper>
        </DeleteContentModalContainer>
    );
};

export default DeleteContentModal;