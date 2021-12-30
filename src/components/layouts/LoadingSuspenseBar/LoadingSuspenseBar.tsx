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

import useSuspenseBar from '../../../helpers/hooks/useSuspenseBar';

import { LoadingProgressBar, LoadingSuspenseBarContainer } from './LoadingSuspenseBar.styles';

/**
 * Component that generates a load bar with each routing on the site. The bar fills up synchronously at
 * the time interval declared in the constant ROUTER_INTERVAL_TIME.
 */
const LoadingSuspenseBar = (): JSX.Element => {

    const [ ifActive, widthState ] = useSuspenseBar();

    return (
        <LoadingSuspenseBarContainer
            ifVisible = {ifActive}
        >
            <LoadingProgressBar
                ifVisible = {ifActive}
                widthValue = {widthState}
            />
        </LoadingSuspenseBarContainer>
    );
}

export default LoadingSuspenseBar;