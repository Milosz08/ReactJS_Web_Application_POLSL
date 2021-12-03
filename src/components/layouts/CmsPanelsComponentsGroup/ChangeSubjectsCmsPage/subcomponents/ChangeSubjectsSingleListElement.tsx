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

import { AllSemesters } from '../../../../../helpers/structs/allSemesters';

import { allModals } from '../../../../../redux/modalsReduxStore/types';
import { SubjectsContentTypes } from '../../../../../redux/apiReduxStore/dataTypes';

import {
    CmsUnorderedListElement, CmsIdElement, CmsSingleListNormalElement
} from '../../HighOrderComponents/HighOrderComponents.styles';

const SingleElementButtons = React.lazy(() => import('../../HighOrderComponents/SingleElementButtons'));

interface PropsProvider {
    element: SubjectsContentTypes;
    index: number;
}

/**
 * Component responsible for generating single list element structure in CMS panel subjects section.
 *
 * @param element { SubjectsContentTypes } - single tile object element.
 * @param index { number } - single tile index in global array.
 */
const ChangeSubjectsSingleListElement: React.FC<PropsProvider> = ({ element, index }): JSX.Element => {

    const semestersCount = element.semesters.map((semester, idx) => (
        <span key = {semester}>
            {`${idx > 0 ? ', ' : ''}${AllSemesters[semester - 1]}`}
        </span>
    ));

    return (
        <CmsUnorderedListElement>
            <CmsIdElement ifNotHeader = {true}>
                {index + 1}
            </CmsIdElement>
            <CmsSingleListNormalElement>
                {element.title}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement flexBasis = '220px'>
                {semestersCount}
            </CmsSingleListNormalElement>
            <CmsSingleListNormalElement
                flexBasis = '210px'
                color = {element.ifEnd ? 'green' : 'red'}
            >
                {element.ifEnd ? 'zakończony' : 'w trakcie'}
            </CmsSingleListNormalElement>
            <SingleElementButtons
                dataID = {element._id}
                modalTypeEnum = {allModals.SUBJECT_MODAL}
                ifViewmodeActive = {false}
            />
        </CmsUnorderedListElement>
    );
};

export default ChangeSubjectsSingleListElement;