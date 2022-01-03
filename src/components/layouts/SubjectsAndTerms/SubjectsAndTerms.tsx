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
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { SubjectsAndTermsContainer, SubjectsAndTermsWrapper } from './SubjectsAndTerms.styles';

const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));
const UniversalInfoSection = React.lazy(() => import('../UniversalInfoSection/UniversalInfoSection'));
const SubjectsAndTermsOuterLinks = React.lazy(() => import('./subcomponents/SubjectsAndTermsOuterLinks'));

/**
 * Component responsible for generating syllabuses and subjects details info components.
 */
const SubjectsAndTerms: React.FC = (): JSX.Element => (
    <SubjectsAndTermsContainer>
        <SubjectsAndTermsWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaFileArchive' }}
                content = 'Karty i Sylabusy przedmiotów'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.4rem'
            />
            <UniversalInfoSection
                headerContent = 'Zewnętrzne przekierowanie'
                marginTop = {20}
                marginBottom = {30}
            >
                Wszystkie karty przedmiotów, w których zawarte są opisy wymaganych umiejętności przed zaliczeniem
                przedmiotu, umiejętności nabyte podczas odbywania przedmiotu, oraz umiejętności niezbędne do zdania
                przedmiotu, znajdziesz na oficjalnej stronie <strong>Wydziału Elektrycznego Politechniki Śląskiej</strong>.
                <SubjectsAndTermsOuterLinks/>
            </UniversalInfoSection>
        </SubjectsAndTermsWrapper>
    </SubjectsAndTermsContainer>
);

export default SubjectsAndTerms;