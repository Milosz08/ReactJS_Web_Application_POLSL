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

import useFindMatchingElement from '../../../../../../helpers/hooks/useFindMatchingElement';

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { apiReducerTypes } from '../../../../../../redux/apiReduxStore/types';
import { FooterFormTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import {
    CustomContentAsideText, CustomContentContainer, CustomContentRemoveElementContent, CustomContentRemoveElementTitle,
    DeleteUserMessagesNotReadableIndicator
} from '../DeleteContentModal/DeleteContentModal.styles';

/**
 * Component responsible for generating custom content for delete user message single record modal.
 */
const UserMessagesDelete: React.FC = (): JSX.Element => {

    const matchElm: FooterFormTypes | any  = useFindMatchingElement(
        allModals.USER_MESSAGES_MODAL, apiReducerTypes.USER_MESSAGES
    );

    return (
        <>
            {Boolean(matchElm) && <CustomContentContainer>
                <CustomContentAsideText>
                    Czy na pewno chcesz usunąć
                    <DeleteUserMessagesNotReadableIndicator
                        colorCSS = {matchElm.ifClicked ? 'green' : 'red'}
                    >
                        {matchElm.ifClicked}  {matchElm.ifClicked ? ' odczytaną ' : ' nieodczytaną '}
                    </DeleteUserMessagesNotReadableIndicator>
                    wiadomość od:
                </CustomContentAsideText>
                <CustomContentRemoveElementTitle>
                    {matchElm.userIdentity}
                </CustomContentRemoveElementTitle>
                <CustomContentAsideText>
                    o treści:
                </CustomContentAsideText>
                <CustomContentRemoveElementContent>
                    {matchElm.userMessage}
                </CustomContentRemoveElementContent>
            </CustomContentContainer>}
        </>
    );
};

export default UserMessagesDelete;