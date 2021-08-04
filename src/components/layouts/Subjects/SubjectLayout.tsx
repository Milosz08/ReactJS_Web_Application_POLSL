import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { SubjectsProvider } from "./Subjects";

const {
   classesPlatformsInfo, navButtons, pzeLinks, separator, subDep, subEnd, subjectsDoIt, subjectsIcon,
   subNotEnd, subStatusInfo
} = require('./Subjects.module.scss');

interface PropsProvider {
   subjectID: number;
   filteredArray: Array<SubjectsProvider>;
}

/**
 * Komponent implementujący zawartość informacji na temat przedmiotu. Dane są pobierane z bazy danych.
 * Komponent renderowany jest tylko na stronie głównej. Przedmiot generowany jest na podstawie wartości
 * przekazywanych w propsach (index ID oraz tablicę z przedmiotami).
 *
 * @param subjectID { number } - index przedmiotu.
 * @param filteredArray { Array<SubjectsProvider> } - tablica z przechowanymi przedmiotami.
 */
const SubjectsLayout: React.FC<PropsProvider> = ({ subjectID, filteredArray }) => {

   const specificSubject = filteredArray[subjectID];
   const classesIfEnd = specificSubject.ifEnd ? 'odbywały' : 'odbywają';

   const multipleDepartment = specificSubject.departments.length !== 1
      ? specificSubject.departments.map((department: string) => <span key = {uuidv4()}>wydział {department}</span>)
      : `wydział ${specificSubject.departments[0]}`;

   const classesPlatforms = specificSubject.classesPlatforms.length !== 1
      ? specificSubject.classesPlatforms.map(platform => ((
         <span key = {platform.type}>
            {`${platform.type} ${classesIfEnd} się poprzed komunikator `}
            <strong>{`${platform.place}`}</strong>.
         </span>
      ))
      ) : (
         <span>
            {`Zajęcia ${classesIfEnd} się poprzed komunikator `}
            <strong>{`${specificSubject.classesPlatforms[0].place}`}</strong>.
         </span>
      );

   const pzeRefer = specificSubject.classesPlatforms.length !== 1
      ? specificSubject.classesPlatforms.map(platform => (
         <a
            key = {platform.link}
            href = {platform.link}
            className = {pzeLinks}
            target = '_blank'
            rel = 'noreferrer'
         >
            {`Link do PZE (${platform.type})`}
         </a>
      )) : (
         <a
            href = {specificSubject.classesPlatforms[0].link}
            className = {pzeLinks}
            target = '_blank'
            rel = 'noreferrer'
         >
            {`Link do PZE (Wszystkie zajęcia)`}
         </a>
      );

   const subStatus = specificSubject.ifEnd
      ? <span className = {subEnd}>zakończony</span>
      : <span className = {subNotEnd}>w trakcie</span>

   const withoutBlankSpaces = specificSubject.semesters.filter(semester => semester !== '');

   const semestersCount = withoutBlankSpaces.map((semester, i) => {
      const toggleOnEndOfString = i === withoutBlankSpaces.length - 1 ? '.' : ', ';
      return (
         <span key = {uuidv4()}>{`${semester}${toggleOnEndOfString}`}</span>
      )
   });

   return (
      <Fragment>
         <header>przedmiot</header>
         <h2>{filteredArray[subjectID].title}</h2>
         <div className = {subDep}>
            {multipleDepartment}
         </div>
         <aside className = {separator}>
            <span/>
            <FontAwesomeIcon
               icon={specificSubject.icon}
               className = {subjectsIcon}
            />
            <span/>
         </aside>
         <div className = {subStatusInfo}>
            <p>Status przedmiotu: {subStatus}</p>
            <p>Odbywany przez semestr: {semestersCount}</p>
         </div>
         <div className = {classesPlatformsInfo}>
            {classesPlatforms}
         </div>
         <div className = {navButtons}>
            {pzeRefer}
            <NavLink
               to = '/warunki-zaliczenia-przedmiotów'
               className = {subjectsDoIt}
            >
               Warunki zaliczenia przedmiotu
            </NavLink>
         </div>
      </Fragment>
   );
}

export default SubjectsLayout;