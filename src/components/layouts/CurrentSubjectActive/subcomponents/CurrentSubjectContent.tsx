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
import { createContext } from 'react';
import useDate from '../../../../helpers/hooks/useDate';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { CurrentScheduleContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import { CurrentSubjectAllSubjectsContainer, CurrentSubjectAllSubjectWrapper } from '../CurrentSubjectActive.styles';

const CurrentSubjectDuringSubject = React.lazy(() => import('./CurrentSubjectDuringSubject'));
const CurrentSubjectPrevNextSubject = React.lazy(() => import('./CurrentSubjectPrevNextSubject'));
const CurrentSubjectNoContent = React.lazy(() => import('./CurrentSubjectNoContent'));

export interface DuringSubjectContextTypes {
    singleDayCurrentSchedule: CurrentScheduleContentTypes[];
    duringSubjectIdx: number;
}

export const DuringSubjectContext = createContext<Partial<DuringSubjectContextTypes>>({ });

/**
 * Component responsible for generating current subject content structure
 * and distrubute state by ContextAPI.
 */
const CurrentSubjectContent: React.FC = (): JSX.Element => {

    const date = useDate(false);

    const { currentScheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const singleDayCurrentSchedule = currentScheduleContent[date.engDay.toLocaleLowerCase()]

    const insertZeros = (time: number): string => time < 10 ? `0${time}` : String(time);
    const currTime: number = Number(`${insertZeros(date.time.hr)}${insertZeros(date.time.min)}${insertZeros(date.time.sec)}`);

    const duringSubjectIdx = singleDayCurrentSchedule?.findIndex(el => el.hours.start <= currTime && el.hours.end > currTime);
    const weekend = new Date().getDay() === 6 || new Date().getDay() === 0;

    return (
        <DuringSubjectContext.Provider
            value = {{ singleDayCurrentSchedule, duringSubjectIdx }}
        >
            <CurrentSubjectAllSubjectsContainer>
                {duringSubjectIdx !== -1 && !weekend ? <CurrentSubjectAllSubjectWrapper>
                    <CurrentSubjectDuringSubject
                        counter = {currTime}
                    />
                    {singleDayCurrentSchedule?.length - 1 !== duringSubjectIdx && <CurrentSubjectPrevNextSubject/>}
                </CurrentSubjectAllSubjectWrapper> : <CurrentSubjectNoContent/>}
            </CurrentSubjectAllSubjectsContainer>
        </DuringSubjectContext.Provider>
    );
};

export default CurrentSubjectContent;