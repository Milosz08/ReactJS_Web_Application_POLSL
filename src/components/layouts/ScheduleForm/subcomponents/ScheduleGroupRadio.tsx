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
import GROUPS_STATIC from '../../../../helpers/structs/allGroups';

import { RootState } from '../../../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { groupsTypes } from '../../../../redux/preferencesReduxStore/types';
import { setSelectedGroup } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import {
    ScheduleCustomRadio, ScheduleRadioInput, ScheduleRadioInputsContainer, ScheduleRadioInputsWrapper, ScheduleRadioLabel
} from '../ScheduleForm.styles';
import { useEffect } from 'react';

interface PropsProvider {
    groupArray: string[];
    groupType: groupsTypes;
    content: string;
}

/**
 * Universal component responsible for generate radio buttons based on group info in params.
 *
 * @param groupArray { string[] } - all single type group array.
 * @param groupType { groupsTypes } - type of group.
 * @param content { string } - label text content.
 */
const ScheduleGroupRadio: React.FC<PropsProvider> = ({ groupArray, groupType, content }): JSX.Element => {

    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { normalGroup, skGroup } = chooseGroups;
    const { NORMAL_GROUPS, SK_GROUPS } = GROUPS_STATIC;

    const handleChangeGroup = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(setSelectedGroup(groupType, target.value));
    };

    useEffect(() => {
        if (normalGroup === NORMAL_GROUPS[0] && skGroup === SK_GROUPS[1]) {
            dispatcher(setSelectedGroup(groupsTypes.SK, SK_GROUPS[0]));
        }
    }, [ NORMAL_GROUPS, SK_GROUPS, dispatcher, normalGroup, skGroup ])

    const generateStructure = groupArray.map(group => {
        const disabled = normalGroup === NORMAL_GROUPS[0] && groupType === groupsTypes.SK && group === SK_GROUPS[1];

        return (
            <ScheduleRadioInputsWrapper
                ifActive = {chooseGroups[groupType] === group}
                disabled = {disabled}
                key = {`${groupType}__${group}`}
            >
                <ScheduleRadioInput
                    type = 'radio'
                    id = {group}
                    name = {`normalGroups${groupType}`}
                    checked = {chooseGroups[groupType] === group}
                    disabled = {disabled}
                    onChange = {handleChangeGroup}
                    value = {group}
                />
                <ScheduleRadioLabel
                    htmlFor = {group}
                    disabled = {disabled}
                >
                    Grupa {group}
                </ScheduleRadioLabel>
                <ScheduleCustomRadio/>
            </ScheduleRadioInputsWrapper>
        );
    });

    return (
        <ScheduleRadioInputsContainer
            content = {content}
        >
            {generateStructure}
        </ScheduleRadioInputsContainer>
    );
};

export default ScheduleGroupRadio;