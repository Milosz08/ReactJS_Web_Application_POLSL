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

import useGenerateLoadingLine from '../../../../../helpers/hooks/useGenerateLoadingLine';

import { useDispatch } from 'react-redux';
import { allModals } from '../../../../../redux/modalsReduxStore/types';
import { changeModalStateElements } from '../../../../../redux/modalsReduxStore/actions';

import { DeleteContentButton, DeleteContentButtonsContainer, NotDeleteContentButton } from '../DeleteContentModal.styles';

const EstimateTimeCounterBar = React.lazy(() => import('../../../EstimateTimeCounterBar/EstimateTimeCounterBar'));

interface PropsProvider {
    buttonContent: string;
    modalType: allModals;
    dataID: string | null;
    title: string;
}

/**
 * High Order component responsible for generating manage content buttons (delete and not delete content).
 *
 * @param buttonContent { string } - text content inside buttons.
 * @param modalType { allModals } - type of deleting element (based modal type).
 * @param dataID { string | null } - deleting element database ID (optional null, if ID is not necessary).
 * @param title { string } - page title setting after finished removed data.
 */
const DeleteContentModalButtons: React.FC<PropsProvider> = ({ buttonContent, modalType, dataID, title }): JSX.Element => {

    const dispatcher = useDispatch();

    const handleNotRemoveContentButton = (): void => {
        dispatcher(changeModalStateElements(false, modalType, dataID));
    };

    const afterAsyncCountingCallback = (): void => {
        document.title = 'Zawartość usunięta';
        setTimeout(() => {
            handleNotRemoveContentButton();
            setTimeout(reset, 1000);
        }, 2000);
    };

    const { widthState, show, reset, generatingCounter } = useGenerateLoadingLine(
        afterAsyncCountingCallback, 20, 'Usuwanie zawartości', title
    );

    const handleRemoveContentButton = (): void => {
        generatingCounter();
    };

    return (
        <>
            <DeleteContentButtonsContainer
                ifExtraMargin = {show}
            >
                <NotDeleteContentButton
                    onClick = {handleRemoveContentButton}
                >
                    Usuń {buttonContent}
                </NotDeleteContentButton>
                <DeleteContentButton
                    onClick = {handleNotRemoveContentButton}
                >
                    Pozostaw {buttonContent}
                </DeleteContentButton>
                <EstimateTimeCounterBar
                    visibility = {show}
                    width = {Math.floor(widthState / 20 * 100)}
                    content = 'Usuwanie:'
                />
            </DeleteContentButtonsContainer>
        </>
    );
};

export default DeleteContentModalButtons;