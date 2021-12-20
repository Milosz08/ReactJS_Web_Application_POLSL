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

import { ViewContentModalContainer, ViewContentModalWrapper, ViewModalScrollWrapper } from './ViewContentModal.styles';

const ViewContentModalIconsComponent = React.lazy(() => import('./subcomponents/ViewContentModalIconsComponent'));
const ViewContentModalButtons = React.lazy(() => import('./subcomponents/ViewContentModalButtons'));

interface PropsProvider {
    modalType: allModals;
    RenderCustomComponent: React.FC;
}

/**
 * High order component responsible for generating universal modal responsible for viewing content from CMS.
 *
 * @param modalType { allModals } - viewing content type (based modal type).
 * @param RenderCustomComponent { React.FC } - rendering component with custom structure for different elements.
 */
const ViewContentModal: React.FC<PropsProvider> = ({ modalType, RenderCustomComponent }): JSX.Element => {

    const initialTypes: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const modalObject = initialTypes[modalType];
    const checkIfCurrentModeIsRemove: boolean = modalObject.action === allModalsActions.VIEW_ELEMENT

    const [ modal, background ] = useModalShowHide(modalObject.ifOpen && checkIfCurrentModeIsRemove);

    return (
        <ViewContentModalContainer
            ref = {background}
        >
            <ViewContentModalWrapper
                ref = {modal}
            >
                <ViewModalScrollWrapper>
                    <ViewContentModalIconsComponent
                        viewContentIcon = {modalObject.iconComponent}
                    />
                    <RenderCustomComponent/>
                    <ViewContentModalButtons
                        modalType = {modalType}
                        dataID = {modalObject.dataID}
                    />
                </ViewModalScrollWrapper>
            </ViewContentModalWrapper>
        </ViewContentModalContainer>
    );
};

export default ViewContentModal;