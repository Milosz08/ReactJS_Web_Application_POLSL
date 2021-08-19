/**
 * @file Subjects.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
 */

import React, { Fragment, useContext, useState } from 'react';
import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import SubjectInfo from './SubjectInfo';
import DataLastUpdate from '../DataLastUpdate/DataLastUpdate';
import UniversalHeader from '../UniversalHeader/UniversalHeader';
import SearchSubject from './SearchSubject';

const { scheduleRender } = require('./../../layouts/Navigation/Navigation.module.scss');

/**
 * Interface defining the types of iterate one Subject object fetch from API values.
 */
export interface SubjectsProvider {
   _id: string,
   semesters: string[],
   departments: string[],
   icon: IconProp,
   ifEnd: boolean;
   classesPlatforms: {
      type: string,
      place: string,
      link: string
   }[],
   title: string,
   __v: number
}

/**
 * @details Component that generates an items section on the main page. It includes: a search engine, a list
 *          of items and a window with detailed information about the item.
 */
const Subjects = (): JSX.Element => {

   const [ state, setState ] = useState<number>(0);
   const [ input, setInput ] = useState<string>('');
   const { dataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   // eslint-disable-next-line array-callback-return
   const filteredArray = dataFetchFromServer!.subjectsData.filter((subject: SubjectsProvider) => {
      if(input === '') {
         return subject;
      } else if(subject.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
         return subject;
      }
   });

   return (
      <Fragment>
         <section className = {scheduleRender}>
            <UniversalHeader
               iconP = {['fas', 'chalkboard']}
               content = 'Przedmioty'
               ifCloseButtonVisible = {false}
            />
            <SearchSubject
               state = {state}
               setState = {setState}
               filteredArray = {filteredArray}
               input = {input}
               setInput = {setInput}
            />
            <DataLastUpdate
               dataID = {process.env.REACT_APP_SUBJECTS_ID}
               content = 'przedmiotów'
               withoutText = {false}
            />
            <UniversalHeader
               iconP = {['fas', 'university']}
               content = 'Szczegółowe informacje'
               ifCloseButtonVisible = {false}
            />
         </section>
         <SubjectInfo
            subjectID = {state}
            filteredArray = {filteredArray}
            state = {state}
            setState = {setState}
         />
      </Fragment>
   );
}

export default Subjects;