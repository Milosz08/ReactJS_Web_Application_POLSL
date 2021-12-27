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

import { DuringSubjectContext, DuringSubjectContextTypes } from './CurrentSubjectContent';

import {
    CurrentSubjectPrevAndNextContainer, CurrentSubjectPrevAndNextLeft, CurrentSubjectPrevAndNextRight,
    CurrentSubjectPrevAndNextRightInfo, CurrentSubjectPrevAndNextRightTitle
} from '../CurrentSubjectActive.styles';

/**
 * Component responsible for generating next subject info (showing only if array has 2 or more elements,
 * and during subject array element is not the last element of this array).
 */
const CurrentSubjectNextSubject: React.FC = (): JSX.Element => {

    const { singleDayCurrentSchedule, duringSubjectIdx } = useContext<Partial<DuringSubjectContextTypes>>(DuringSubjectContext);

    const subject = Boolean(singleDayCurrentSchedule) ? singleDayCurrentSchedule![duringSubjectIdx! + 1] : undefined;

    const ifDistanceLearning: string = subject?.classesInfo.place === 'kontaktowy' ? 'w sposób' : 'poprzez komunikator';
    const roomClosely: string = subject?.classesInfo.place === 'kontaktowy' ? `Sala ${subject?.room.toLocaleUpperCase()}` : '';

    return (
        <CurrentSubjectPrevAndNextContainer>
            <CurrentSubjectPrevAndNextLeft>
                Następne zajęcia:
            </CurrentSubjectPrevAndNextLeft>
            <CurrentSubjectPrevAndNextRight>
                <CurrentSubjectPrevAndNextRightTitle>
                    {subject?.title}
                </CurrentSubjectPrevAndNextRightTitle>
                <CurrentSubjectPrevAndNextRightInfo>
                    {subject?.classesInfo.type}, odbywany {ifDistanceLearning} {subject?.classesInfo.place}, {roomClosely}<br/>
                    Czas trwania: {subject?.hours.startHour} - {subject?.hours.endHour}
                </CurrentSubjectPrevAndNextRightInfo>
            </CurrentSubjectPrevAndNextRight>
        </CurrentSubjectPrevAndNextContainer>
    );
};

export default CurrentSubjectNextSubject;