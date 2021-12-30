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
import { Fragment } from 'react';

import STATIC_STRUCTURE, { NonListTypes } from '../../../../helpers/structs/cookiesPolicyContent';

import {
    PrivacyPolicyUnorderedListElement, PrivacyPolicyHeaderContainer, PrivacyPolicyListContainer
} from '../PrivacyPolicy.styles';

const PrivacyPolicyUniversalHeader = React.lazy(() => import('./PrivacyPolicyUniversalHeader'));

/**
 * Component responsible for generating non-list structure based on static TS file.
 */
const PrivacyPolicyNonListStructure: React.FC = (): JSX.Element => {

    const { LIST_STRUCTURE, NON_LIST_STRUCTURE } = STATIC_STRUCTURE;

    const generateSingleElement = (nonList: NonListTypes): JSX.Element[] => nonList.sectionArray.map((position: string) => (
        <PrivacyPolicyUnorderedListElement
            key = {position}
        >
            {position}.
        </PrivacyPolicyUnorderedListElement>
    ));

    const generateNonListStructure = NON_LIST_STRUCTURE.map((structure: NonListTypes, index: number) => (
        <PrivacyPolicyHeaderContainer
            key = {index}
        >
            <PrivacyPolicyUniversalHeader
                content = {structure.sectionID}
                index = {LIST_STRUCTURE.length + index + 2}
            />
            <PrivacyPolicyListContainer>
                {generateSingleElement(structure)}
            </PrivacyPolicyListContainer>
        </PrivacyPolicyHeaderContainer>
    ));

    return (
        <Fragment>
            {generateNonListStructure}
        </Fragment>
    );
};

export default PrivacyPolicyNonListStructure;