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
import { Fragment } from 'react';

import * as FontAwesomeIcons from 'react-icons/fa';
import * as AntDesignIcons from "react-icons/ai";
import * as BoxIcons from 'react-icons/bi';
import * as IonIcons from 'react-icons/io';
import * as MaterialDesignIcons from 'react-icons/md';
import * as SimpleIcons from 'react-icons/si';
import * as VSCodeIcons from 'react-icons/vsc';
import * as BootStrapIcons from 'react-icons/bs';

export const IconFamilies = {
    FontAwesomeIcons,
    MaterialDesignIcons,
    AntDesignIcons,
    BoxIcons,
    IonIcons,
    SimpleIcons,
    VSCodeIcons,
    BootStrapIcons,
}

export enum IconFamiliesType {
    MaterialDesignIcons = 'MaterialDesignIcons',
    FontAwesomeIcons = 'FontAwesomeIcons',
    BootStrapIcons = 'BootStrapIcons',
    AntDesignIcons = 'AntDesignIcons',
    VSCodeIcons = 'VSCodeIcons',
    SimpleIcons = 'SimpleIcons',
    BoxIcons = 'BoxIcons',
    IonIcons = 'IonIcons',
}

interface StyledProvided {
    family: keyof typeof IconFamilies;
    name: string;
}

interface PropsProvider {
    family: string;
    name: string;
}

/**
 * Component reponsible for generating dynamically icon based props values.
 *
 * @param family { string } - icon family (from IconFamilies object).
 * @param name { string } - icon name (pure string, based on icon types).
 */
const IconComponent: React.FC<PropsProvider> = ({ family, name }): JSX.Element => {

    const checkValidIcon = () => {
        Object.keys(IconFamiliesType).forEach(key => {
            if(String(key) === family) {
                return IconFamilies[family][name];
            }
        });
        return IconFamilies[family][name];
    };

    const Icon = React.createElement<StyledProvided>(checkValidIcon());

    return (
        <Fragment>
            {Icon}
        </Fragment>
    );
};

export default IconComponent;