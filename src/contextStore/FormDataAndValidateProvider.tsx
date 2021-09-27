/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { ModalsStateContext, ModalStateType } from './ModalsStateProvider';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of errors values.
 */
interface ErrorsProvider {
    [value: string]: boolean;
}

/**
 * Interface defining the type of platform values.
 */
interface PlatformProvider {
    [value: string]: string;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface FormDataAndValidateType {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    semesters: string[];
    setSemesters: Dispatch<SetStateAction<string[]>>;
    ifEnd: boolean[];
    setIfEnd: Dispatch<SetStateAction<boolean[]>>;
    icon: string;
    setIcon: Dispatch<SetStateAction<string>>;
    departmentsCount: number;
    setDepartmentsCount: Dispatch<SetStateAction<number>>;
    departments: string[];
    setDepartments: Dispatch<SetStateAction<string[]>>;
    classesPlatformsCount: number;
    setClassesPlatformsCount: Dispatch<SetStateAction<number>>;
    classesPlatforms: PlatformProvider[];
    setClassesPlatforms: Dispatch<SetStateAction<PlatformProvider[]>>;
    errors: ErrorsProvider;
    setErrors: Dispatch<SetStateAction<ErrorsProvider>>;
    validateAll: () => ErrorsProvider;
    restoreValues: () => void;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const FormDataAndValidateContext = createContext<Partial<FormDataAndValidateType>>({});

/**
 * @details Store that stores the entered data to the form that sends this data via API to the server. It has
 *          a class that validates the entered data before sending it to the server.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const FormDataAndValidateProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const { setSubjectModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);

    const [ title, setTitle ] = useState<string>('');
    const [ semesters, setSemesters ] = useState<string[]>(Array.from({ length: 7 }, () => ''));
    const [ ifEnd, setIfEnd ] = useState<boolean[]>([ true, false ]);
    const [ icon, setIcon ] = useState<string>('');

    const [ departmentsCount, setDepartmentsCount ] = useState<number>(1);
    const [ departments, setDepartments ] = useState<string[]>(Array.from({ length: departmentsCount }, () => ''));

    const [ classesPlatformsCount, setClassesPlatformsCount ] = useState<number>(1);
    const [ classesPlatforms, setClassesPlatforms ] = useState<PlatformProvider[]>(Array.from({
            length: classesPlatformsCount
        }, () => ({ type: 'Wykłady', place: 'Zoom', link: '' })
    ));

    const [ errors, setErrors ] = useState<ErrorsProvider>({
        title: false, checkbox: false, department: false, icon: false, platform: false
    });

    /**
     * Class which stores methods that validate data entered into inputs before being sent to the API.
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
            const arrayOfTypes: any[] = [];
            classesPlatforms.forEach(object => arrayOfTypes.push(object.type));
            const validUrl = classesPlatforms.filter(object => !object.link.includes('https://'));
            return arrayOfTypes.length !== new Set(arrayOfTypes).size || validUrl.length !== 0;
        }
    }

    const validateAll = (): ErrorsProvider => {
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
        setSubjectModal!({ id: '', type: '', ifOpen: false });
        setTitle('');
        setSemesters(Array.from({ length: 7 }, () => ''));
        setIfEnd([ true, false ]);
        setIcon('');
        setDepartmentsCount(1);
        setDepartments(Array.from({ length: departmentsCount }, () => ''));
        setClassesPlatformsCount(1);
        setClassesPlatforms(Array.from({ length: classesPlatformsCount }, () => ({ type: 'Wykłady', place: 'Zoom', link: '' })));
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