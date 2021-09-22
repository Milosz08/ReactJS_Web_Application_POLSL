/**
 * @file separatingCalendarRecords.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief Helper TS function.
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 09/22/2021
 */

export interface ObjectProvider {
    _id: string,
    date: string,
    important: string,
    message: string,
}

/**
 * @details This function takes an array of objects (calendar entries) as a parameter and uses it to generate
 *          a new array of objects, this time separating all activities (including those on the same day).
 *
 * @param calendarRecords { object[] } - all calendar activities pulled from api in react component.
 *
 * @return { ObjectProvider[] } - inverted result array with all calendar entries separated
 */
const separatingCalendarRecords = (calendarRecords: ObjectProvider) => {
    let endingArray: ObjectProvider[] = [];

    // @ts-ignore
    for (const record of calendarRecords) {

        const day = record.day < 10 ? `0${record.day}` : record.day;
        const month = record.month + 1 < 10 ? `0${record.month + 1}` : record.month + 1;

        if (record.items.length > 1) { //If in same day is 2n activities
            for (const item of record.items) {
                endingArray.push({
                    _id: record._id,
                    date: `${record.year}-${month}-${day}T${item.start}`,
                    important: item.importantLevel,
                    message: item.message
                });
            }
        } else { //If in same day is one activity
            endingArray.push({
                _id: record._id,
                date: `${record.year}-${month}-${day}T${record.items[0].start}`,
                important: record.items[0].importantLevel,
                message: record.items[0].message
            });
        }
    }

    return endingArray.reverse();
}

export default separatingCalendarRecords;