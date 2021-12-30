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

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../../../../../redux/apiReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { ScheduleSelectSubjectTitleContainer } from '../ScheduleAddEdit.styles';

const UniversalSelectInput = React.lazy(() => import('../../../../../../UniversalSelectInput/UniversalSelectInput'));

/**
 * Component responsible for generating subject select box in schedule subjects modal.
 */
const ScheduleSelectSubjectTitle: React.FC = (): JSX.Element => {

    const { subjectsContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const allSubjectsTitles = subjectsContent.map(subject => subject.title);

    return (
        <ScheduleSelectSubjectTitleContainer>
            <UniversalSelectInput
                allOptions = {allSubjectsTitles}
                defaultOption = 'wybierz przedmiot'
                modalType = {allModals.SCHEDULE_MODAL}
                inputFieldType = {allModalsInputs.TITLE}
            />
        </ScheduleSelectSubjectTitleContainer>
    );
};

export default ScheduleSelectSubjectTitle;