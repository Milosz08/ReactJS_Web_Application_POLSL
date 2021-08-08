import React, { useContext } from 'react';
import { MainStoreContext } from "../../../../contextStore/MainStoreContext";

const { covidBlocks, covidInfo, covidInfoBlocks, statusInfo } = require('./CovidInfo.module.scss');

interface CovidDataProvider {
   _id: string;
   description: string;
   actualRiskNumber: number;
   __v: number;
}

/**
 * Komponent strony głównej informujący o aktualnym poziomie zagrożenia epidemiologicznego na terenie
 * Politechniki Śląskiej. Dane są pobierane z głównego stora.
 */
const CovidInfo = () => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { covidData } = dataFetchFromServer;

   const generateCovidInfos = covidData.map((info: CovidDataProvider) => {
      return (
         <div
            className = {covidBlocks}
            key = {info._id}
         >
            <span>{info.description}:</span>
            <span>{info.actualRiskNumber}</span>
         </div>
      );
   });

   return (
      <div className = {covidInfo}>
         <div className = {statusInfo}>Status zabezpieczeń COVID-19</div>
         <a
            href = 'https://covid.polsl.pl/'
            target = '_blank'
            rel = 'noreferrer'
         >więcej informacji</a>
         <div className = {covidInfoBlocks}>
            {generateCovidInfos}
         </div>
      </div>
   );
}

export default CovidInfo;