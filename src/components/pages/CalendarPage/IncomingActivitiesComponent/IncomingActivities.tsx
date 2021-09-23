/**
 * @file IncomingActivities.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 09/22/2021
 */

import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../contextStore/MainStoreProvider';

import separatingCalendarRecords, { ObjectProvider } from '../../../../helpers/separatingCalendarRecords';
import getSingleDateObjects from '../../../../constants/getSingleDateObjects';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const { emptySubjectField, emptyIcon } = require('./../../../layouts/Subjects/Subjects.module.scss');
const { universalHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
    incomingActivities, incomingActivitiesContainer, incomingActivitiesWrapper, dateInfoAbsolute, mainContent,
    indicatorRight, low, medium, high, asideActivitiesInfo
} = require('./IncomingActivities.module.scss');

/**
 * This constant that defines how many days in advance upcoming events should show up.
 */
const DAYS_INCOME: number = 7;

/**
 * @details Component responsible for generating upcoming events. Bookmark in addition to the student's
 *          calendar for quick information about upcoming events.
 */
const IncomingActivities = (): JSX.Element => {

    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { calendarRecords } = dataFetchFromServer;

    const [ allActivities, setAllActivities ] = useState<ObjectProvider[]>([]);

    // eslint-disable-next-line array-callback-return
    const generateRecentActivities = allActivities.map((activity: ObjectProvider): JSX.Element | undefined => {
        const { date } = activity;

        const currDate: Date = new Date();
        const itemDate: Date = new Date(date);

        const ifDateIsNotLower: boolean = itemDate.getTime() > currDate.getTime();
        const ifDateIsNotHigher: boolean = itemDate.getTime() < (currDate.getTime() + (1000 * 60 * 60 * 24 * DAYS_INCOME));

        const { day, month, hours, minutes } = getSingleDateObjects(itemDate);

        const chooseImportantLevel = (): string | undefined => {
            switch (activity.important) {
                case 'low':
                    return low;
                case 'medium':
                    return medium;
                case 'high':
                    return high;
            }
        }

        if (ifDateIsNotLower && ifDateIsNotHigher) {
            return (
                <div
                    className = {incomingActivitiesContainer}
                    key = {activity._id}
                >
                    <span className = {classnames(dateInfoAbsolute, chooseImportantLevel())}>
                        {day}/{month}/{itemDate.getFullYear()}, {hours}:{minutes}
                    </span>
                    <span className = {mainContent}>
                        {activity.message}
                    </span>
                    <span className = {classnames(indicatorRight, chooseImportantLevel())}/>
                </div>
            );
        }
    });

    const generateNonActivities: JSX.Element | null = generateRecentActivities.every((curValue) => curValue === undefined) ? (
        <div className = {emptySubjectField}>
            <FontAwesomeIcon
                icon = {[ 'fas', 'exclamation-circle' ]}
                className = {emptyIcon}
            />
            <span>Brak nadchodzących wydarzeń.</span>
            <span className = {asideActivitiesInfo}>
                Wydarzenia wyświetlane są automatycznie z {DAYS_INCOME}-dniowym wyprzedzeniem.
            </span>
        </div>
    ) : null;

    useEffect(() => {
        const returnerArray = separatingCalendarRecords(calendarRecords);
        setAllActivities(returnerArray);
    }, [ calendarRecords ]);

    return (
        <section className = {classnames(incomingActivities, universalHeader)}>
            <UniversalHeader
                iconP = {[ 'fas', 'business-time' ]}
                content = 'Nadchodzące Wydarzenia'
                ifCloseButtonVisible = {false}
            />
            <div className = {incomingActivitiesWrapper}>
                {generateRecentActivities}
            </div>
            {generateNonActivities}
        </section>
    );
};

export default IncomingActivities;