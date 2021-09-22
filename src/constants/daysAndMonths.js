/**
 * @file daysAndMonths.js
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief JavaScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/19/2021
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