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
import CryptoJS, { AES } from 'crypto-js';

import useFindMatchingElement from '../../../../../../../helpers/hooks/useFindMatchingElement';
import useAutoFilledModalEdit from '../../../../../../../helpers/hooks/useAutoFilledModalEdit';

import { apiReducerTypes } from '../../../../../../../redux/apiReduxStore/types';
import { HelpersLinksContentTypes } from '../../../../../../../redux/apiReduxStore/dataTypes';
import { allModals, allModalsInputs } from '../../../../../../../redux/modalsReduxStore/types';

import { AddEditCustomContentContainer } from '../../AddEditContentModal/AddEditContentModal.styles';

const HelpersLinksInputs = React.lazy(() => import('./subcomponents/HelpersLinksInputs'));

interface PropsProvider {
    modalData: any;
}

/**
 * Component reponsible for generating custom content for high order component for
 * helpers links CMS section page.
 */
const HelpersLinksAddEdit: React.FC<PropsProvider> = (): JSX.Element => {

    const matchElm: HelpersLinksContentTypes | any = useFindMatchingElement(
        allModals.HELPERS_LINKS_MODAL, apiReducerTypes.HELPERS_LINKS
    );

    const hashKey: string = process.env.REACT_APP_HASH_CODE ? process.env.REACT_APP_HASH_CODE : '';
    const { TITLE, ICON, LINK } = allModalsInputs;

    const filledArr = matchElm ? [
        matchElm!.helperTitle, matchElm!.helperIcon.name,
        CryptoJS.enc.Utf8.stringify(AES.decrypt(matchElm!.helperLink, hashKey))
    ] : [ '', '', '' ];

    useAutoFilledModalEdit(allModals.HELPERS_LINKS_MODAL, [ TITLE, ICON, LINK ], filledArr);

    return (
        <AddEditCustomContentContainer>
            <HelpersLinksInputs/>
        </AddEditCustomContentContainer>
    );
};

export default HelpersLinksAddEdit;