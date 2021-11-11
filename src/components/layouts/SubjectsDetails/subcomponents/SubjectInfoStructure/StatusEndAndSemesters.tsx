/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import generateID from '../../../../../helpers/functionsAndClasses/generateID';
import { AllSemesters } from '../../../../../helpers/structs/allSemesters';

import { SubjectContext, SubjectContextProvider } from '../SubjectInfoContent';

import { SingleSubjectStatusContainer, StatusEndAndSemesterInfo } from './SubjectInfoStructure.style';

/**
 * Component responsible for generating subject status and semesters.
 */
const StatusEndAndSemesters: React.FC = (): JSX.Element => {

    const { subject } = useContext<Partial<SubjectContextProvider>>(SubjectContext);

    const semestersCount = subject!.semesters.map(semester => {
        const toggleOnEndOfString = semester - 1 === subject!.semesters.length - 1 ? '.' : ', ';
        return (
            <span
                key = {generateID()}
            >
                {`${AllSemesters[semester - 1]}${toggleOnEndOfString}`}
            </span>
        )
    });

    return (
        <SingleSubjectStatusContainer>
            <StatusEndAndSemesterInfo
                ifEnd = {subject!.ifEnd}
            >
                Status przedmiotu: <span>{subject!.ifEnd ? 'zakończony' : 'w trakcie'}</span>
            </StatusEndAndSemesterInfo>
            <StatusEndAndSemesterInfo
                ifEnd = {subject!.ifEnd}
                ifSemester = {true}
            >
                Odbywany przez semestr: <span>{semestersCount}</span>
            </StatusEndAndSemesterInfo>
        </SingleSubjectStatusContainer>
    );
};

export default StatusEndAndSemesters;