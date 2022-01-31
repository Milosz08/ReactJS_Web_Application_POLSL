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
import { Fragment, useState } from 'react';
import Calendar from 'react-calendar';

import useResizeListener from '../../../../helpers/hooks/useResizeListener';

import { MAX_WIDTH_CLICK_ACTION } from '../../../../helpers/structs/calendar.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { prefFields } from '../../../../redux/preferencesReduxStore/types';
import { PrefActions } from '../../../../redux/preferencesReduxStore/actions';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';
import { CalendarContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import './../CalendarStyles.scss';

import { CalendarHourWrapper } from '../CalendarPageElements.styles';

interface SupplementsTilesProvider {
    date: Date;
    view: string;
}

/**
 * Component responsible for generating calendar structure and filled data from redux store.
 */
const CalendarContainer: React.FC = (): JSX.Element => {

    const { calendarContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const [ date, setDate ] = useState<Date>(new Date());

    const offsetWidth = useResizeListener();
    const dispatcher = useDispatch();

    const checkIfExpired = (d: Date, level: string, { day, month, year }: { day: number, month: number, year: number }) => {
        const timestampTile = new Date(year, month - 1, day + 1).getTime();
        if(new Date().getTime() > timestampTile) {
            return 'EXPIRED';
        }
        return level;
    };

    const supplementsTiles = ({ date: d, view }: SupplementsTilesProvider): any => (
        calendarContent.map((item: CalendarContentTypes) => (
            view === 'month' && d.getMonth() === item.month - 1 && d.getDate() === item.day && d.getFullYear() === item.year ? (
                item.items.sort((a, b) => (
                    parseInt(a.start.replace(':', '')) - parseInt(b.start.replace(':', ''))
                )).map(prop => (
                    <Fragment key = {`${prop.message}__${prop.start}`}>
                        <p className = {checkIfExpired(d, prop.importantLevel, item)}>
                            <span>{prop.message}</span>
                            <CalendarHourWrapper
                                $ifExpired = {checkIfExpired(d, prop.importantLevel, item) === 'EXPIRED'}
                            >
                                {prop.start}
                            </CalendarHourWrapper>
                        </p>
                        <span className = {checkIfExpired(d, prop.importantLevel, item)}/>
                    </Fragment>
                ))
            ) : null
        ))
    );

    const handleClickDay = (value: Date) => {
        if (offsetWidth < MAX_WIDTH_CLICK_ACTION) {
            dispatcher(PrefActions.changeRootPrefField(prefFields.CALENDAR_MODAL, { toggleState: true, dateInfo: value }));
        }
    };

    return (
        <Calendar
            tileContent = {supplementsTiles}
            value = {date}
            onChange = {setDate}
            onClickDay = {(value: Date) => handleClickDay(value)}
            locale = 'pl-PL'
            prevLabel = {<span/>}
            prev2Label = {<Fragment><span/><span/></Fragment>}
            nextLabel = {<span/>}
            next2Label = {<Fragment><span/><span/></Fragment>}
        />
    );
};

export default CalendarContainer;