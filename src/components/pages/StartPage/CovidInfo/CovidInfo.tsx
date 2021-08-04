import React, { useContext } from 'react';
import { MainStoreContext } from "../../../../contextStore/MainStoreContext";

const { covidBlocks, covidInfo } = require('./CovidInfo.module.scss');

/**
 * Komponent strony głównej informujący o aktualnym poziomie zagrożenia epidemiologicznego na terenie
 * Politechniki Śląskiej. Dane są pobierane z głównego stora.
 */
export default function CovidInfo() {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { covidData } = dataFetchFromServer;

   const generateCovidInfos = covidData.map((info: any) => {
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
         <div>Status zabezpieczeń<br/>COVID-19</div>
         <a
            href = 'https://covid.polsl.pl/'
            target = '_blank'
            rel = 'noreferrer'
         >więcej informacji</a>
         {generateCovidInfos}
      </div>
   );
}