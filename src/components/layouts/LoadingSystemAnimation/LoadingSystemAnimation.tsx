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

import { InfiniteLoadVectorUse, InifiteLoadVector, LoadingSystemAnimationContainer } from './LoadingSystemAnimation.styles';

interface PropsProvider {
    hideAuth: boolean;
    ifMargin?: boolean;
    content?: string;
}

/**
 * Component rendering animation while waiting for data download from
 * API/logging into the system, etc.
 *
 * @param ifOpen { boolean } - props deciding whether to show the loading animation.
 */
const LoadingSystemAnimation: React.FC<PropsProvider> = ({ hideAuth, ifMargin, content }): JSX.Element => (
    <LoadingSystemAnimationContainer
        ifActive = {hideAuth}
        ifMargin = {ifMargin}
    >
        <InifiteLoadVector viewBox = '-2000 -1000 4000 2000'>
            <path
                id = 'inf'
                d = 'M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z'
            />
            <InfiniteLoadVectorUse
                xlinkHref = '#inf'
                strokeDasharray = '1570 5143'
                strokeDashoffset = '6713px'
            />
        </InifiteLoadVector>
        {content ? content : 'Logowanie do systemu...'}
    </LoadingSystemAnimationContainer>
);

export default LoadingSystemAnimation;