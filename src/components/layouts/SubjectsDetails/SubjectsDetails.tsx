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

import { SubjectDetailsWindowContainer, SubjectsDetailsContainer, SubjectsDetailsWrapper } from './SubjectsDetails.styles';

import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';
import UniversalHeader from '../UniversalHeader/UniversalHeader';
import NextPrevArrowNavigation, { arrowDirs } from './subcomponents/NextPrevArrowNavigation';
import SubjectInfoContent from './subcomponents/SubjectInfoContent';

/**
 * Component responsible for generate single subject details section.
 */
const SubjectsDetails: React.FC = (): JSX.Element => (
    <SubjectsDetailsContainer>
        <SubjectsDetailsWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaUniversity' }}
                content = 'Szczegółowe Informacje'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.6rem'
            />
        </SubjectsDetailsWrapper>
        <SubjectDetailsWindowContainer>
            <NextPrevArrowNavigation
                dir = {arrowDirs.PREV}
            />
            <SubjectInfoContent/>
            <NextPrevArrowNavigation
                dir = {arrowDirs.NEXT}
            />
        </SubjectDetailsWindowContainer>
    </SubjectsDetailsContainer>
);

export default SubjectsDetails;