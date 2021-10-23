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
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { toggleHamburger } from '../../../../redux/preferencesReduxStore/actions';

import { HamburgerBars, HamburgerButtonContainer } from '../Hamburger.styles';

/**
 *
 */
const HamburgerButton: React.FC = (): JSX.Element => {

    const { hamburgerToggle }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const handleHamburgerButton = () => {
        dispatcher(toggleHamburger());
    };

    return (
        <HamburgerButtonContainer
            onClick = {handleHamburgerButton}
            title = {`Kliknij aby ${hamburgerToggle ? 'schować' : 'rozwinąć'} menu`}
        >
            <HamburgerBars
                ifActive = {hamburgerToggle}
            />
        </HamburgerButtonContainer>
    );
};

export default HamburgerButton;