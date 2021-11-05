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
import { Fragment, useState } from 'react';

import { FRONT_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';
import DelayRouterLink from '../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import { ScheduleContentTypes, SubjectsContentTypes } from '../../../../redux/apiReduxStore/dataTypes';

import {
    ScheduleExpandedPanelContainer, ScheduleExpandedPanelInfo, ScheduleExpandedPanelInnerRouter,
    ScheduleExpandedPanelPzeAnchor, ScheduleExpandedPanelRoomContainer
} from '../ScheduleLayout.styles';
import { ExternalIconLink } from '../../SubjectsDetails/subcomponents/SubjectInfoStructure/SubjectInfoStructure.style';

import ScheduleExpandedPanelButton from './ScheduleExpandedPanelButton';

interface PropsProvider {
    tile: ScheduleContentTypes;
    subject: SubjectsContentTypes | undefined;
}

/**
 * Component generating for each object (tiled in grid) of the program of classes sliding menu with
 * references to the conditions for passing objects and links to remote education platform.
 *
 * @param tile { ScheduleContentTypes } - transmitted one object (tile).
 * @param subject { SubjectsContentTypes | undefined } - transmitted object with information on the subject on the tiled.
 */
const ScheduleSingleDayExpandedPanel: React.FC<PropsProvider> = ({ tile, subject }): JSX.Element => {

    const [ ifIsExpanded, setIfIsExpanded ] = useState<boolean>(false);

    return (
        <Fragment>
            <ScheduleExpandedPanelButton
                ifActive = {ifIsExpanded}
                callback = {setIfIsExpanded}
            />
            <ScheduleExpandedPanelContainer
                ifActive = {ifIsExpanded}
            >
                <ScheduleExpandedPanelInfo>
                    <ScheduleExpandedPanelRoomContainer>
                        Aula: <strong>{tile.subjectInfo.room.toLocaleUpperCase()}</strong>
                    </ScheduleExpandedPanelRoomContainer>
                    <span>{tile.subjectInfo.type === 'Wykład' ? 'wykłady' : tile.subjectInfo.type} </span>
                    {subject!.ifEnd ? 'odbywały' : 'odbywają'} się
                    {tile.subjectInfo.subjectsPze.place !== 'Kontaktowy' ? ' przez komunikator ' : ' w sposób '}
                    <strong> {tile.subjectInfo.subjectsPze.place}</strong>. Wszystkie linki znajdziesz na PZE.
                </ScheduleExpandedPanelInfo>
                <ScheduleExpandedPanelPzeAnchor
                    href = {tile.subjectInfo.subjectsPze.link}
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    Przejdź do PZE
                    <ExternalIconLink/>
                </ScheduleExpandedPanelPzeAnchor>
                <ScheduleExpandedPanelInnerRouter>
                    <DelayRouterLink
                        render = {() => 'Warunki zaliczenia przedmiotu'}
                        pathTo = {FRONT_ENDPOINTS.TERMS}
                    />
                </ScheduleExpandedPanelInnerRouter>
            </ScheduleExpandedPanelContainer>
        </Fragment>
    );
};

export default ScheduleSingleDayExpandedPanel;