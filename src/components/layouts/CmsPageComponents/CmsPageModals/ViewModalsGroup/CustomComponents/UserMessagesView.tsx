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

import useFindMatchingElement from '../../../../../../helpers/hooks/useFindMatchingElement';

import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { apiReducerTypes } from '../../../../../../redux/apiReduxStore/types';
import { FooterFormTypes } from '../../../../../../redux/apiReduxStore/dataTypes';

import { CustomContentContainer } from '../../DeleteModalsGroup/DeleteContentModal/DeleteContentModal.styles';
import { ViewContentElement, ViewContentElementContent, ViewContentTitleHeader } from '../ViewContentModal/ViewContentModal.styles';

/**
 * Component responsible for generating custom content for view user message single record modal.
 */
const UserMessagesView: React.FC = (): JSX.Element => {

    const matchElm: FooterFormTypes | any = useFindMatchingElement(
        allModals.USER_MESSAGES_MODAL, apiReducerTypes.USER_MESSAGES
    );

    return (
        <>
            {Boolean(matchElm) && <CustomContentContainer>
                <ViewContentTitleHeader>
                    Przeglądasz wiadomość od użytkownika: <strong>{matchElm.userIdentity}</strong>
                </ViewContentTitleHeader>
                <ViewContentElement>
                    Data wysłania wiadomości: <strong>{matchElm.servletTime.fullDate}, {matchElm.servletTime.fullTime}</strong>
                </ViewContentElement>
                <ViewContentElement>
                    Typ wiadomości: <strong>{matchElm.userChoice}</strong>
                </ViewContentElement>
                <ViewContentElementContent>
                    {matchElm.userMessage}
                </ViewContentElementContent>
            </CustomContentContainer>}
        </>
    );
};

export default UserMessagesView;