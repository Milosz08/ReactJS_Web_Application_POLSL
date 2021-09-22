/**
 * @file getSingleDateObject.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/19/2021
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