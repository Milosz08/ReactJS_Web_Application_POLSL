/**
 * @file Covid19Panel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/20/2021
 */

import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import axiosInstance from '../../../../../helpers/request';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../../contextStore/MainStoreProvider';
import { CovidDataProvider } from '../../../StartPage/CovidInfo/CovidInfo';

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { covidPanelsContainer, sectionWrapper, submitCovidForm, unwriteChangesCSS } = require('./Covid19Panel.module.scss');

/**
 * Constant representing the maximum number in the Covid19 danger selection options.
 */
const MAX_RISK_NUMBER: number = 4;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   activeNavElm: number;
}

/**
 * @details Component that generates a panel with the ability to change Covid 19 threat levels.
 *
 * @param activeNavElm { number } - number indicating the activity of a given element.
 */
const Covid19Panel: React.FC<PropsProvider> = ({ activeNavElm }): JSX.Element => {

   const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
   const { covidData } = dataFetchFromServer;

   const [ riskLevels, setRiskLevel ] = useState<number[]>(covidData.map((object: CovidDataProvider) => object.actualRiskNumber));
   const [ unwriteChanges, setUnwireChanges ] = useState<boolean>(false);

   const handleOnChangeInput = (id: string, target: EventTarget & HTMLSelectElement): void => {
      const copy: number[] = [...riskLevels];
      const dataCopy: CovidDataProvider[] = [...covidData];
      const findIndex = dataCopy.findIndex((tile: CovidDataProvider) => tile._id === id);
      copy[findIndex] = target === '0' ? 0 : parseInt(target.value);
      dataCopy[findIndex].actualRiskNumber = target === '0' ? 0 : parseInt(target.value);
      setDataFetchFromServer({ ...dataFetchFromServer, covidData: dataCopy })
      setRiskLevel(copy);
      setUnwireChanges(true);
   }

   const handleSubmitChanges = async (): Promise<any> => {
      setUnwireChanges(false);
      await Promise.all(covidData.map(async (object: CovidDataProvider) => {
         await axiosInstance.put(`covid-data/${object._id}`, object);
      }));
   }

   const generateRiskTiles = covidData.map((tile: CovidDataProvider, index: number): JSX.Element => {
      const generateOptions = Array.from({ length: MAX_RISK_NUMBER }, (v, s) => s).map(i => (
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

   const toggleClass: string = activeNavElm === 1 ? panelActive : '';

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