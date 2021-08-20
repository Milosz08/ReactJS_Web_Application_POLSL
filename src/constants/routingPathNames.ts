/**
 * @file routingPathNames.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/18/2021
 */

/**
 * Interface defining the type of object values.
 */
interface ObjectProvider {
   [pathNames: string]: string;
}

/**
 * Constant prefix on every PATH name constant.
 */
const _DEFAULT_PREFIX: string = 'Informatyka | ';

/**
 * @details An object that stores all dependencies related to title names while rendering subsequent page components.
 */
const ROUTING_PATH_NAMES: ObjectProvider = {
   START_PAGE: `${_DEFAULT_PREFIX}Wydział Elektryczny Politechniki Śląskiej`,
   SCHEDULE_PAGE: `${_DEFAULT_PREFIX}Interaktywny Plan Zajęć`,
   CALENDAR_PAGE: `${_DEFAULT_PREFIX}Kalendarz Studenta`,
   AISD_PAGE: `${_DEFAULT_PREFIX}Pomoce Naukowe`,
   LOGIN_PAGE: `${_DEFAULT_PREFIX}Logowanie do Systemu`,
   CMS_LOGIN_PAGE: `${_DEFAULT_PREFIX}Logowanie do Panelu CMS`,
   CMS_PANEL_PAGE: `${_DEFAULT_PREFIX}Panel Administratora`,
   COOKIES_POLICY: `${_DEFAULT_PREFIX}Polityka Cookies`,
   SUBJECT_PASS_PAGE: `${_DEFAULT_PREFIX}Warunki Zaliczenia Przedmiotów`,
}

export default ROUTING_PATH_NAMES;