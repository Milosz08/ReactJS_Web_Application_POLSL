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

import { updateSections } from './types';

export interface FooterFormTypes {
    _id: string;
    userIdentity: string;
    userChoice: string;
    userMessage: string;
    servlettTime: {
        fullDate: string;
        fullTime: string;
    }
    __v?: number;
}

export interface CovidWarningsTypes {
    _id: string;
    description: string;
    actualRiskNumber: number;
    __v?: number;
}

export interface LastUpdateTypes {
    _id: string;
    updateDateFor: updateSections;
    updateDate: {
        date: string;
        time: string;
    }
    __v?: number;
}

export interface SubjectsContentTypes {
    _id: string;
    title: string;
    ifEnd: boolean;
    semesters: string[];
    departments: string[];
    icon: {
        family: string;
        name: string;
    };
    classesPatforms: {
        type: string;
        place: string;
        link: string;
    }[];
    __v?: number;
}