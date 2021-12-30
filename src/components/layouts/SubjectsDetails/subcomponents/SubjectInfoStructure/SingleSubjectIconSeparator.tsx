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

import { SubjectContext, SubjectContextProvider } from '../SubjectInfoContent';

import { SeparatorIcon, SeparatorLine, SingleSubjectIconSeparatorContainer } from './SubjectInfoStructure.style';

const IconComponent = React.lazy(() => import('../../../../../helpers/componentsAndMiddleware/IconComponent'));

/**
 * Component responsible for generating subject info separator.
 */
const SingleSubjectIconSeparator: React.FC = (): JSX.Element => {

    const { subject } = useContext<Partial<SubjectContextProvider>>(SubjectContext);

    return (
        <SingleSubjectIconSeparatorContainer>
            <SeparatorLine/>
            <SeparatorIcon>
                <IconComponent
                    family = {subject!.icon.family}
                    name = {subject!.icon.name}
                />
            </SeparatorIcon>
            <SeparatorLine/>
        </SingleSubjectIconSeparatorContainer>
    );
};

export default SingleSubjectIconSeparator;