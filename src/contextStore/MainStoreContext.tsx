import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from "../helpers/request";
import MainStoreStateProvider from "./MainStoreStateProvider";

export const MainStoreContext = createContext<any>(null);

interface PropsProvider {
   children: React.ReactNode;
}

/**
 * Główny store pobierający i przechowujący niewrażliwe dane z serwera (komunikacja przy wykorzystaniu API z
 * backendu). Dziedziczą go wszystkie węzły aplikacji (store globalny).
 *
 * @param children - wszystkie węzły dziedziczące zawartość stora.
 */
const MainStoreProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ dataFetchFromServer, setDataFetchFromServer ] = useState<MainStoreStateProvider>({
      covidData: [], footerForms: [], subjectsData: [], sheduleSubjects: [], calendarRecords: []
   });

   useEffect(() => {
      const getAllData = async () => {
         const covidData = await axiosInstance.get('/covid-data');
         const footerForm = await axiosInstance.get('/footer-form');
         const subjectsData = await axiosInstance.get('/subjects-data');
         const subjectShedule = await axiosInstance.get('/subject-shedule');
         const calendarRecord = await axiosInstance.get('/calendar-record');

         setDataFetchFromServer({
            covidData: JSON.parse(covidData.request.response),
            footerForms: JSON.parse(footerForm.request.response),
            subjectsData: JSON.parse(subjectsData.request.response),
            sheduleSubjects: JSON.parse(subjectShedule.request.response),
            calendarRecords: JSON.parse(calendarRecord.request.response)
         });
      }
      getAllData();
   }, []);
   
   return (
      <MainStoreContext.Provider
         value = {{ dataFetchFromServer, setDataFetchFromServer }}
      >
         {children}
      </MainStoreContext.Provider>
   );
}

export default MainStoreProvider;