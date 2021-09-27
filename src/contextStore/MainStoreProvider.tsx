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
import MainStoreStateProvider from './MainStoreStateProvider';

/**
 * Constant that defines the time after which routing on the page is to take place (in seconds).
 */
export const ROUTER_INTERVAL_TIME = .7;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    children: React.ReactNode;
}

/**
 * Interface defining the type of return in context store values.
 */
export interface MainStoreProviderTypes {
    dataFetchFromServer: MainStoreStateProvider | any;
    setDataFetchFromServer: Dispatch<SetStateAction<MainStoreStateProvider>> | any;
    timeoutRoutePath: (value: string) => void;
    routePath: boolean;
    setRoutePath: Dispatch<SetStateAction<boolean>>;
    summerBreak: boolean;
    setSummerBreak: Dispatch<SetStateAction<boolean>>;
}

/**
 * Create the context of the store. Function exported and used to destructurize context members.
 */
export const MainStoreContext = createContext<Partial<MainStoreProviderTypes>>({});

/**
 * @details The main store that downloads and stores non-sensitive data from the server (communication using the API
 *          from the backend). All application nodes (global store) inherit it.
 *
 * @param children { React.ReactNode } - all nodes of the virtual DOM React tree covered by the Provider.
 */
const MainStoreProvider: React.FC<PropsProvider> = ({ children }) => {

    const [ dataFetchFromServer, setDataFetchFromServer ] = useState<MainStoreStateProvider>({
        covidData: [], footerForms: [], subjectsData: [], scheduleSubjects: [], calendarRecords: []
    });

    const [ routePath, setRoutePath ] = useState<boolean>(false);
    const [ summerBreak, setSummerBreak ] = useState<boolean>(true);

    const timeoutRoutePath = (gotoPath: string): void => {
        if (gotoPath !== decodeURIComponent(document.location.pathname)) { //Prevent goto same page
            setRoutePath(true);
            setTimeout(() => {
                setRoutePath(false);
            }, (ROUTER_INTERVAL_TIME + .3) * 1000);
        }
    }

    dataFetchFromServer.calendarRecords
        .sort((a: any, b: any) => a.day - b.day)
        .sort((a: any, b: any) => a.month - b.month)
        .sort((a: any, b: any) => a.year - b.year);

    useEffect(() => {
        const getAllData = async (): Promise<any> => {
            const covidData = await axiosInstance.get('/covid-data');
            const footerForm = await axiosInstance.get('/footer-form');
            const subjectsData = await axiosInstance.get('/subjects-data');
            const subjectShedule = await axiosInstance.get('/subject-schedule');
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
                covidData: covidDataFetch,
                footerForms: footerFormFetch,
                subjectsData: subjectsDataFetch,
                scheduleSubjects: scheduleSubjectsFetch,
                calendarRecords: calendarRecordsFetch
            });
        }

        const getScheduleBreak = async (): Promise<any> => {
            const allDates = await axiosInstance.get(`/last-update/${process.env.REACT_APP_SCHEDULE_ID}`);
            const allDatesFetch = JSON.parse(allDates.request.response);
            setSummerBreak(allDatesFetch.scheduleBreak);
        }

        getAllData();
        getScheduleBreak();
    }, []);

    return (
        <MainStoreContext.Provider
            value = {{
                dataFetchFromServer, setDataFetchFromServer,
                timeoutRoutePath, routePath, setRoutePath,
                summerBreak, setSummerBreak
            }}
        >
            {children}
        </MainStoreContext.Provider>
    );
}

export default MainStoreProvider;