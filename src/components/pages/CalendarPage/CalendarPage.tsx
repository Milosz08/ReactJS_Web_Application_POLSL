/**
 * @file CalendarPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useEffect } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

import IncomingActivities from './IncomingActivitiesComponent/IncomingActivities';
import AdditionalInfos from './AdditionalInfosComponent/AdditionalInfos';
import CalendarContainer from './CalendarContainerComponent/CalendarContainer';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const DataLastUpdate = React.lazy(() => import('../../layouts/DataLastUpdate/DataLastUpdate'));

const { calendarContainer, calendarWrapper } = require('./CalendarPage.module.scss');

/**
 * @details Component responsible for the generation of a subpage (routing) that displays the student's calendar.
 */
const CalendarPage = (): JSX.Element => {

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.CALENDAR_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {2}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <div className = {calendarContainer}>
                <div className = {calendarWrapper}>
                    <IncomingActivities/>
                    <CalendarContainer/>
                    <DataLastUpdate
                        dataID = {process.env.REACT_APP_CALENDAR_ID}
                        content = 'kalendarza'
                        withoutText = {false}
                    />
                    <AdditionalInfos/>
                </div>
            </div>
        </Fragment>
    );
}

export default CalendarPage;