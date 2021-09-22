/**
 * @file GenerateModifyElement.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';

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
            <DataLastUpdate
                dataID = {dataID}
                withoutText = {true}
            />.
            Ilość {countText} w bazie danych: <strong>{arrayLength}</strong>.
        </p>
    );
}

export default GenerateModifyElement;