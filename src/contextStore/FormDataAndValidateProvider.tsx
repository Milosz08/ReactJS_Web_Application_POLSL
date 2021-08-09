import React, { createContext, useState, useContext } from 'react';
import { ModalsStateContext } from './ModalsStateProvider';

export const FormDataAndValidateContext = createContext<any>(null);

interface PropsProvider {
   children: React.ReactNode;
}

interface ErrorsProvider {
   title: boolean;
   checkbox: boolean;
   department: boolean;
   icon: boolean;
   platform: boolean;
}

interface PlatformProvider {
   type: string;
   place: string;
   link: string;
}

/**
 * Store przechowujący wprowadzane dane do formularza wysyłającego te dane poprzez API na serwer.
 * Posiada klasę walidującą wprowadzane dane, przed wysłaniem na serwer.
 *
 * @param children { React.ReactNode } - wszystkie węzły dziedziczące zawartość stora.
 */
const FormDataAndValidateProvider: React.FC<PropsProvider> = ({ children }) => {

   const { setSubjectModal } = useContext<any>(ModalsStateContext);

   const [ title, setTitle ] = useState<string>('');
   const [ semesters, setSemesters ] = useState<Array<string>>(Array.from({ length: 7 }, () => ''));
   const [ ifEnd, setIfEnd ] = useState<Array<boolean>>([true, false]);
   const [ icon, setIcon ] = useState<string>('');

   const [ departmentsCount, setDepartmentsCount ] = useState<number>(1);
   const [ departments, setDepartments ] = useState<Array<string>>(Array.from({ length: departmentsCount }, () => ''));

   const [ classesPlatformsCount, setClassesPlatformsCount ] = useState<number>(1);
   const [ classesPlatforms, setClassesPlatforms ] = useState<Array<PlatformProvider>>(Array.from({
      length: classesPlatformsCount }, () => ({ type: 'Wykłady', place: 'Zoom', link: '' })
   ));

   const [ errors, setErrors ] = useState<ErrorsProvider>({
      title: false, checkbox: false, department: false, icon: false, platform: false
   });

   /**
    * Klasa przechowująca metody walidujące dane wprowadzane do inputów przez wysłaniem do API
    */
   class ValidationClass {
      validateTitle(): boolean {
         return title.length < 10 || title.length > 50;
      }

      validateCheckbox(): boolean {
         const checkEmptyValues = semesters.filter(semester => semester !== '');
         return checkEmptyValues.length === 0;
      }

      validateDepartment(): boolean {
         const checkEmptyValues = departments.filter(department => department !== '' && department.length > 5);
         return checkEmptyValues.length !== departments.length;
      }

      validateIcon(): boolean {
         return icon.length < 3 || icon.length > 20;
      }

      validatePlatform(): boolean {
         const arrayOfTypes: Array<any> = [];
         classesPlatforms.forEach(object => arrayOfTypes.push(object.type));
         const validUrl = classesPlatforms.filter(object => !object.link.includes('https://'));
         return arrayOfTypes.length !== new Set(arrayOfTypes).size || validUrl.length !== 0;
      }
   }

   const validateAll = ()  => {
      const {
         validateTitle, validateCheckbox, validateDepartment, validateIcon, validatePlatform
      } = new ValidationClass();

      const checkAll = () => !title && !checkbox && !department && !icon && !platform;

      const title = validateTitle();
      const checkbox = validateCheckbox();
      const department = validateDepartment();
      const icon = validateIcon();
      const platform = validatePlatform();
      const checkFull = checkAll();

      return { title, checkbox, department, icon, platform, checkFull };
   }

   const restoreValues = (): void => {
      setSubjectModal({ id: null, type: '', ifOpen: false });
      setTitle('');
      setSemesters(Array.from({ length: 7 }, () => ''));
      setIfEnd([true, false]);
      setIcon('');
      setDepartmentsCount(1);
      setDepartments(Array.from({ length: departmentsCount }, () => ''));
      setClassesPlatformsCount(1);
      setClassesPlatforms(Array.from({
         length: classesPlatformsCount }, () => ({ type: 'Wykłady', place: 'Zoom', link: '' })
      ));
      setErrors({ title: false, checkbox: false, department: false, icon: false, platform: false });
   }

   return (
      <FormDataAndValidateContext.Provider
         value = {{
            title, setTitle,
            semesters, setSemesters,
            ifEnd, setIfEnd,
            icon, setIcon,
            departmentsCount, setDepartmentsCount,
            departments, setDepartments,
            classesPlatformsCount, setClassesPlatformsCount,
            classesPlatforms, setClassesPlatforms,
            errors, setErrors,
            validateAll, restoreValues
         }}
      >
         {children}
      </FormDataAndValidateContext.Provider>
   );
}

export default FormDataAndValidateProvider;