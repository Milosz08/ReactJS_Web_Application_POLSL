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
import usePageTitle from '../../helpers/hooks/usePageTitle';

import SearchingProvider from '../../context/searchingContext/SearchingProvider';
import { sortAvailables, sortInputTypes } from '../../redux/apiReduxStore/types';
import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';

import SubjectsAndTerms from '../layouts/SubjectsAndTerms/SubjectsAndTerms';
import SubjectCheckboxes from '../layouts/SubjectsCheckboxes/SubjectCheckboxes';
import SubjectsDetails from '../layouts/SubjectsDetails/SubjectsDetails';

const CookiesNotification = React.lazy(() => import('../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../layouts/CurrentURLpath/CurrentURLpath'));

/**
 * Component responsible for generating a page with the guidelines of the opinion of individual items.
 */
const SubjectsAndTermsPage = (): JSX.Element => {

    usePageTitle(ROUTING_PATH_NAMES.SUBJECT_PASS_PAGE);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {3}/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <SubjectsAndTerms/>
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

export default SubjectsAndTermsPage;