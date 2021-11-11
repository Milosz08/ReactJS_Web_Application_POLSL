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

import {
    CurrentSubjectDuringSubjectBackground, CurrentSubjectDuringSubjectContainer, CurrentSubjectDuringSubjectInfo,
    CurrentSubjectDuringSubjectLeft, CurrentSubjectDuringSubjectPlatformAnchor, CurrentSubjectDuringSubjectPlatformIcon,
    CurrentSubjectDuringSubjectRight, CurrentSubjectDuringSubjectTitle, CurrentSubjectDuringSubjectTitlesContent,
    CurrentSubjectSeparateLine
} from '../CurrentSubjectActive.styles';

import { DuringSubjectContext, DuringSubjectContextTypes } from './CurrentSubjectContent';

/**
 * Component responsible for generating current during subject (with subject timer).
 */
const CurrentSubjectDuringSubject: React.FC<{ counter: number }> = ({ counter }): JSX.Element => {

    const { singleDayCurrentSchedule, duringSubjectIdx } = useContext<Partial<DuringSubjectContextTypes>>(DuringSubjectContext);
    const subject = Boolean(singleDayCurrentSchedule) ? singleDayCurrentSchedule![duringSubjectIdx!] : undefined;

    const time: number = (counter - Number(subject?.hours.start)) * 100 / ((Number(subject?.hours.end) - 37) - Number(subject?.hours.start));

    const ifDistanceLearning: string = subject?.place === 'Kontaktowy' ? 'w sposób' : 'poprzez komunikator';
    const roomClosely: string = subject?.place === 'Kontaktowy' ? `Sala ${subject?.room.toLocaleUpperCase()}` : '';

    return (
        <CurrentSubjectDuringSubjectContainer>
            <CurrentSubjectDuringSubjectTitlesContent>
                <CurrentSubjectDuringSubjectPlatformAnchor
                    href = {subject?.pzeLink.link}
                    target = '_blank'
                    rel = 'noreferrer'
                    title = 'Przejdź do Platformy Zdalnej Edukacji'
                >
                    <CurrentSubjectDuringSubjectPlatformIcon/>
                </CurrentSubjectDuringSubjectPlatformAnchor>
                <CurrentSubjectDuringSubjectLeft>
                    <span>Aktualnie trwa:</span>
                </CurrentSubjectDuringSubjectLeft>
                <CurrentSubjectSeparateLine/>
                <CurrentSubjectDuringSubjectRight>
                    <CurrentSubjectDuringSubjectTitle>
                        {subject?.title}
                    </CurrentSubjectDuringSubjectTitle>
                    <CurrentSubjectDuringSubjectInfo>
                        {subject?.type}, odbywany {ifDistanceLearning} {subject?.place}, {roomClosely}<br/>
                        Czas trwania: {subject?.hours.fullStart} - {subject?.hours.fullEnd}
                    </CurrentSubjectDuringSubjectInfo>
                </CurrentSubjectDuringSubjectRight>
            </CurrentSubjectDuringSubjectTitlesContent>
            <CurrentSubjectDuringSubjectBackground
                clockWidth = {time > 99.9 ? 0 : time.toFixed(1)}
            />
        </CurrentSubjectDuringSubjectContainer>
    );
};

export default CurrentSubjectDuringSubject;