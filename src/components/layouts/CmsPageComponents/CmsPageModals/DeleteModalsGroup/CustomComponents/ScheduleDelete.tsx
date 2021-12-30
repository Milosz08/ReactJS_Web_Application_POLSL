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

import useFindMatchingElement from '../../../../../../helpers/hooks/useFindMatchingElement';
import { STATIC_DAYS } from '../../../../../../helpers/structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { allModals } from '../../../../../../redux/modalsReduxStore/types';
import { apiReducerTypes } from '../../../../../../redux/apiReduxStore/types';
import { ScheduleContentTypes } from '../../../../../../redux/apiReduxStore/dataTypes';
import { ModalsInitialTypes } from '../../../../../../redux/modalsReduxStore/initialState';

import {
    CustomContentAsideText, CustomContentContainer, CustomContentRemoveElementTitle
} from '../DeleteContentModal/DeleteContentModal.styles';

/**
 * Component responsible for generating custom content for schedule delete subject button.
 */
const ScheduleDelete: React.FC = (): JSX.Element => {

    const { scheduleModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const findDay = STATIC_DAYS.find(el => el.name === scheduleModal.day);

    const matchElm: ScheduleContentTypes | any = useFindMatchingElement(
        allModals.SCHEDULE_MODAL, apiReducerTypes.SCHEDULE, Boolean(findDay) ? findDay!.eng : STATIC_DAYS[0].eng
    );

    return (
        <>
            {Boolean(matchElm) && <CustomContentContainer>
                <CustomContentAsideText>
                    Czy na pewno chcesz usunąć przedmiot z planu zajęć o nazwie:
                </CustomContentAsideText>
                <CustomContentRemoveElementTitle>
                    {matchElm.title}
                </CustomContentRemoveElementTitle>
            </CustomContentContainer>}
        </>
    );
};

export default ScheduleDelete;