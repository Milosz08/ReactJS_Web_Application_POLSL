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
import { useContext } from 'react';

import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

import {
    ChangeSubjectsHeaderContainer, ChangeSubjectsIdElement, ChangeSubjectsSemesterElement,
    ChangeSubjectsStatusElement, ChangeSubjectsTitleElement
} from '../ChangeSubjectsCmsPage.styles';

/**
 * Component responsible for generating header content elements for subjects list.
 */
const ChangeSubjectsHeader: React.FC = (): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);

    return (
        <>
            {filteredState?.length !== 0 && <ChangeSubjectsHeaderContainer>
                <ChangeSubjectsIdElement>
                    id
                </ChangeSubjectsIdElement>
                <ChangeSubjectsTitleElement>
                    nazwa przedmiotu
                </ChangeSubjectsTitleElement>
                <ChangeSubjectsSemesterElement>
                    semestry
                </ChangeSubjectsSemesterElement>
                <ChangeSubjectsStatusElement>
                    status
                </ChangeSubjectsStatusElement>
            </ChangeSubjectsHeaderContainer>}
        </>
    );
};

export default ChangeSubjectsHeader;