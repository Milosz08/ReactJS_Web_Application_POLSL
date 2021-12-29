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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { prefFields } from '../../../../redux/preferencesReduxStore/types';
import { SubjectsContentTypes } from '../../../../redux/apiReduxStore/dataTypes';
import { PrefActions } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import {
    SubjectIconWrapper, SubjectTileActiveElement, SubjectTileButton, SubjectTitleContainer
} from '../SubjectsCheckboxes.styles';

const IconComponent = React.lazy(() => import('../../../../helpers/componentsAndMiddleware/IconComponent'));

interface PropsProvider {
    tile: SubjectsContentTypes;
    id: number;
}

/**
 * Component that generates a list of items in the form of buttons. The props contain an array of items to
 * generate, the currently displayed item and a function that allows you to change the currently displayed item.
 *
 * @param tile { SubjectsContentTypes } - all tiles info (from redux and database).
 * @param id { number } - current active tile.
 */
const SingleSubjectElements: React.FC<PropsProvider> = ({ tile, id }): JSX.Element => {

    const { activeSubjectPanelID }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const handleToggleSubject = (): void => {
        dispatcher(PrefActions.changeRootPrefField(prefFields.ACTIVE_SUB_PANEL, id));
    };

    return (
        <SubjectTileButton
            onClick = {handleToggleSubject}
        >
            <SubjectIconWrapper>
                <IconComponent
                    family = {tile.icon.family}
                    name = {tile.icon.name}
                />
            </SubjectIconWrapper>
            <SubjectTileActiveElement
                ifActive = {activeSubjectPanelID === id}
            />
            <SubjectTitleContainer>
                {tile.title}
            </SubjectTitleContainer>
        </SubjectTileButton>
    );
};

export default SingleSubjectElements;