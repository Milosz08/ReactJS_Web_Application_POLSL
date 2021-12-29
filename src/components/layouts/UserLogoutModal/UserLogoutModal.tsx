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
    UserLogoutModalContainer, UserLogoutModalSections, UserLogoutModalWrapper, VscUnlockIconComponent
} from './UserLogoutModal.styles';

const UserLogoutModalInfo = React.lazy(() => import('./subcomponents/UserLogoutModalInfo'));

/**
 * Component responsible for showing user logout modal info preferences.
 */
const UserLogoutModal: React.FC = (): JSX.Element => {

    const { userLogoutModalOpen }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const [ modal, background ] = useModalShowHide(userLogoutModalOpen);
    const estimate = useAutoHideModal(3, PrefActions.changeRootPrefField, userLogoutModalOpen, prefFields.USER_LOGOUT_MODAL);

    return (
        <UserLogoutModalContainer
            ref = {background}
        >
            <UserLogoutModalWrapper
                ref = {modal}
            >
                <UserLogoutModalSections>
                    <VscUnlockIconComponent/>
                </UserLogoutModalSections>
                <UserLogoutModalInfo
                    estimate = {estimate}
                />
            </UserLogoutModalWrapper>
        </UserLogoutModalContainer>
    );
};

export default UserLogoutModal;