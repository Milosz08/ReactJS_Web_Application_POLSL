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

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';

import { allModals } from '../../redux/modalsReduxStore/types';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';

import { apiReducerTypes } from '../../redux/apiReduxStore/types';
import { ApiInitialTypes } from '../../redux/apiReduxStore/initialState';

import { STATIC_DAYS } from '../structs/schedule.config';

/**
 * Custom hook responsible for finding exact resource based modalType, apiType and resource _id property.
 */
const useFindMatchingElement = (modalType: allModals, apiType: apiReducerTypes, day: string = STATIC_DAYS[0].eng) => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const apiInitialState: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);

    const additionalMark = modalType === allModals.SCHEDULE_MODAL ? apiInitialState[apiType][day] : apiInitialState[apiType];
    const findIndexElm = additionalMark.findIndex((el: any) => el._id === modalsInitialState[modalType].dataID);

    return additionalMark[findIndexElm];
};

export default useFindMatchingElement;