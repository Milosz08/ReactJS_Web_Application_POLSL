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

import useFindMatchingElement from '../../../../../../../helpers/hooks/useFindMatchingElement';

import { allModals, allModalsActions } from '../../../../../../../redux/modalsReduxStore/types';
import { apiReducerTypes } from '../../../../../../../redux/apiReduxStore/types';
import { HelpersLinksContentTypes } from '../../../../../../../redux/apiReduxStore/dataTypes';

import { CustomContentForHelpersLinksAddEditContainer } from './HelpersLinksAddEdit.styles';

interface PropsProvider {
    modalData: any;
}

/**
 * Component reponsible for generating custom content for high order component for
 * helpers links CMS section page.
 */
const HelpersLinksAddEdit: React.FC<PropsProvider> = ({ modalData }): JSX.Element => {

    const matchElm: HelpersLinksContentTypes | any = useFindMatchingElement(
        allModals.HELPERS_LINKS_MODAL, apiReducerTypes.HELPERS_LINKS
    );

    return (
        <>
            {Boolean(matchElm || modalData.action === allModalsActions.ADD_ELEMENT) && <CustomContentForHelpersLinksAddEditContainer>
                custom content for heleprs links
            </CustomContentForHelpersLinksAddEditContainer>}
        </>
    );
};

export default HelpersLinksAddEdit;