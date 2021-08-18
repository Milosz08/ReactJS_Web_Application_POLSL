import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import axiosInstance from "../helpers/request";
import GROUPS_STATIC from "../constants/allGroups";
import { SubjectsProvider } from "../components/layouts/Subjects/Subjects";

interface PropsProvider {
   children: React.ReactNode;
}

interface ValidateProvider {
   [value: string]: boolean;
}

interface ScheduleProvider {
   [value: string]: string;
}

export interface FormScheduleModalTypes {
   errors: ValidateProvider;
   setErrors: Dispatch<SetStateAction<ValidateProvider>>;
   scheduleForm: ScheduleProvider;
   setScheduleForm: Dispatch<SetStateAction<ScheduleProvider>>;
   allSubjects: SubjectsProvider[];
   setAllSubjects: Dispatch<SetStateAction<SubjectsProvider[]>>;
   validateAll: () => ValidateProvider;
}

export const FormScheduleModalContext = createContext<Partial<FormScheduleModalTypes>>({ });

/**
 *
 * @param children
 */
const FormScheduleModalProvider: React.FC<PropsProvider> = ({ children }) => {

   const [ allSubjects, setAllSubjects ] = useState<SubjectsProvider[]>([ ]);
   const [ errors, setErrors ] = useState<ValidateProvider>({ hourStart: false, hourEnd: false });
   const [ scheduleForm, setScheduleForm ] = useState<ScheduleProvider>({ title: '', group: '', type: '', start: '', end: '' });

   const changeStringToInt = (str: string): number => {
      const withoutDots = str.replace(':', '');
      return parseInt(withoutDots);
   }

   const validateAll = (): ValidateProvider => {
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