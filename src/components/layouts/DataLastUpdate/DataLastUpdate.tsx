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

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/request';

const { dataLastUpdate } = require('./DataLastUpdate.module.scss');

/**
 * Interface defining the type of props.
 */
interface PropsProvider {
    dataID: string | undefined;
    content?: string;
    withoutText: boolean;
}

/**
 * Interface defining the type of state values.
 */
interface StateProvider {
    fullDate?: string;
    fullTime?: string;
}

/**
 * @details A component that retrieves the date of the database's last modification from the server (depending on
 *          the dataID parameter, the modification data of a specific collection is retrieved).
 *
 * @param dataID { string } - database collection id.
 * @param content { string } - title of the collection from which the modification date is retrieved.
 * @param withoutText { boolean } - flag deciding whether to show only the date or the date with additional text.
 */
const DataLastUpdate: React.FC<PropsProvider> = ({ dataID, content, withoutText }): JSX.Element => {

    const [ lastUpdate, setLastUpdate ] = useState<StateProvider>({ fullDate: '', fullTime: '' });

    const fetchLastUpdate = useCallback(async (): Promise<void> => {
        const { data } = await axiosInstance.get(`/last-update/${dataID}`);
        const { updateDate } = data;

        const day: string = updateDate.day < 10 ? `0${updateDate.day}` : updateDate.day;
        const month: string = updateDate.month < 10 ? `0${updateDate.month}` : updateDate.month;

        const hour: string = updateDate.hour < 10 ? `0${updateDate.hour}` : updateDate.hour;
        const minutes: string = updateDate.minutes < 10 ? `0${updateDate.minutes}` : updateDate.minutes;
        const seconds: string = updateDate.seconds < 10 ? `0${updateDate.seconds}` : updateDate.seconds;

        setLastUpdate({
            fullDate: `${day}/${month}/${updateDate.year}`,
            fullTime: `${hour}:${minutes}:${seconds}`,
        });
    }, [ dataID ]);

    useEffect(() => {
        fetchLastUpdate();
        return () => setLastUpdate({});
    }, [ fetchLastUpdate ]);

    const generateStructure = !withoutText ? (
        <div className = {dataLastUpdate}>
            <p>Ostatnia aktualizacja {content}: {lastUpdate.fullDate}, {lastUpdate.fullTime}</p>
        </div>
    ) : (
        <strong>{lastUpdate.fullDate}, {lastUpdate.fullTime}</strong>
    );

    return (
        <Fragment>
            {generateStructure}
        </Fragment>
    );
}

export default DataLastUpdate;