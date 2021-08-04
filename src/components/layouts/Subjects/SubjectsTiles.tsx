import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubjectsProvider } from './Subjects';
import classnames from "classnames";

const {
   activeBtn, subjectTile, subjectsIcon, subjectIconWrapper, subjectTitle, subjectInfoBlock
} = require('./Subjects.module.scss');

interface PropsProvider {
   filteredArray: Array<SubjectsProvider>;
   state: number;
   setState: Dispatch<SetStateAction<number>>;
}

/**
 * Komponent generujący listę przedmiotów w postaci przycisków. W propsach przekazywana jest tablica przedmiotów
 * do wygenerowania, aktulanie wyświetlany przedmiot i funkcja umożliwiająca zmianę aktualnie wyświetlanego przedmiotu.
 *
 * @param filteredArray { Array<SubjectsProvider> } - tablica przechowująca wszystkie przedmioty
 * @param state { number } - indeks aktualnie wyświetlanego przedmiotu
 * @param setState { Dispatch<SetStateAction<number>> } - funkcja umożliwiająca zmianę przedmiotu
 */
const SubjectsTiles: React.FC<PropsProvider> = ({ filteredArray, state, setState }) => {

   const handleClick = (id: number) => setState(id);

   const subjectsButtons = filteredArray.map((subject: SubjectsProvider, index: number) => {
      const subjectsButtonActive = index === state ? activeBtn : '';
      return (
         <button
            key = {subject.title}
            onClick = {() => handleClick(index)}
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