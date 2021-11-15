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

import React from 'react';
import { updateSections } from '../../../../../../redux/apiReduxStore/types';

const DataLastUpdate = React.lazy(() => import('../../../../../layouts/DataLastUpdate/DataLastUpdate'));

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    dataID: string | undefined;
    dateText: string;
    countText: string;
    arrayLength: number;
}

/**
 * @details A component that renders the structure of the main information (date and number of elements) in the CMS home
 *          administration panel.
 *
 * @param dataID { string } - item id passed from the .env file.
 * @param dateText { string } - text displaying the type of item.
 * @param countText { string } - text displaying the type of number of items.
 * @param arrayLength { number } - array length (number of elements).
 */
const GenerateModifyElement: React.FC<PropsProvider> = ({ dataID, dateText, countText, arrayLength }): JSX.Element => {
    return (
        <p>
            Ostatnia modyfikacja {dateText}: {' '}
            Ilość {countText} w bazie danych: <strong>{arrayLength}</strong>.
        </p>
    );
}

export default GenerateModifyElement;