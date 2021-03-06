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

import { SubjectContext, SubjectContextProvider } from './SubjectInfoContent';

import {
    SingleSubjectInfoContentAsideText, SingleSubjectInfoContentContainer, SingleSubjectInfoContentHeader
} from '../SubjectsDetails.styles';

const SingleSubjectIconSeparator = React.lazy(() => import('./SubjectInfoStructure/SingleSubjectIconSeparator'));
const StatusEndAndSemesters = React.lazy(() => import('./SubjectInfoStructure/StatusEndAndSemesters'));
const ClassesPlatformInfo = React.lazy(() => import('./SubjectInfoStructure/ClassesPlatformInfo'));
const SingleSubjectNavigationButton = React.lazy(() => import('./SubjectInfoStructure/SingleSubjectNavigationButton'));

/**
 * Component responsible for generating structure of all information about choose subject.
 * Subject getting from Context.
 */
const SingleSubjectInfoContent: React.FC = (): JSX.Element => {

    const { subject } = useContext<Partial<SubjectContextProvider>>(SubjectContext);

    const multipleDepartment = subject!.departments.length !== 1
        ? subject!.departments.map(department => <div key = {department.title}>{department.title} ({department.shortName})</div>)
        : `${subject!.departments[0].title} (${subject!.departments[0].shortName})`;

    return (
        <SingleSubjectInfoContentContainer>
            <SingleSubjectInfoContentAsideText>
                przedmiot
            </SingleSubjectInfoContentAsideText>
            <SingleSubjectInfoContentHeader>
                {subject!.title}
            </SingleSubjectInfoContentHeader>
            <SingleSubjectInfoContentAsideText>
                {multipleDepartment}
            </SingleSubjectInfoContentAsideText>
            <SingleSubjectIconSeparator/>
            <StatusEndAndSemesters/>
            <ClassesPlatformInfo/>
            <SingleSubjectNavigationButton/>
        </SingleSubjectInfoContentContainer>
    );
};

export default SingleSubjectInfoContent;