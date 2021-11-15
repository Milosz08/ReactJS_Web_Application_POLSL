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

import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../../context/cookiesContext/CookiesObjectsProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';

const ChangeCredentials = React.lazy(() => import('./AdditionalComponents/ChangeCredentials'));
const GenerateModifyElement = React.lazy(() => import('./AdditionalComponents/GenerateModifyElement'));

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { changeCredentials, disable, disabledInfo, mainInfoContainer } = require('./HomePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    activeNavElm: number;
}

/**
 * @details Component that generates the start page of the admin panel (main information about changes in the database -
 *          dates with hours, the ability to change the authentication of user / administrator accounts - only for
 *          administrators with a rank of 2 - main system administrator).
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const HomePanel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { calendarRecords, scheduleSubjects, subjectsData } = dataFetchFromServer;

    const setDisabledChanges = parseInt(cookie!.__credentialsLevel) !== 2 ? disable : '';
    const toggleClass = activeNavElm === 0 ? panelActive : '';

    const DATE_ELEMENTS_CMS: { [value: string]: string | undefined }[] = [
        {
            id: process.env.REACT_APP_SCHEDULE_ID,
            dateText: 'planu zajęć',
            countText: 'przedmiotów planu zajęć',
            dataLength: scheduleSubjects.length
        },
        {
            id: process.env.REACT_APP_CALENDAR_ID,
            dateText: 'wpisów w kalendarzu',
            countText: 'wpisów kalendarza',
            dataLength: calendarRecords.length
        },
        {
            id: process.env.REACT_APP_SUBJECTS_ID,
            dateText: 'przedmiotów',
            countText: 'przedmiotów',
            dataLength: subjectsData.length
        }
    ];

    const generateDataElements = DATE_ELEMENTS_CMS.map((element: any) => (
        <GenerateModifyElement
            key = {uuidv4()}
            dataID = {element.id}
            dateText = {element.dateText}
            countText = {element.countText}
            arrayLength = {element.dataLength}
        />
    ));

    return (
        <div className = {classnames(panelContainer, toggleClass)}>
            <div className = {mainInfoContainer}>
                {generateDataElements}
            </div>
            <div className = {classnames(changeCredentials, setDisabledChanges)}>
                <ChangeCredentials
                    ifUser = {true}
                    disableButton = {parseInt(cookie!.__credentialsLevel) !== 2}
                />
                <ChangeCredentials
                    ifUser = {false}
                    disableButton = {parseInt(cookie!.__credentialsLevel) !== 2}
                />
                {parseInt(cookie!.__credentialsLevel) !== 2 && <p className = {disabledInfo}>
                    Nie masz wystarczających uprawnień, aby wprowadzać zmian w tej sekcji. Aby wprowadzać zmiany w
                    tej sekcji musisz być zalogowany na konto głównego administratora systemu.
                </p>}
            </div>
        </div>
    );
}

export default HomePanel;