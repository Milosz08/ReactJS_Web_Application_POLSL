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
import { Fragment } from 'react';

import { allModals } from '../../redux/modalsReduxStore/types';

const DeleteContentModal = React.lazy(() => import('../../components/layouts/CmsDeleteModalsGroup/DeleteContentModal/DeleteContentModal'));
const CustomContentForSubjects = React.lazy(() => import('../../components/layouts/CmsDeleteModalsGroup/CutomComponents/CustomContentForSubjects'));
const CustomContentForUserMessages = React.lazy(() => import('../../components/layouts/CmsDeleteModalsGroup/CutomComponents/CustomContentForUserMessages'));
const CustomContentForHelpersLinks = React.lazy(() => import('../../components/layouts/CmsDeleteModalsGroup/CutomComponents/CustomContentForHelpersLinks'));
const CustomContentForCalendar = React.lazy(() => import('../../components/layouts/CmsDeleteModalsGroup/CutomComponents/CustomContentForCalendar'));

/**
 * Helper component responsible for generating all modals structure for CMS system.
 */
const AllModalsStructure: React.FC = (): JSX.Element => {

    const allCustomComponent = [
        CustomContentForSubjects, CustomContentForUserMessages, CustomContentForHelpersLinks, CustomContentForCalendar
    ];

    const generateModalsStructure = Object.keys(allModals).map((key, idx) => (
        <Fragment key = {key} >
            <DeleteContentModal
                modalType = {allModals[key]}
                RenderCustomComponent = {allCustomComponent[idx]}
            />
        </Fragment>
    ));

    return (
        <>
            {generateModalsStructure}
        </>
    );
};

export default AllModalsStructure;