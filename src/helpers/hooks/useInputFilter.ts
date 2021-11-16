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

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../../redux/reduxStore';
import { sortInputTypes } from '../../redux/apiReduxStore/types';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';

/**
 *
 *
 * @param preArray
 * @param typeofInput
 */
const useInputFilter = (preArray: any, typeofInput: sortInputTypes): any[] => {

    const { searchInputs: inpts }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const [ filtered, setFiltered ] = useState<any[]>(preArray);
    const input = inpts[typeofInput];

    useEffect(() => {
        setFiltered(
            // eslint-disable-next-line array-callback-return
            preArray.filter((el: any) => {
                if (input === '') {
                    return el;
                } else if (el.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                    return el;
                }
            })
        );
    }, [ input, preArray ])

    return filtered;
};

export default useInputFilter;