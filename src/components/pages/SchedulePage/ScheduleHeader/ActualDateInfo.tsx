/**
 * @file ActualDateInfo.tsx
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

import React, { useContext } from 'react';

import { ActualDateContext, ActualDateTypes } from '../../../../contextStore/ActualDateProvider';
import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';

const { dateInfoContainer } = require('../SchedulePage.module.scss');

/**
 * @details A component generating an information section over a grid of classes. It informs about the current selection
 *          of groups on the set and the current date, including the name of the day of the week (collected from context).
 */
const ActualDateInfo = (): JSX.Element => {

   const { date } = useContext<Partial<ActualDateTypes>>(ActualDateContext);
   const { groupSelected, engSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

   return (
      <div className = {dateInfoContainer}>
         <span>Wyświetlam plan dla parametrów:
            <strong> Grupa {groupSelected}</strong>,
            <strong> Grupa {engSelected!.toLocaleUpperCase()} </strong>
         </span>
         <span>
         Dzisiaj jest
            <strong> {date!.dayStr}</strong>,
            <strong> {date!.day} {date!.monthStr} {date!.year} </strong>
         roku.
         </span>
      </div>
   );
}

export default ActualDateInfo;