/**
 * @file SubjectTiles.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
 */

import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { SubjectsProvider } from './Subjects';

const {
   activeBtn, subjectTile, subjectsIcon, subjectIconWrapper, subjectTitle, subjectInfoBlock
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   filteredArray: SubjectsProvider[];
   state: number;
   setState: Dispatch<SetStateAction<number>>;
}

/**
 * @details Component that generates a list of items in the form of buttons. The props contain an array of items to
 *          generate, the currently displayed item and a function that allows you to change the currently displayed item.
 *
 * @param filteredArray { SubjectsProvider[] } - array storing all subjects
 * @param state { number } - index of the currently displayed subject
 * @param setState { Dispatch<SetStateAction<number>> } - function that allows you to change the subject
 */
const SubjectsTiles: React.FC<PropsProvider> = ({ filteredArray, state, setState }): JSX.Element => {

   const subjectsButtons = filteredArray.map((subject: SubjectsProvider, index: number) => {
      const subjectsButtonActive = index === state ? activeBtn : '';
      return (
         <button
            key = {subject.title}
            onClick = {() => setState(index)}
            className = {subjectTile}
         >
            <div className = {subjectIconWrapper}>
               <FontAwesomeIcon
                  icon={subject.icon}
                  className = {subjectsIcon}
               />
            </div>
            <div className = {subjectTitle}>{subject.title}</div>
            <div className = {classnames(subjectInfoBlock, subjectsButtonActive)}/>
         </button>
      );
   });

   return (
      <Fragment>
         {subjectsButtons}
      </Fragment>
   );
}

export default SubjectsTiles;