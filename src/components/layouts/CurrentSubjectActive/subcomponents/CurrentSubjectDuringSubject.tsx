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
    CurrentSubjectDuringSubjectBackground,
    CurrentSubjectDuringSubjectContainer,
    CurrentSubjectDuringSubjectInfo,
    CurrentSubjectDuringSubjectLeft,
    CurrentSubjectDuringSubjectPlatformAnchor,
    CurrentSubjectDuringSubjectPlatformIcon,
    CurrentSubjectDuringSubjectRight,
    CurrentSubjectDuringSubjectTitle,
    CurrentSubjectDuringSubjectTitlesContent,
    CurrentSubjectSeparateLine
} from '../CurrentSubjectActive.styles';

import { DuringSubjectContext, DuringSubjectContextTypes } from './CurrentSubjectContent';
import ConvertTimeUTC, { DATE_ELEMENTS } from '../../../../helpers/functionsAndClasses/convertTimeUTC';

interface PropsProvider {
    timeMilis: number;
}

/**
 * Component responsible for generating current during subject (with subject timer).
 */
const CurrentSubjectDuringSubject: React.FC<PropsProvider> = ({ timeMilis }): JSX.Element => {

    const { singleDayCurrentSchedule, duringSubjectIdx } = useContext<Partial<DuringSubjectContextTypes>>(DuringSubjectContext);
    const subject = Boolean(singleDayCurrentSchedule) ? singleDayCurrentSchedule![duringSubjectIdx!] : undefined;

    const date = new ConvertTimeUTC();
    const { YEAR, MONTH, DAYMONTH } = DATE_ELEMENTS;
    const generateYear = `${date.getOneDateElm(YEAR)}-${date.getOneDateElm(MONTH)}-${date.getOneDateElm(DAYMONTH)}`;

    const currDateStart = new Date(`${generateYear}T${subject?.hours.startHour}:00`);
    const currDateEnd = new Date(`${generateYear}T${subject?.hours.endHour}:00`);
    const createTime = (100 - ((currDateEnd.getTime() - timeMilis) / (currDateEnd.getTime() - currDateStart.getTime()) * 100));

    const ifDistanceLearning: string = subject?.classesInfo.place === 'kontaktowy' ? 'w sposób' : 'poprzez komunikator';
    const roomClosely: string = subject?.classesInfo.place === 'kontaktowy' ? `Sala ${subject?.room.toLocaleUpperCase()}` : '';

    return (
        <CurrentSubjectDuringSubjectContainer>
            <CurrentSubjectDuringSubjectTitlesContent>
                <CurrentSubjectDuringSubjectPlatformAnchor
                    href = {subject?.classesInfo.link}
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
                        {subject?.classesInfo.type}, odbywany {ifDistanceLearning} {subject?.classesInfo.place}, {roomClosely}<br/>
                        Czas trwania: {subject?.hours.startHour} - {subject?.hours.endHour}
                    </CurrentSubjectDuringSubjectInfo>
                </CurrentSubjectDuringSubjectRight>
            </CurrentSubjectDuringSubjectTitlesContent>
            <CurrentSubjectDuringSubjectBackground
                clockWidth = {createTime.toFixed(2)}
            />
        </CurrentSubjectDuringSubjectContainer>
    );
};

export default CurrentSubjectDuringSubject;