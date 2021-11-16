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

import { CalendarContentTypes } from '../../redux/apiReduxStore/dataTypes';

export interface SeparateCalendarTiles {
    _id: string,
    date: string,
    important: string,
    message: string,
}

interface ItemsTypes {
    start: string,
    message: string,
    importantLevel: string
}

/**
 * This class takes an array of objects (calendar entries) as a parameter and uses it to generate
 * a new array of objects, this time separating all activities (including those on the same day).
 */
class SeparatingSingleCalendarTiles {

    private readonly _calendarTiles: CalendarContentTypes[] = [];
    private _endingArray: SeparateCalendarTiles[] = [];

    constructor(calendarTiles: CalendarContentTypes[]) {
        this._calendarTiles = calendarTiles;
    };

    private insertMultipleItems(items: CalendarContentTypes, day: string, month: string, dayTile: CalendarContentTypes): void {
        for (const item of items.items) {
            this.insertSingleItem(item, day, month, dayTile);
        }
    };

    private insertSingleItem(item: ItemsTypes, day: string, month: string, dayTile: CalendarContentTypes): void {
        this._endingArray = [ ...this._endingArray, {
            _id: dayTile._id,
            date: `${dayTile.year}-${month}-${day}T${item.start}`,
            important: item.importantLevel,
            message: item.message
        } ];
    };

    public getAllReversedItems(): SeparateCalendarTiles[] {
        this._calendarTiles.forEach(dayTile => {
            const day: string = dayTile.day < 10 ? `0${dayTile.day}` : String(dayTile.day);
            const month: string = dayTile.month < 10 ? `0${dayTile.month}` : String(dayTile.month);
            if (dayTile.items.length > 1) { //If in same day is 2n activities
                this.insertMultipleItems(dayTile, day, month, dayTile);
            } else { //If in same day is one activity
                this.insertSingleItem(dayTile.items[0], day, month, dayTile);
            }
        });
        return this._endingArray.reverse();
    };

}

export default SeparatingSingleCalendarTiles;