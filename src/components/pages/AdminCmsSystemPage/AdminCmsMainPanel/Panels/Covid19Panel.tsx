import React, { useContext, useState } from 'react';
import axiosInstance from '../../../../../helpers/request';
import classnames from "classnames";

import { MainStoreContext } from "../../../../../contextStore/MainStoreContext";

const { panelContainer, panelActive } = require('./Panels.module.scss');
const {
   covidPanelsContainer, sectionWrapper, submitCovidForm, unwriteChangesCSS
} = require('./Covid19Panel.module.scss');

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący panel z możliwością zmiany poziomów zagrożenia Covid 19.
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const Covid19Panel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);
   const { covidData } = dataFetchFromServer;

   const [ riskLevels, setRiskLevel ] = useState(covidData.map((object: any) => object.actualRiskNumber));
   const [ unwriteChanges, setUnwireChanges ] = useState(false);

   const handleOnChangeInput = (id: string, target: any) => {
      const copy = [...riskLevels];
      const dataCopy = [...covidData];
      const findIndex = dataCopy.findIndex(tile => tile._id === id);
      copy[findIndex] = target === '0' ? 0 : parseInt(target.value);
      dataCopy[findIndex].actualRiskNumber = target === '0' ? 0 : parseInt(target.value);
      setDataFetchFromServer({ ...dataFetchFromServer, covidData: dataCopy })
      setRiskLevel(copy);
      setUnwireChanges(true);
   }

   const handleSubmitChanges = async () => {
      setUnwireChanges(false);
      await Promise.all(covidData.map(async (object: any) => {
         await axiosInstance.put(`covid-data/${object._id}`, object);
      }));
   }

   const generateRiskTiles = covidData.map((tile: any, index: number) => {
      const generateOptions = Array.from({ length: 4 }, (v, s) => s).map(i => (
         <option key = {i}>{i}</option>
      ));

      return (
         <section key = {tile._id}>
            <div className = {sectionWrapper}>
               <h3>{tile.description}</h3>
               <select
                  value = {riskLevels[index]}
                  onChange = {({ target }) => handleOnChangeInput(tile._id, target)}
               >
                  {generateOptions}
               </select>
            </div>
         </section>
      );
   });

   const toggleClass = activeNavElm === 1 ? panelActive : '';

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <h2>Edycja paneli poziomów zagrożenia Covid-19</h2>
         <div className = {covidPanelsContainer}>
            {generateRiskTiles}
         </div>
         {unwriteChanges && <p className = {unwriteChangesCSS}>
            Uwaga! Wprowadziłeś zmiany, które nie zostały wysłane na serwer.
         </p>}
         <button
            onClick = {handleSubmitChanges}
            className = {submitCovidForm}
         >Zapisz zmiany</button>
      </div>
   );
}

export default Covid19Panel;