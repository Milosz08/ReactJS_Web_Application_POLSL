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

import { STATIC_DAYS } from '../../../../../helpers/structs/schedule.config';

import { CmsPageContainer } from '../HighOrderComponents/HighOrderComponents.styles';
import { ChangeScheduleCmsPageContainer } from './ChangeScheduleCmsPage.styles';

const SingleScheduleDayElements = React.lazy(() => import('./subcomponents/SingleScheduleDayElements'));

/**
 * Component responsible for generating all subcomponent and rest of content in schedule subjects CMS section.
 */
const ChangeScheduleCmsPage: React.FC = (): JSX.Element => {

    const generateAllDaysStructure = STATIC_DAYS.map(day => (
        <SingleScheduleDayElements
            key = {day.name}
            day = {day}
        />
    ));

    return (
        <CmsPageContainer>
            <ChangeScheduleCmsPageContainer>
                {generateAllDaysStructure}
            </ChangeScheduleCmsPageContainer>
        </CmsPageContainer>
    );
};

export default ChangeScheduleCmsPage;