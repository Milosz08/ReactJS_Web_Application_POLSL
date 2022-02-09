/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
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

import { CalendarContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import { CalendarHourWrapper } from '../CalendarPageElements.styles';

interface PropsProvider {
    date: Date;
    item: CalendarContentTypes;
    tileProp: {
        start: string;
        message: string;
        importantLevel: string;
    };
}

/**
 * Component responsible for generating content inside calendar single tile element.
 */
const CalendarTileContent: React.FC<PropsProvider> = ({ date, item, tileProp }): JSX.Element => {

    const checkIfExpired = (d: Date, level: string, { day, month, year }: { day: number, month: number, year: number }) => {
        const timestampTile = new Date(year, month - 1, day + 1).getTime();
        if(new Date().getTime() > timestampTile) {
            return 'EXPIRED';
        }
        return level;
    };

    return (
        <Fragment key = {`${tileProp.message}__${tileProp.start}`}>
            <p className = {checkIfExpired(date, tileProp.importantLevel, item)}>
                <span>{tileProp.message}</span>
                <CalendarHourWrapper
                    $ifExpired = {checkIfExpired(date, tileProp.importantLevel, item) === 'EXPIRED'}
                >
                    {tileProp.start}
                </CalendarHourWrapper>
            </p>
            <span className = {checkIfExpired(date, tileProp.importantLevel, item)}/>
        </Fragment>
    );
};

export default CalendarTileContent;