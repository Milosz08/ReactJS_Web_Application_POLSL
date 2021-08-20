/**
 * @file updateLogsDateAsync.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/20/2021
 */

import axiosInstance from '../helpers/request';

/**
 * Interface that defines the date types in the object.
 */
interface DateObjectTypes {
   updateDateFor: string;
   scheduleBreak?: boolean;
   updateDate: {
      [value: string]: number;
   }
}

/**
 * @details Async function that updates the date in the database of each section (when called, the given section ID and its name).
 *
 * @param updateFor { string } - name of the section to update.
 * @param updateID { string | undefined } - section id number to update.
 * @param ifSchedule? { boolean } - (only for schedule) decides how the component is to behave in the case of a schedule.
 * @param schedule? { boolean } - (only for schedule) selection, whether the plan should be visible whether to be hidden.
 */
const updateDate = async (
   updateFor: string, updateID: string | undefined, ifSchedule: boolean = false, schedule: boolean = false
): Promise<void> => {
   const date = new Date();
   let dateObject: DateObjectTypes;
   if(ifSchedule) {
      dateObject = {
         updateDateFor: updateFor,
         scheduleBreak: schedule,
         updateDate: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
         },
      };
   } else {
      dateObject = {
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
   }

   await axiosInstance.put(`last-update/${updateID}`, dateObject);
}

export default updateDate;