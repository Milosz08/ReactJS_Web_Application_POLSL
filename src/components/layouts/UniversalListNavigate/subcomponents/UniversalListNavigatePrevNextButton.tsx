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
import { UniversalListNavigateButton } from '../UniversalListNavigate.styles';
import { useDispatch } from 'react-redux';
import { changeCmsListPageNumber } from '../../../../redux/preferencesReduxStore/actions';
import { cmsListIndicators } from '../../../../redux/preferencesReduxStore/types';

export enum directions {
    PREV, NEXT
}

interface PropsProvider {
    dir: directions;
    type: cmsListIndicators;
}

const UniversalListNavigatePrevNextButton: React.FC<PropsProvider> = ({ dir, type }): JSX.Element => {

    const dispatcher = useDispatch();

    const handleClickPrevOrNextPage = (): void => {
        dispatcher(changeCmsListPageNumber(type, 1));
    };

    return (
        <UniversalListNavigateButton
            onClick = {handleClickPrevOrNextPage}
        >
            123
        </UniversalListNavigateButton>
    );
};

export default UniversalListNavigatePrevNextButton;