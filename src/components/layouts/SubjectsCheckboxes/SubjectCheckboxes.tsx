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

import { updateSections } from '../../../redux/apiReduxStore/types';
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { SubjectsCheckboxesContainer, SubjectsCheckboxesWrapper } from './SubjectsCheckboxes.styles';

import DataLastUpdate from '../DataLastUpdate/DataLastUpdate';
import UniversalHeader from '../UniversalHeader/UniversalHeader';
import UniversalSearch from '../UniversalSearch/UniversalSearch';
import { searchInputs } from '../../../redux/preferencesReduxStore/types';
import AllCheckboxes from './subcomponents/AllCheckboxes';
import { filteredSubjectsList } from '../../../redux/apiReduxStore/actions';

/**
 * Component responsible for generate subjects tiles section components group.
 */
const SubjectCheckboxes: React.FC = (): JSX.Element => (
    <SubjectsCheckboxesContainer>
        <SubjectsCheckboxesWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaChalkboardTeacher' }}
                content = 'Przedmioty'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.6rem'
            />
            <UniversalSearch
                type = {searchInputs.SUBJECT_SEARCH}
                placeholder = 'Wyszukaj przedmiot'
                filterReducer = {filteredSubjectsList}
            />
            <AllCheckboxes/>
            <DataLastUpdate
                type = {updateSections.SUBJECTS}
                content = 'przedmiotów'
            />
        </SubjectsCheckboxesWrapper>
    </SubjectsCheckboxesContainer>
);

export default SubjectCheckboxes;