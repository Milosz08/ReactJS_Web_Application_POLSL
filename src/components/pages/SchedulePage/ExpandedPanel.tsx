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

import React, { Fragment, useContext, useState } from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import { ScheduleSubjectsProvider } from './ScheduleSections';
import { SubjectsProvider } from '../../layouts/Subjects/Subjects';

const {
    expandInfo, infoIcon, rotateIcon, expandContainer, expandedInfo, expandActive, expandedLinks, roomContainer
} = require('./ScheduleSections.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    tile: ScheduleSubjectsProvider;
    subjectObj: SubjectsProvider;
}

/**
 * @details Component generating for each object (tiled in grid) of the program of classes sliding menu with references to
 *          the conditions for passing objects and links to remote education platform.
 *
 * @param tile { object } - transmitted one object (tile).
 * @param subjectObj { object } - transmitted object with information on the subject on the tiled.
 */
const ExpandedPanel: React.FC<PropsProvider> = ({ tile, subjectObj }) => {

    const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const [ ifIsExpanded, setifIsExpanded ] = useState<boolean>(false);

    const titleContent: string = ifIsExpanded ? 'Zwiń panel' : 'Kliknij tutaj po więcej informacji.';
    const iconRotate: string = ifIsExpanded ? classnames(infoIcon, rotateIcon) : infoIcon;
    const activeContainer: string = ifIsExpanded ? expandContainer : classnames(expandContainer, expandActive);

    return (
        <Fragment>
            <button
                className = {expandInfo}
                onClick = {() => setifIsExpanded(prevState => !prevState)}
                title = {titleContent}
            >
                <FontAwesomeIcon
                    icon = {[ 'fas', 'chevron-down' ]}
                    className = {iconRotate}
                />
            </button>
            <div className = {activeContainer}>
                <p className = {expandedInfo}>
                    <div className = {roomContainer}>
                        Aula: <strong>{tile.room.toLocaleUpperCase()}</strong>
                    </div>
                    <span>{tile.type === 'wykład' ? 'wykłady' : tile.type} </span>
                    {subjectObj.ifEnd ? 'odbywały' : 'odbywają'} się
                    {tile.pzeInfo.platform !== 'Kontaktowy' ? ' przez komunikator ' : ' w sposób '}
                    <strong> {tile.pzeInfo.platform}</strong>. Wszystkie linki znajdziesz na PZE.
                </p>
                <a
                    href = {tile.pzeInfo.pzeLink} rel = 'noreferrer'
                    className = {expandedLinks}
                >
                    Przejdź do PZE
                </a>
                <DelayLink
                    to = '/warunki-zaliczenia-przedmiotów'
                    delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                    replace = {false}
                    clickAction = {timeoutRoutePath}
                >
                    <a href = {'/warunki-zaliczenia-przedmiotów'} className = {expandedLinks}>
                        Warunki zaliczenia przedmiotu
                    </a>
                </DelayLink>
            </div>
        </Fragment>
    );
}

export default ExpandedPanel;