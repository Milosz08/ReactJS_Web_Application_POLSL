import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from "../helpers/request";
import MainStoreStateProvider from "./MainStoreStateProvider";

export const MainStoreContext = createContext<any>(null);

export const ROUTER_INTERVAL_TIME = .7; //w sekundach

interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Główny store pobierający i przechowujący niewrażliwe dane z serwera (komunikacja przy wykorzystaniu API z
 * backendu). Dziedziczą go wszystkie węzły aplikacji (store globalny).
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const MainStoreProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ dataFetchFromServer, setDataFetchFromServer ] = useState<MainStoreStateProvider>({
      covidData: [], footerForms: [], subjectsData: [], scheduleSubjects: [], calendarRecords: []
   });

   const [ routePath, setRoutePath ] = useState<boolean>(false);

   const timeoutRoutePath = () => {
      setRoutePath(true);
      setTimeout(() => { setRoutePath(false); },(ROUTER_INTERVAL_TIME + .3) * 1000);
   }

   useEffect(() => {
      const getAllData = async () => {
         const covidData = await axiosInstance.get('/covid-data');
         const footerForm = await axiosInstance.get('/footer-form');
         const subjectsData = await axiosInstance.get('/subjects-data');
         const subjectShedule = await axiosInstance.get('/subject-shedule');
         const calendarRecord = await axiosInstance.get('/calendar-record');

         const covidDataFetch = JSON.parse(covidData.request.response);
         const footerFormFetch = JSON.parse(footerForm.request.response);
         const subjectsDataFetch = JSON.parse(subjectsData.request.response);
         const scheduleSubjectsFetch = JSON.parse(subjectShedule.request.response);
         const calendarRecordsFetch = JSON.parse(calendarRecord.request.response);

         subjectsDataFetch.sort((a: any, b: any) => a.title.localeCompare(b.title));
         calendarRecordsFetch
            .sort((a: any, b: any) => a.day - b.day)
            .sort((a: any, b: any) => a.month - b.month)
            .sort((a: any, b: any) => a.year - b.year);

         setDataFetchFromServer({
            covidData: covidDataFetch, footerForms: footerFormFetch,
            subjectsData: subjectsDataFetch, scheduleSubjects: scheduleSubjectsFetch,
            calendarRecords: calendarRecordsFetch
         });
      }
      getAllData();
   }, []);
   
   return (
      <MainStoreContext.Provider
         value = {{
            dataFetchFromServer, setDataFetchFromServer,
            timeoutRoutePath, routePath, setRoutePath
         }}
      >
         {children}
      </MainStoreContext.Provider>
   );
}

export default MainStoreProvider;