/**
 * @file aidsTilesData.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/19/2021
 */

/**
 * @details Function Returning the DATE class object based on time (on days) passed on in the parameter.
 *
 * @param expDays { number } - time after which the cookie file will be deleted.
 */
const cookieExpires = (expDays: number) => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    return date;
}

export default cookieExpires;