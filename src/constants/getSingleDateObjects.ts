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

/**
 * Interface that defines the return elements in function.
 */
interface ReturnProvider {
    [value: string]: string | number;
}

/**
 * @details A drawing function from the given object class DATE Individual values (day, month, hours, minutes, seconds).
 *          If the value is less than 10, it is added to it for equal to fill values.
 *
 * @param date { Date } - Date class object passed from which individual values will be drawn.
 */
const getSingleDateObjects = (date: Date): ReturnProvider => {

    /**
     * Function adds zero and converts to string if the value passed in the parameter is less than 10.
     *
     * @param value { number } - assumed number from the scope of the Date class object.
     * @return { number | string } - converted value, either with or without a zero.
     */
    const addZeroToFillValue = (value: number): string | number => {
        return value < 10 ? `0${value}` : value;
    }

    const day: string | number = addZeroToFillValue(date.getDate());
    const month: string | number = addZeroToFillValue(date.getMonth() + 1);
    const hours: string | number = addZeroToFillValue(date.getHours());
    const minutes: string | number = addZeroToFillValue(date.getMinutes());
    const seconds: string | number = addZeroToFillValue(date.getSeconds());

    return { day, month, hours, minutes, seconds };
}

export default getSingleDateObjects;