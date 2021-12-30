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
import { Dispatch, SetStateAction } from 'react';

import { ScheduleExpandedPanelButtonStyle, ScheduleExpandedPanelIcon } from '../ScheduleLayout.styles';

interface PropsProvider {
    ifActive: boolean;
    callback: Dispatch<SetStateAction<boolean>>;
}

/**
 * Component responsible for generating expanded panel in single schedule subject tile.
 *
 * @param ifActive { boolean } - flag decide to show/hide extended panel.
 * @param callback { Dispatch<SetStateAction<boolean>> } - callback useState function to toggle visibility of extended panel.
 */
const ScheduleExpandedPanelButton: React.FC<PropsProvider> = ({ ifActive, callback }): JSX.Element => {

    const titleContent: string = ifActive ? 'Zwiń panel' : 'Kliknij tutaj po więcej informacji.';

    return (
        <ScheduleExpandedPanelButtonStyle
            onClick = {() => callback(prevState => !prevState)}
            title = {titleContent}
        >
            <ScheduleExpandedPanelIcon
                $ifActive = {ifActive}
            />
        </ScheduleExpandedPanelButtonStyle>
    );
};

export default ScheduleExpandedPanelButton;