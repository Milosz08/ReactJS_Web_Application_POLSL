import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { GlobalModalsStateContext } from '../../../../contextStore/GlobalModalsStateProvider';

import UniversalHeader from '../../../layouts/UniversalHeader/UniversalHeader';

const {
   scheduleSaveContainer, scheduleSaveWrapper, active, scheduleSaveContent, whenCloseWindow, show
} = require('./AcceptScheduleChoiceModal.module.scss');

const COUNTING_VALUE = 3;

/**
 *
 */
const AcceptScheduleChoiceModal = () => {

   const { onSaveOpenModal, setOnSaveOpenModal } = useContext<any>(GlobalModalsStateContext);

   const [ counting, setCounting ] = useState<number>(COUNTING_VALUE);
   const [ containerVisible, setContainerVisible ] = useState<string>('');
   const [ animShow, setAnimShow ] = useState<string>('');

   useEffect(() => {
      if(onSaveOpenModal) {
         let count: number = COUNTING_VALUE;
         let index: NodeJS.Timeout;
         const asyncLoadingBar = () => {
            setCounting(--count);
            if(count === 0) {
               clearInterval(index);
               setOnSaveOpenModal(false);
               setAnimShow('');
               setTimeout(() => setContainerVisible(''), 200);
            }
         }
         index = setInterval(asyncLoadingBar, 1000);
         setContainerVisible(show);
         setTimeout(() => setAnimShow(active), 200);
      }
   }, [onSaveOpenModal]);

   return (
      <div className = {classnames(scheduleSaveContainer, containerVisible, animShow)}>
         <div className = {classnames(scheduleSaveWrapper, animShow)}>
            <UniversalHeader
               iconP = {['fas', 'info-circle']}
               content = 'Informacja'
               ifCloseButtonVisible = {false}
            />
            <span className = {scheduleSaveContent}>
               Twój wybór został zapisany. Przy kolejnym wejściu na stronę, aplikacja automatycznie ustawi
               wybrane przez Ciebie preferencje.
            </span>
            <span className = {whenCloseWindow}>
               Okno zamknie się automatycznie za: <strong>{counting}</strong>
            </span>
         </div>
      </div>
   );
}

export default AcceptScheduleChoiceModal;