/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import React, { Fragment } from 'react';
import ROUTING_PATH_NAMES from '../../../helpers/structs/routingPathNames';

import CovidInfoSection from '../../layouts/CovidInfoSection/CovidInfoSection';
import EstimateCounter from '../../layouts/EstimateCounter/EstimateCounter';
import ImagesSlider from '../../layouts/ImagesSlider/ImagesSlider';
import SubjectCheckboxes from '../../layouts/SubjectsCheckboxes/SubjectCheckboxes';
import SubjectsDetails from '../../layouts/SubjectsDetails/SubjectsDetails';
import SearchingProvider from '../../../context/searchingContext/SearchingProvider';
import { sortAvailables, sortInputTypes } from '../../../redux/apiReduxStore/types';
import usePageTitle from '../../../helpers/hooks/usePageTitle';
import CalendarIncomingActivites from '../../layouts/CalendarIncomingActivities/CalendarIncomingActivites';
import CurrentSubjectActive from '../../layouts/CurrentSubjectActive/CurrentSubjectActive';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const Navigation = React.lazy(() => import('../../layouts/NavigationStart/NavigationStart'));

/**
 * Component responsible for generating the start page (absolute address - "/").
 */
const StartPage = (): JSX.Element => {

    usePageTitle(ROUTING_PATH_NAMES.START_PAGE);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {0}/>
            <Header ifHeaderHasRedBar = {true}/>
            <ImagesSlider/>
            <CovidInfoSection/>
            <EstimateCounter/>
            <CurrentSubjectActive/>
            <CalendarIncomingActivites/>
            <Navigation/>
            <SearchingProvider
                sortType = {sortInputTypes.SUBJECT_SEARCH}
                arrayType = {sortAvailables.SUBJECTS}
                sortByType = 'title'
            >
                <SubjectCheckboxes/>
                <SubjectsDetails/>
            </SearchingProvider>
        </Fragment>
    );
}

export default StartPage;
