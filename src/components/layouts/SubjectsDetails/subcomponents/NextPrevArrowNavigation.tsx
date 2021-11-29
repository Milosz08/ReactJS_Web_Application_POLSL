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

import * as React from 'react';
import { Fragment, useContext } from 'react';

import { useDispatch } from 'react-redux';
import { prevNextSubjectActivePanel } from '../../../../redux/preferencesReduxStore/actions';

import { NavigateArrowButton } from '../SubjectsDetails.styles';
import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

export enum arrowDirs {
    PREV, NEXT
}

interface PropsProvider {
    dir: arrowDirs;
}

/**
 * Component responsible for generating subjects details navigation buttons (prev subject
 * details or next subject) based prop enum value.
 *
 * @param dir { arrowDirs } - when user click button, goto left or right.
 */
const NextPrevArrowNavigation: React.FC<PropsProvider> = ({ dir }): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);
    const dispatcher = useDispatch();

    const handleButtonClick = (): void => {
        dispatcher(prevNextSubjectActivePanel(dir, filteredState!.length));
    };

    const renderedArrow: JSX.Element | null = filteredState!.length > 1 ? (
        <NavigateArrowButton
            onClick = {handleButtonClick}
            ifLeft = {dir === arrowDirs.PREV}
            title = {`Kliknij aby przejść do ${dir === arrowDirs.PREV ? 'poprzedniego' : 'następnego'} przedmiotu.`}
        />
    ): null;

    return (
        <Fragment>
            {renderedArrow}
        </Fragment>
    );
};

export default NextPrevArrowNavigation;