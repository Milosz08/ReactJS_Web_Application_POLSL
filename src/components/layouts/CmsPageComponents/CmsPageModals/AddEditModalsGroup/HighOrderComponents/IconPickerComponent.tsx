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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsActions, allModalsInputs } from '../../../../../../redux/modalsReduxStore/types';

import { IconSelectorContainer, IconSelectorLabel } from './HighOrderComponents.styles';

import { IconPicker } from 'react-fa-icon-picker';

interface PropsProvider {
    modalType: allModals
}

/**
 * Component responsible for generating icon picker element.
 *
 * @param modalType { allModals } - modal type.
 */
const IconPickerComponent: React.FC<PropsProvider> = ({ modalType }): JSX.Element => {

    const modal: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const modalIcon: any = modal[modalType].modalInputFields!.icon;

    const [ iconName, setIconName ] = useState<any>(modalIcon);
    const dispatcher = useDispatch();

    const handleSettingIcon = (iconName: string): void => {
        dispatcher(ModalsActions.changeModalSelectedInput(modalType, allModalsInputs.ICON, iconName));
        setIconName(iconName);
    };

    useEffect(() => {
        if (modal[modalType].action === allModalsActions.EDIT_ELEMENT) {
            setIconName(modalIcon);
        }
    }, [ modalIcon ]);

    return (
        <IconSelectorContainer>
            <IconSelectorLabel>
                Niestandardowa ikona:
            </IconSelectorLabel>
            <IconPicker
                value = {iconName}
                onChange = {(iconName: any) => handleSettingIcon(iconName)}
                buttonStyles = {{
                    border: '2px solid var(--darkGrayTint3)',
                    borderLeft: 'none',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    height: '44px',
                }}
                buttonIconStyles = {{
                    position: 'relative',
                    top: '2px',
                    color: 'var(--navyBlueColor)'
                }}
                pickerIconStyles = {{
                    color: 'var(--navyBlueColor)'
                }}
                searchInputStyles = {{
                    padding: '3px',
                    margin: '2px 0 10px',
                    border: '2px solid var(--darkGrayTint3)',
                    borderRadius: '5px',
                    color: 'var(--navyBlueColor)',
                    fontWeight: 500
                }}
            />
        </IconSelectorContainer>
    );
};

export default IconPickerComponent;