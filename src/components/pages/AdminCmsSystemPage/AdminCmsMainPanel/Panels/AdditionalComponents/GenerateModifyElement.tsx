import React from 'react';
import DataLastUpdate from "../../../../../layouts/DataLastUpdate/DataLastUpdate";

interface PropsProvider {
   dataID: string | undefined;
   dateText: string;
   countText: string;
   arrayLength: number;
}

/**
 * Komponent renderujący strukturę głównych informacji (data oraz ilość elementów) w głównym (home) panelu
 * administratora systemu CMS.
 *
 * @param dataID { string } - id elementu przekazywane z pliku .env.
 * @param dateText { string } - tekst wyświetlający typ elementu.
 * @param countText { string } - tekst wyświetlający typ ilości elementów.
 * @param arrayLength { number } - długość tablicy (ilość elementów).
 */
const GenerateModifyElement: React.FC<PropsProvider> = ({ dataID, dateText, countText, arrayLength }) => {
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