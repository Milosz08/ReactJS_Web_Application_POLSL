import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from "../helpers/request";
import GROUPS_STATIC from "../constants/allGroups";

export const FormScheduleModalContext = createContext<any>(null);

interface PropsProvider {
   children: React.ReactNode;
}

interface ErrorsProvider {
   hourStart: boolean;
   hourEnd: boolean;
}

interface ValidateReturnProvider {
   hourStartBool: boolean;
   hourEndBool: boolean;
}

interface ScheduleProvider {
   title: string;
   group: string;
   type: string;
   start: string;
   end: string;
}

/**
 *
 * @param children
 */
const FormScheduleModalProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ allSubjects, setAllSubjects ] = useState<Array<any>>([]);

   const [ errors, setErrors ] = useState<ErrorsProvider>({ hourStart: false, hourEnd: false });
   const [ scheduleForm, setScheduleForm ] = useState<ScheduleProvider>({
      title: '', group: '', type: '', start: '', end: ''
   });

   const changeStringToInt = (str: string): number => {
      const withoutDots = str.replace(':', '');
      return parseInt(withoutDots);
   }

   const validateAll = (): ValidateReturnProvider => {
      let hourStartBool = false, hourEndBool = false;
      const { start, end } = scheduleForm;

      if(start === '') {
         hourStartBool = true;
      }
      if(end === '') {
         hourEndBool = true;
      }
      if(changeStringToInt(start) >= changeStringToInt(end)) {
         hourStartBool = true;
      }

      return { hourStartBool, hourEndBool };
   }

   useEffect(() => {
      const fetchSubjectsData = async () => {
         const subjectsData = await axiosInstance.get('/subjects-data');
         const subjectsDataFetch = JSON.parse(subjectsData.request.response);
         subjectsDataFetch.sort((a: any, b: any) => a.title.localeCompare(b.title));
         setScheduleForm({
            title: subjectsDataFetch[0].title,
            group: GROUPS_STATIC.NORMAL_GROUPS[0].field,
            type: subjectsDataFetch[0].classesPlatforms[0].type,
            start: '',
            end: '',
         });
         setAllSubjects(subjectsDataFetch);
      }
      fetchSubjectsData();
   }, []);

   return (
      <FormScheduleModalContext.Provider
         value = {{
            errors, setErrors,
            scheduleForm, setScheduleForm,
            allSubjects, setAllSubjects,
            validateAll
         }}
      >
         {children}
      </FormScheduleModalContext.Provider>
   );
}

export default FormScheduleModalProvider;