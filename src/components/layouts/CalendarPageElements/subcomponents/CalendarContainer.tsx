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

const CalendarTileContent = React.lazy(() => import('./CalendarTileContent'));
const CalendarEditingTileButtons = React.lazy(() => import('../../CmsPageComponents/CmsPagePanels/ChangeCalendarCmsPage/subcomponents/CalendarEditingTileButtons'));
const CalendarAddNewContentTileButton = React.lazy(() => import('../../CmsPageComponents/CmsPagePanels/ChangeCalendarCmsPage/subcomponents/CalendarAddNewContentTileButton'));

interface PropsProvider {
    editingMode?: boolean;
}

/**
 * Component responsible for generating calendar structure and filled data from redux store.
 */
const CalendarContainer: React.FC<PropsProvider> = ({ editingMode }): JSX.Element => {

    const { calendarContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const [ date, setDate ] = useState<Date>(new Date());
    const [ activeMonth, setActiveMonth ] = useState<number>(date.getMonth());

    const offsetWidth = useResizeListener();
    const dispatcher = useDispatch();

    const generateCalendarSingleTileElements = (item: CalendarContentTypes, date: Date): JSX.Element[] => (
        item.items.sort((a, b) => parseInt(a.start.replace(':', '')) - parseInt(b.start.replace(':', ''))).map(prop => (
            <CalendarTileContent
                key = {prop.message}
                date = {date}
                item = {item}
                tileProp = {prop}
            />
        ))
    );

    const findSingleElement = (d: Date, view: string): boolean => (
        calendarContent.filter((item: CalendarContentTypes) => (
            view === 'month' && d.getMonth() === item.month - 1 && d.getDate() === item.day && d.getFullYear() === item.year
        )).length === 0
    );

    const generateCalendarMediaElements = (d: Date, view: string): (JSX.Element[] | null)[] => (
        calendarContent.map((item: CalendarContentTypes) => (
            view === 'month' && d.getMonth() === item.month - 1 && d.getDate() === item.day && d.getFullYear() === item.year ? (
                generateCalendarSingleTileElements(item, d)
            ) : null
        ))
    );

    const generateOutputCalendarSingleTileElements = ({ date: d, view }: { date: Date, view: string }): JSX.Element => (
        <>
            {generateCalendarMediaElements(d, view)}
            {editingMode && d.getMonth() === activeMonth ? findSingleElement(d, view) ?
                <CalendarAddNewContentTileButton date = {d} /> : <CalendarEditingTileButtons date = {d} /> : null
            }
        </>
    );

    const handleClickDay = (value: Date) => {
        if (offsetWidth < MAX_WIDTH_CLICK_ACTION && !editingMode && value.getMonth() === activeMonth) {
            dispatcher(PrefActions.changeRootPrefField(prefFields.CALENDAR_MODAL, { toggleState: true, dateInfo: value }));
        }
    };

    return (
        <Calendar
            tileContent = {generateOutputCalendarSingleTileElements}
            value = {date}
            onChange = {setDate}
            onClickDay = {(value: Date) => handleClickDay(value)}
            onActiveStartDateChange = {({ activeStartDate }) => setActiveMonth(activeStartDate.getMonth())}
            locale = 'pl-PL'
            prevLabel = {<span/>}
            prev2Label = {<Fragment><span/><span/></Fragment>}
            nextLabel = {<span/>}
            next2Label = {<Fragment><span/><span/></Fragment>}
        />
    );
};

export default CalendarContainer;