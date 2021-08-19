/**
 * @file SubjectInfo.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *                ReactCSSTransitionGroup: "^4.4.2"
 *
 * @date final version: 08/18/2021
 */

import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import SubjectLayout from './SubjectLayout';

import { SubjectsProvider } from "./Subjects";

const {
   subInfoContainer, subInfo,  animFlexContainer, emptySubjectField, emptyIcon, messageoutEnter,
   messageoutEnterActive, messageoutExit, messageoutExitActive, prevButtonContainer, nextButtonContainer
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   subjectID: number;
   filteredArray: SubjectsProvider[];
   state: number;
   setState: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component that generates information about an item. It only appears on the home page. Possibility to navigate
 *          through items using the right / left arrows. Generates the appropriate item based on the value in props.
 *
 * @param subjectID { number } - index of the generated subject.
 * @param filteredArray { SubjectsProvider } - array with subjects.
 * @param state { number } - currently supported item subject.
 * @param setState { Dispatch<SetStateAction<number>> } - change subject (base on ID value).
 */
const SubjectInfo: React.FC<PropsProvider> = ({ subjectID, filteredArray, state, setState }): JSX.Element => {

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