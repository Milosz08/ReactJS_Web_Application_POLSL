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

import usePageTitle from '../../../helpers/hooks/usePageTitle';
import ROUTING_PATH_NAMES from '../../../helpers/structs/routingPathNames';

import { CommonPaginationContainer, CommonPaginationWrapper } from './subcomponents/CommonPagination.styles';

const CommonComponents = React.lazy(() => import('./subcomponents/CommonComponents'));

/**
 * Component responsible for generating CMS subpage for controlled subjects.
 */
const SubjectsCmsSectionPage: React.FC = (): JSX.Element => {

    const { SUBJECT_CMS_PAGE, CMS_PANEL_PAGE } = ROUTING_PATH_NAMES;
    usePageTitle(SUBJECT_CMS_PAGE, CMS_PANEL_PAGE);

    return (
        <>
            <CommonComponents/>
            <CommonPaginationContainer>
                <CommonPaginationWrapper>
                    SubjectsCmsSectionPage
                </CommonPaginationWrapper>
            </CommonPaginationContainer>
        </>
    );
};

export default SubjectsCmsSectionPage;