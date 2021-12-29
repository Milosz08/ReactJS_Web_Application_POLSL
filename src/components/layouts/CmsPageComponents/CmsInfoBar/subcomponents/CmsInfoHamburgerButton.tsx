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
import { RootState } from '../../../../../redux/reduxStore';
import { prefFields } from '../../../../../redux/preferencesReduxStore/types';
import { PrefActions } from '../../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../../redux/preferencesReduxStore/initialState';

import { CmsHamburgerBars, CmsHamburgerButton, CmsHamburgerButtonContainer } from '../CmsInfoBar.styles';

/**
 * Component responsible for generating hamburger button, which toggle hamburger menu visibility
 * (only on small devices).
 */
const CmsInfoHamburgerButton: React.FC = (): JSX.Element => {

    const { cmsHamburgerToggle }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const handleHamburgerButtonClick = (): void => {
        dispatcher(PrefActions.changeRootPrefField(prefFields.CMS_HAMBURGER_TOGGLE, !cmsHamburgerToggle));
    };

    return (
        <CmsHamburgerButtonContainer
            title = {`Kliknij aby ${cmsHamburgerToggle ? 'schować' : 'rozwinąć'} szczegóły`}
        >
            <CmsHamburgerButton
                onClick = {handleHamburgerButtonClick}
            >
                <CmsHamburgerBars
                    ifActive = {cmsHamburgerToggle}
                />
            </CmsHamburgerButton>
        </CmsHamburgerButtonContainer>
    );
};

export default CmsInfoHamburgerButton;