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

import { useDispatch } from 'react-redux';
import { ModalsActions } from '../../../../redux/modalsReduxStore/actions';
import { allModals, allModalsActions } from '../../../../redux/modalsReduxStore/types';

import { CmsAddNewContentButtonStyles } from './CmsAddNewContentButton.styles';

interface PropsProvider {
    modalType: allModals;
    content?: string;
}

/**
 * Component responsible for generating button which add new content into specific
 * CMS subpage component. Connected with Redux dispatcher function.
 *
 * @param modalType { allModals } - passed modal enum type element.
 * @param content { ?string } - string aside text content.
 */
const CmsAddNewContentButton: React.FC<PropsProvider> = ({ modalType, content }): JSX.Element => {

    const dispatcher = useDispatch();

    const handleAddNewContent = (): void => {
        dispatcher(ModalsActions.changeModalStateElements(true, modalType, null, allModalsActions.ADD_ELEMENT));
    };

    return (
        <CmsAddNewContentButtonStyles
            title = {`Kliknij, aby dodać nowy ${content}`}
            onClick = {handleAddNewContent}
        >
            Dodaj nowy {content}
        </CmsAddNewContentButtonStyles>
    );
};

export default CmsAddNewContentButton;