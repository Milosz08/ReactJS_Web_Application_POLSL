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

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import axiosInstance from '../helpers/request';

import GROUPS_STATIC from '../constants/allGroups';
import { SubjectsProvider } from '../components/layouts/Subjects/Subjects';

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of validate values.
 */
interface ValidateProvider {
    [value: string]: boolean;
}

/**
 * Interface defining the type of schedule values.
 */
interface ScheduleProvider {
    [value: string]: string;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface FormScheduleModalTypes {
    errors: ValidateProvider;
    setErrors: Dispatch<SetStateAction<ValidateProvider>>;
    scheduleForm: ScheduleProvider;
    setScheduleForm: Dispatch<SetStateAction<ScheduleProvider>>;
    allSubjects: SubjectsProvider[];
    setAllSubjects: Dispatch<SetStateAction<SubjectsProvider[]>>;
    validateAll: () => ValidateProvider;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const FormScheduleModalContext = createContext<Partial<FormScheduleModalTypes>>({});

/**
 * @details Component that stores and shares the state for a modal that adds a new subject to the schedule.
 *          It also has validation of the entered data before sending to the server.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const FormScheduleModalProvider: React.FC<PropsProvider> = ({ children }): JSX.Element => {

    const [ allSubjects, setAllSubjects ] = useState<SubjectsProvider[]>([]);
    const [ errors, setErrors ] = useState<ValidateProvider>({ hourStart: false, hourEnd: false });
    const [ scheduleForm, setScheduleForm ] = useState<ScheduleProvider>({
        title: '', group: '', room: '', type: '', start: '', end: ''
    });

    const changeStringToInt = (str: string): number => {
        const withoutDots = str.replace(':', '');
        return parseInt(withoutDots);
    }

    const validateAll = (): ValidateProvider => {
        let hourStartBool = false, hourEndBool = false;
        const { start, end } = scheduleForm;

        if (start === '') {
            hourStartBool = true;
        }
        if (end === '') {
            hourEndBool = true;
        }
        if (changeStringToInt(start) >= changeStringToInt(end)) {
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
                title: subjectsDataFetch[0]?.title,
                group: GROUPS_STATIC.NORMAL_GROUPS[0].field,
                type: subjectsDataFetch[0]?.classesPlatforms[0].type,
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