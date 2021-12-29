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

import useModalShowHide from '../../../helpers/hooks/useModalShowHide';
import useAutoHideModal from '../../../helpers/hooks/useAutoHideModal';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { prefFields } from '../../../redux/preferencesReduxStore/types';
import { PrefActions } from '../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../redux/preferencesReduxStore/initialState';

import {
    BiCheckDoubleIconComponent, ScheduleSaveModalContainer, ScheduleSaveModalSections, ScheduleSaveModalWrapper
} from './ScheduleSaveModal.styles';

import ScheduleSaveModalInfo from './subcomponents/ScheduleSaveModalInfo';

/**
 * Component responsible for showing save modal info preferences.
 */
const ScheduleSaveModal: React.FC = (): JSX.Element => {

    const { saveScheduleOptionModalOpen }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const [ modal, background ] = useModalShowHide(saveScheduleOptionModalOpen);

    const estimate = useAutoHideModal(
        3, PrefActions.changeRootPrefField, saveScheduleOptionModalOpen, prefFields.SCHEDULE_SAVE_MODAL
    );

    return (
        <ScheduleSaveModalContainer
            ref = {background}
        >
            <ScheduleSaveModalWrapper
                ref = {modal}
            >
                <ScheduleSaveModalSections>
                    <BiCheckDoubleIconComponent/>
                </ScheduleSaveModalSections>
                <ScheduleSaveModalInfo
                    estimate = {estimate}
                />
            </ScheduleSaveModalWrapper>
        </ScheduleSaveModalContainer>
    );
};

export default ScheduleSaveModal;