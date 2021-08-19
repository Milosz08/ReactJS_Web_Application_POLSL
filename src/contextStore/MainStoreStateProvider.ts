/**
 * @file MainStoreStateProvider.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing types of values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/18/2021
 */

import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * @details Interface of object types captured from the database. Interface exported to the main page
 *          (MainStoreProvider) that stores in the object all the data downloaded from the API.
 */
interface MainStoreStateProvider {
   covidData: {
      _id: string,
      description: string,
      actualRiskNumber: number,
      __v: number
   }[];
   footerForms: {
      _id: string,
      userIdentity: string,
      userChoice: string,
      userMessage: string,
      sendDate: {
         fullDate: string,
         fullTime: string
      }, __v: number
   }[];
   subjectsData: {
      _id: string,
      semesters: string[],
      departments: string[],
      icon: IconProp,
      ifEnd: boolean;
      classesPlatforms: {
         type: string,
         place: string,
         link: string
      }[],
      title: string,
      __v: number
   }[];
   scheduleSubjects: {
      _id: string,
      title: string,
      group: string,
      day: string,
      type: string,
      start: string,
      end: string,
      pzeInfo: {
         platform: string,
         pzeLink: string
      }
   }[];
   calendarRecords: {
      day: number,
      month: number,
      year: number,
      items: {
         start: string,
         message: string,
         importantLevel: string
      }[]
   }[];
}

export default MainStoreStateProvider;