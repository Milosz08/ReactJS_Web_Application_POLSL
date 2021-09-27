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
 * @details Object that stores id values and names of days of the week as well as id values,
 *          names and variants of names of subsequent months.
 */
const DAYS_AND_MONTHS = {
    DAYS: [
        { id: 0, name: 'Niedziela' },
        { id: 1, name: 'Podziedziałek' },
        { id: 2, name: 'Wtorek' },
        { id: 3, name: 'Środa' },
        { id: 4, name: 'Czwartek' },
        { id: 5, name: 'Piątek' },
        { id: 6, name: 'Sobota' }
    ],
    MONTHS: [
        { id: 0, name: 'Styczeń', paraphrase: 'stycznia' },
        { id: 1, name: 'Luty', paraphrase: 'Luty' },
        { id: 2, name: 'Marzec', paraphrase: 'marca' },
        { id: 3, name: 'Kwiecień', paraphrase: 'kwietnia' },
        { id: 4, name: 'Maj', paraphrase: 'maja' },
        { id: 5, name: 'Czerwiec', paraphrase: 'czerwca' },
        { id: 6, name: 'Lipiec', paraphrase: 'lipca' },
        { id: 7, name: 'Sierpień', paraphrase: 'sierpnia' },
        { id: 8, name: 'Wrzesień', paraphrase: 'września' },
        { id: 9, name: 'Październik', paraphrase: 'października' },
        { id: 10, name: 'Listopad', paraphrase: 'listopada' },
        { id: 11, name: 'Grudzień', paraphrase: 'grudnia' }
    ]
}

export default DAYS_AND_MONTHS;