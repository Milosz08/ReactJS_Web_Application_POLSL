import React, { useContext } from 'react';

import { ActualDateContext } from '../../../../contextStore/ActualDateProvider';
import { ScheduleContext } from '../../../../contextStore/ScheduleProvider';

const { dateInfoContainer } = require('../SchedulePage.module.scss');

/**
 * Komponent generujący sekcję informacyjną ponad siatką zajęć. Informuje ona o aktualnym wyborze grup na planie
 * oraz aktualnej dacie, włącznie z nazwą dnia tygodnia (pobierane z kontekstu).
 */
const ActualDateInfo = () => {

   const { date } = useContext<any>(ActualDateContext);
   const { groupSelected, engSelected } = useContext<any>(ScheduleContext);

   return (
      <div className = {dateInfoContainer}>
         <span>Wyświetlam plan dla parametrów:
            <strong> Grupa {groupSelected}</strong>,
            <strong> Grupa {engSelected.toLocaleUpperCase()} </strong>
         </span>
         <span>
         Dzisiaj jest
            <strong> {date.dayStr}</strong>,
            <strong> {date.day} {date.monthStr} {date.year} </strong>
         roku.
         </span>
      </div>
   );
}

export default ActualDateInfo;