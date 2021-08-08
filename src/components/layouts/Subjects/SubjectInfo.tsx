import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import SubjectLayout from './SubjectLayout';

import { SubjectsProvider } from "./Subjects";

const {
   subInfoContainer, subInfo,  animFlexContainer, emptySubjectField, emptyIcon, messageoutEnter,
   messageoutEnterActive, messageoutExit, messageoutExitActive, prevButtonContainer, nextButtonContainer
} = require('./Subjects.module.scss');

interface PropsProvider {
   subjectID: number;
   filteredArray: Array<SubjectsProvider>;
   state: number;
   setState: Dispatch<SetStateAction<number>>;
}

/**
 * Komponent generujący informację o przedmiocie. Występuje tylko na stronie głównej. Możliwośc nawigacji po
 * przedmiotach przy pomocy strzałek prawo/lewo. Na podstawie wartości w propsach generuje odpowiedni przedmiot.
 *
 * @param subjectID { number } - indeks generowanego przedmiotu.
 * @param filteredArray { SubjectsProvider } - tablica z przedmiotami.
 * @param state { number } - aktualnie obsługiwany indeks przedmiotu.
 * @param setState { Dispatch<SetStateAction<number>> } - zmiana przedmiotu (na podstawie ID).
 */
const SubjectInfo: React.FC<PropsProvider> = ({ subjectID, filteredArray, state, setState }) => {

   const ifSubjectArrayIsEmpty = filteredArray.length !== 0 ? (
      <SubjectLayout
         subjectID = {subjectID}
         filteredArray = {filteredArray}
      />
   ) : (
      <div className = {emptySubjectField}>
         <FontAwesomeIcon
            icon = {['fas', 'exclamation-circle']}
            className = {emptyIcon}
         />
         <span>Nie znalazłem szukanego przedmiotu.</span>
      </div>
   );

   const handlePrevClick = () => {
      if(state === 0) {
         setState(filteredArray.length - 1);
      } else {
         setState(prevState => prevState - 1);
      }
   }

   const handleNextClick = () => {
      if(state === filteredArray.length - 1) {
         setState(0);
      } else {
         setState(prevState => prevState + 1);
      }
   }

   const generatePrevButton = filteredArray.length > 1 ? <button onClick = {handlePrevClick}/> : null;
   const generateNextButton = filteredArray.length > 1 ? <button onClick = {handleNextClick}/> : null;

   return (
      <div className = {subInfoContainer}>
         <div className = {prevButtonContainer}>
            {generatePrevButton}
         </div>
         <div className = {subInfo}>
            <TransitionGroup>
               <CSSTransition
                  key = {subjectID}
                  timeout = {50}
                  classNames = {{
                     enterActive: messageoutEnter,
                     enterDone: messageoutEnterActive,
                     exitActive: messageoutExit,
                     exitDone: messageoutExitActive,
                  }}
               >
                  <div className = {animFlexContainer}>
                     {ifSubjectArrayIsEmpty}
                  </div>
               </CSSTransition>
            </TransitionGroup>
         </div>
         <div className = {nextButtonContainer}>
            {generateNextButton}
         </div>
      </div>
   );
}

export default SubjectInfo;