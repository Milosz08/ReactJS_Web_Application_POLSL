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
import { SubjectContext, SubjectContextProvider } from '../SubjectInfoContent';

import { ClassesPlatformInfoContainer, ClassesPlatformInfoSingleElement } from './SubjectInfoStructure.style';

/**
 * Component responsible for generating all platform infos.
 */
const ClassesPlatformInfo: React.FC = () => {

    const { subject } = useContext<Partial<SubjectContextProvider>>(SubjectContext);
    const classesIfEnd = subject!.ifEnd ? 'odbywały' : 'odbywają';

    const classesPlatforms = subject!.classesPlatforms.length !== 1
        ? subject!.classesPlatforms.map(platform => (
            <ClassesPlatformInfoSingleElement
                key = {generateID()}
            >
                {`${platform.type} ${classesIfEnd} się
                ${platform.place !== 'Kontaktowy' ? 'poprzed komunikator ' : 'w sposób '}`}
                <strong>{`${platform.place}`}</strong>.
            </ClassesPlatformInfoSingleElement>
        )) : (
            <ClassesPlatformInfoSingleElement>
                {`Zajęcia ${classesIfEnd} się 
                ${subject!.classesPlatforms[0].place !== 'Kontaktowy' ? 'poprzed komunikator ' : 'w sposób '}`}
                <strong>{`${subject!.classesPlatforms[0].place}`}</strong>.
            </ClassesPlatformInfoSingleElement>
        );

    return (
        <ClassesPlatformInfoContainer>
            {classesPlatforms}
        </ClassesPlatformInfoContainer>
    );
};

export default ClassesPlatformInfo;