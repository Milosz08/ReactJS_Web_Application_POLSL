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
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reduxStore';
import { allModals } from '../../../../../redux/modalsReduxStore/types';
import { ApiInitialTypes } from '../../../../../redux/apiReduxStore/initialState';
import { updateFooterFormClicked } from '../../../../../redux/apiReduxStore/actions';
import { changeModalStateElements } from '../../../../../redux/modalsReduxStore/actions';

import { CloseModalContentButton, ViewContentButtonsContainer } from '../ViewContentModal.styles';

const UniversalCheckboxInput = React.lazy(() => import('../../../UniversalCheckboxInput/UniversalCheckboxInput'));

interface PropsProvider {
    modalType: allModals;
    dataID: string | null;
}

/**
 * High Order component responsible for generating manage content buttons (closed modal and select viewied element).
 *
 * @param modalType { allModals } - type of deleting element (based modal type).
 * @param dataID { string | null } - deleting element database ID (optional null, if ID is not necessary).
 */
const ViewContentModalButtons: React.FC<PropsProvider> = ({ modalType, dataID }): JSX.Element => {

    const { footerFormMessages }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const formMessage = footerFormMessages.find(el => el._id === dataID);

    const dispatcher = useDispatch();
    const [ checkboxChecked, setCheckboxChecked ] = useState<boolean>(true);

    const handleUncheckReadMessage = (): void => {
        setCheckboxChecked(prevState => !prevState);
    };

    const handleCloseModal = (): void => {
        dispatcher(changeModalStateElements(false, modalType, dataID));
        if (!formMessage!.ifClicked) {
            dispatcher(updateFooterFormClicked(dataID!, checkboxChecked));
        }
        setTimeout(() => setCheckboxChecked(true), 2000);
    };

    return (
        <ViewContentButtonsContainer>
            <CloseModalContentButton
                onClick = {handleCloseModal}
            >
                Zamnij okno
            </CloseModalContentButton>
            <UniversalCheckboxInput
                changeCheckedCallback = {handleUncheckReadMessage}
                id = 'confirmViewMessage'
                ifChecked = {checkboxChecked}
                labelContent = 'Oznacz wiadomość jako przeczytaną'
            />
        </ViewContentButtonsContainer>
    );
};

export default ViewContentModalButtons;