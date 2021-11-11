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

import DAYS_AND_MONTHS from './../../helpers/structs/daysAndMonths';

const { DAYS, MONTHS } = DAYS_AND_MONTHS;

export enum DATE_ELEMENTS {
    HOURS, MINUTES, SECONDS, DAYMONTH, DAY, MONTH, YEAR,
}

export enum DATE_OR_TIME {
    DATE_TYPE, TIME_TYPE
}

/**
 *
 */
class ConvertTimeUTC {
    private readonly _currTime: Date;

    private readonly _hours: string = '';
    private readonly _minutes: string = '';
    private readonly _seconds: string = '';
    private readonly _day: number = 0;
    private readonly _dayMonth: string = '';
    private readonly _month: string = '';
    private readonly _year: string = '';

    public constructor(currTime = new Date()) {
        const { convertingSingleValue } = ConvertTimeUTC;

        this._currTime = currTime;
        this._hours = convertingSingleValue(this._currTime.getHours());
        this._minutes = convertingSingleValue(this._currTime.getMinutes());
        this._seconds = convertingSingleValue(this._currTime.getSeconds());
        this._day = this._currTime.getDay();
        this._dayMonth = convertingSingleValue(this._currTime.getDate());
        this._month = convertingSingleValue(this._currTime.getMonth() + 1);
        this._year = String(this._currTime.getFullYear());
    };

    private static convertingSingleValue(toConvert: number): string {
        return Number(toConvert) < 10 ? `0${toConvert}` : String(toConvert)
    };

    public getOneDateElm(element: DATE_ELEMENTS): string {
        const { HOURS, MINUTES, SECONDS, DAYMONTH, DAY, MONTH, YEAR } = DATE_ELEMENTS;
        const { convertingSingleValue } = ConvertTimeUTC;
        switch (element) {
            case HOURS:
                return this._hours;
            case MINUTES:
                return this._minutes;
            case SECONDS:
                return this._seconds;
            case DAYMONTH:
                return this._dayMonth;
            case DAY:
                return convertingSingleValue(this._currTime.getDay());
            case MONTH:
                return this._month;
            case YEAR:
                return this._year;
            default:
                throw new Error(`Unexpected element. Element ${element} is not valid.`);
        }
    };

    public getAllDateElms(dateOrTime?: DATE_OR_TIME): any {
        const { DATE_TYPE, TIME_TYPE } = DATE_OR_TIME;
        switch (dateOrTime) {
            case DATE_TYPE:
                return `${this._dayMonth}/${this._month}/${this._year}`;
            case TIME_TYPE:
                return `${this._hours}:${this._minutes}:${this._seconds}`;
            default:
                return {
                    date: `${this._dayMonth}/${this._month}/${this._year}`,
                    time: `${this._hours}:${this._minutes}:${this._seconds}`
                }
        }
    };

    public getDayPolishName(): string {
        return DAYS.find((day: { id: number, name: string }): {} => day.id === this._day)!.name;
    };

    public getMonthPolishName(): string {
        return MONTHS.find((month: { id: number, paraphrase: string }) => month.id === this._currTime.getMonth())!.paraphrase;
    };
}

export default ConvertTimeUTC;