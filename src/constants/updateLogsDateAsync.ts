import axiosInstance from "../helpers/request";

/**
 *
 *
 * @param updateFor -
 * @param updateID -
 * @returm { Promise<void> } -
 */
const updateDate = async (updateFor: string, updateID: string | undefined): Promise<void> => {
   const date = new Date();
   const dateObject = {
      updateDateFor: updateFor,
      updateDate: {
         day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(),
         hour: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds(),
      },
   };
   await axiosInstance.put(`last-update/${updateID}`, dateObject);
}

export default updateDate;