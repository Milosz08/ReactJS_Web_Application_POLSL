/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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
 * Function responsible for generating a unique ID based on hexadecimal pseudorandom numbers.
 * If it does not get the parameter, it defaults to inserting "00" in the middle place of the string.
 *
 * @param initialInput { string } - the middle part of the ID string (by default: "00").
 * @param countOfValues { number } - the quantity of generating hex single component.
 */
const generateID = (initialInput = '00', countOfValues = 5): string => {

    const generatePrefAndSuf = (initialString: string = ''): string => {
        let returnedString: string = initialString;
        for(let i = 0; i < countOfValues; i++) {
            returnedString += Math.floor(Math.random() * 256).toString(16);
        }
        return returnedString;
    };

    return `${generatePrefAndSuf()}${initialInput}${generatePrefAndSuf()}`;
};

export default generateID;