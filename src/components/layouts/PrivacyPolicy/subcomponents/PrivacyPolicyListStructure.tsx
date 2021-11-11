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

import STATIC_STRUCTURE, { ListTypes } from '../../../../helpers/structs/cookiesPolicyContent';

import {
    PrivacyPolicyHeaderContainer, PrivacyPolicyListContainer, PrivacyPolicyUnorderedListElement
} from '../PrivacyPolicy.styles';

import PrivacyPolicyUniversalHeader from './PrivacyPolicyUniversalHeader';

/**
 * Component responsible for generating all list structure content based static TS file.
 */
const PrivacyPolicyListStructure: React.FC = (): JSX.Element => {

    const { LIST_STRUCTURE } = STATIC_STRUCTURE;
    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const generateSingleElement = (list: ListTypes): JSX.Element[] => list.sectionArray.map((el: { [value: string]: string }) => (
        <PrivacyPolicyUnorderedListElement
            key = {el.title}
        >
            <strong>
                {capitalizeFirstLetter(el.title)}
            </strong> - {el.description}.
        </PrivacyPolicyUnorderedListElement>
    ));

    const generateListStructure = LIST_STRUCTURE.map((structure: ListTypes, index: number) => (
        <PrivacyPolicyHeaderContainer
            key = {index}
        >
            <PrivacyPolicyUniversalHeader
                content = {structure.sectionID}
                index = {index + 1}
            />
            <PrivacyPolicyListContainer>
                {generateSingleElement(structure)}
            </PrivacyPolicyListContainer>
        </PrivacyPolicyHeaderContainer>
    ));

    return (
        <Fragment>
            {generateListStructure}
        </Fragment>
    );
};

export default PrivacyPolicyListStructure;