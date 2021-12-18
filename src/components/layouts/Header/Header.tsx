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
import useHeaderOnScroll from '../../../helpers/hooks/useHeaderOnScroll';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../../redux/preferencesReduxStore/initialState';

import { MainHeaderContainer } from './Header.styles';
import { FRONT_ENDPOINTS } from '../../../helpers/structs/appEndpoints';

const MainHeaderNavigation = React.lazy(() => import('./subcomponents/MainHeaderNavigation'));
const MainHeaderContent = React.lazy(() => import('./subcomponents/MainHeaderContent'));
const UnofficialInfo = React.lazy(() => import('./subcomponents/UnofficialInfo'));
const LoadingBigBar = React.lazy(() => import('../LoadingSuspenseBar/LoadingSuspenseBar'));
const CmsInfoBar = React.lazy(() => import('../CmsPageComponents/CmsInfoBar/CmsInfoBar'));

interface PropsProvider {
    ifHeaderHasRedBar: boolean;
}

/**
 * Component that generates the header on the page. Depending on the ifHeaderHasRedBar flag, header will
 * have a red site bar underneath it.
 *
 * @param ifHeaderHasRedBar { boolean } - parameter defining whether the header should be shown with a red bar
 *                                        informing about the site (true -> active bar).
 */
const Header: React.FC<PropsProvider> = ({ ifHeaderHasRedBar }): JSX.Element => {

    const { hamburgerToggle }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const { grabber, menuSticky, headerHide, elmHeight, width, offset } = useHeaderOnScroll(hamburgerToggle);

    const generateCmsInfobar = (): JSX.Element | null => {
        const checkIfIsCms = decodeURI(document.location.pathname).includes(FRONT_ENDPOINTS.ADMIN_PANEL.substring(1));
        return checkIfIsCms ? <CmsInfoBar/> : null;
    };

    return (
        <MainHeaderContainer
            ifFixed = {menuSticky}
            ifHide = {headerHide && width < 1250}
            elmHeight = {elmHeight}
        >
            <MainHeaderNavigation
                grabber = {grabber}
            />
            <MainHeaderContent
                width = {width}
                offset = {offset}
                elmHeight = {elmHeight}
                ifHeaderHasRedBar = {ifHeaderHasRedBar}
            />
            <LoadingBigBar/>
            {ifHeaderHasRedBar && <UnofficialInfo
                offset = {offset}
            />}
            {generateCmsInfobar()}
        </MainHeaderContainer>
    );
}

export default Header;