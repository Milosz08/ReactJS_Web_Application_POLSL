import React, { Fragment, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/request';

const { dataLastUpdate } = require('./DataLastUpdate.module.scss');

interface PropsProvider {
   dataID: string | undefined;
   content?: string;
   withoutText: boolean;
}

interface StateProvider {
   fullDate?: string;
   fullTime?: string;
}

/**
 * Komponent pobierający datę ostatniej modyfikacji bazy danych z serwera (w zależności od parametru dataID,
 * pobierana jest dana modyfikacji konkretnej kolekcji).
 *
 * @param dataID { string } - id kolekcji bazy danych.
 * @param content { string } - tytuł kolekcji, z której pobierana jest data modyfikacji.
 * @param withoutText { boolean } - flaga decydująca, czy ma się pokazać sama data, czy data z dodatkowym tekstem.
 */
const DataLastUpdate: React.FC<PropsProvider> = ({ dataID, content, withoutText }) => {

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