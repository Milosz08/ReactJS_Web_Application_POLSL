/**
 * @file updateLogsDateAsync.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/19/2021
 */

import axiosInstance from '../helpers/request';

/**
 * Interface that defines the date types in the object.
 */
interface DateObjectTypes {
   updateDateFor: string;
   updateDate: {
      [value: string]: number;
   }
}

/**
 * @details Async function that updates the date in the database of each section (when called, the given section ID and its name).
 *
 * @param updateFor { string } - name of the section to update
 * @param updateID { string | undefined } - section id number to update
 */
const updateDate = async (updateFor: string, updateID: string | undefined): Promise<void> => {
   const date = new Date();
   const dateObject: DateObjectTypes = {
      updateDateFor: updateFor,
      updateDate: {
         day: date.getDate(),
         month: date.getMonth() + 1,
         year: date.getFullYear(),
         hour: date.getHours(),
         minutes: date.getMinutes(),
         seconds: date.getSeconds(),
      },
   };
   await axiosInstance.put(`last-update/${updateID}`, dateObject);
}

export default updateDate;