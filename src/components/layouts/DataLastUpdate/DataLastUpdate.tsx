/**
 * @file DataLastUpdate.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
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
   }, [dataID]);

   useEffect(() => {
      fetchLastUpdate();
      return () => setLastUpdate({ });
   }, [fetchLastUpdate]);

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