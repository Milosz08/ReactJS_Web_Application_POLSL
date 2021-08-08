import React, { useContext, useRef, useState } from 'react';
import UniversalHeader from "../../../layouts/UniversalHeader/UniversalHeader";
import classnames from "classnames";

import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../../../additionalComponents/ComponentToPrint";

import { MainStoreContext } from "../../../../contextStore/MainStoreContext";
import { ScheduleContext } from "../../../../contextStore/ScheduleProvider";

const { scheduleRender } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { progressBar, progressActive, colored, activeBar, generateButton } = require('./../SchedulePage.module.scss');

/**
 * Komponent generujący sekcję dodatkowe narzędzia do planu zajęć (możliwość stworzenia pliku pdf).
 */
const AdditionalTools = () => {

   const { dataFetchFromServer } = useContext<any>(MainStoreContext);
   const { groupSelected, engSelected } = useContext<any>(ScheduleContext);
   const { sheduleSubjects } = dataFetchFromServer;

   const componentRef = useRef<any>();
   const [ date, setDate ] = useState<Date>(new Date());
   const [ show, setShow ] = useState<boolean>(false);
   const [ widthState, setWidthState ] = useState<number>(0);

   const resetValues = () => {
      setShow(false);
      setWidthState(0);
   }

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'plan_zajec',
      onAfterPrint: () => resetValues(),
   });

   const handleGeneratePDF = () => {
      let count: number = 0;
      let index: NodeJS.Timeout;
      const asyncLoadingBar = () => {
         count++;
         setWidthState(count);
         if(count === 100) {
            clearInterval(index);
            if(handlePrint) {
               handlePrint();
            }
         }
      }
      index = setInterval(asyncLoadingBar, 100);
      setShow(true);
      setDate(new Date());
   }

   const toggleClass = show ? classnames(progressBar, activeBar) : progressBar;

   return (
      <section className = {scheduleRender}>
         <UniversalHeader
            iconP = {['fas', 'tools']}
            content = 'Dodatkowe narzędzia'
            ifCloseButtonVisible = {false}
         />
         <button
            onClick = {handleGeneratePDF}
            className = {generateButton}
         >
            Wygeneruj plan w formie pliku PDF
         </button>
         <div style = {{ display: "none" }}>
            <ComponentToPrint
               ref = {componentRef}
               date = {date}
               subjects = {sheduleSubjects}
               groupSelected = {groupSelected}
               engSelected = {engSelected}
            />
         </div>
         <aside className = {toggleClass}>
            <span className = {widthState === 100 ? colored : ''}>{widthState}%</span>
            <div className = {progressActive} style = {{ width: `${widthState}%` }}/>
         </aside>
      </section>
   );
}

export default AdditionalTools;