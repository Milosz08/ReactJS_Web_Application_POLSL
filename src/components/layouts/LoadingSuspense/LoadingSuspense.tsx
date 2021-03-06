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
import { useEffect, useState } from 'react';

import { InfiniteLoad, InfiniteUse, LoadingSuspenseContainer } from './LoadingSuspense.styles';

/**
 * Component responsible for generating the board that is displayed while loading all
 * React componentsAndMiddleware.
 */
const LoadingSuspense = (): JSX.Element => {

    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        }
    }, []);

    return (
        <LoadingSuspenseContainer
            ifActive = {isVisible}
        >
            <InfiniteLoad viewBox = '-2000 -1000 4000 2000'>
                <path
                    id = 'inf'
                    d = 'M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z'
                />
                <InfiniteUse
                    xlinkHref = '#inf'
                    strokeDasharray = '1570 5143'
                    strokeDashoffset = '6713px'
                />
            </InfiniteLoad>
            Ładowanie strony...
        </LoadingSuspenseContainer>
    );
}

export default LoadingSuspense;