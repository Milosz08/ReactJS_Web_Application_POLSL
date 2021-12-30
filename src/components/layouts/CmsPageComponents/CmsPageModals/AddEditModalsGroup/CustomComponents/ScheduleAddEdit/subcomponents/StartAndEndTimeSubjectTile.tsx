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

import { allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { StartAndEndAsideTextContent, StartAndEndTimeScheduleSubjectContainer } from '../ScheduleAddEdit.styles';

const SingleTimeScheduleSubjectElement = React.lazy(() => import('./SingleTimeScheduleSubjectElement'));

interface PropsProvider {
    disableComponent: boolean;
}

/**
 * Component responsible for generating structure for start and end time input pickers in schedule modal.
 *
 * @param disableComponent { boolean } - flag decided, if all inputs should be disabled.
 */
const StartAndEndTimeSubjectTile: React.FC<PropsProvider> = ({ disableComponent }): JSX.Element => (
    <StartAndEndTimeScheduleSubjectContainer>
        <StartAndEndAsideTextContent>Od</StartAndEndAsideTextContent>
        <SingleTimeScheduleSubjectElement
            field = {allModalsInputs.START_HOUR}
            disableComponent = {disableComponent}
        />
        <StartAndEndAsideTextContent>do</StartAndEndAsideTextContent>
        <SingleTimeScheduleSubjectElement
            field = {allModalsInputs.END_HOUR}
            disableComponent = {disableComponent}
        />
    </StartAndEndTimeScheduleSubjectContainer>
);

export default StartAndEndTimeSubjectTile;