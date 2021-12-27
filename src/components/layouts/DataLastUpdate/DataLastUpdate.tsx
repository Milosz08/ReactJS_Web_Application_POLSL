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

import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../redux/apiReduxStore/initialState';
import { updateSections } from '../../../redux/apiReduxStore/types';

import { DataLastUpdateContainer, DataLastUpdateParagraph } from './DataLastUpdate.styles';

interface PropsProvider {
    type: updateSections;
    content?: string;
}

/**
 * Component retrieves the date of the database's last modification from the server (depending on
 * the dataID parameter, the modification data of a specific collection is retrieved).
 *
 * @param type { string } - database collection id.
 * @param content { string } - title of the collection from which the modification date is retrieved.
 */
const DataLastUpdate: React.FC< PropsProvider> = ({ type, content }): JSX.Element => {

    const { lastUpdate }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const findMathUpdateType = lastUpdate.find(el => el.updateDateFor === type);
    const updateDate = findMathUpdateType ? findMathUpdateType.servletTime : undefined;

    const generateStructure = content ? (
        <DataLastUpdateContainer>
            <DataLastUpdateParagraph>
                Ostatnia aktualizacja {content}: {updateDate?.fullDate}, {updateDate?.fullTime}
            </DataLastUpdateParagraph>
        </DataLastUpdateContainer>
    ) : (
        <strong>
            {updateDate?.fullDate}, {updateDate?.fullTime}
        </strong>
    );

    return (
        <Fragment>
            {generateStructure}
        </Fragment>
    );
};

export default DataLastUpdate;