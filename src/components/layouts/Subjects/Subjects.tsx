import React, { Fragment, useContext, useState } from 'react';
import { MainStoreContext } from '../../../contextStore/MainStoreContext';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import SubjectInfo from './SubjectInfo';
import DataLastUpdate from '../DataLastUpdate/DataLastUpdate';
import UniversalHeader from '../UniversalHeader/UniversalHeader';
import SearchSubject from "./SearchSubject";

export interface SubjectsProvider {
   _id: string,
   semesters: Array<string>,
   departments: Array<string>,
   icon: IconProp,
   ifEnd: boolean;
   classesPlatforms: Array<{
      type: string,
      place: string,
      link: string
   }>,
   title: string,
   __v: number
}

/**
 * Komponent generujący sekcję przedmiotów na głównej stronie. W jej skład wchodzi: wyszukiwarka, lista
 * przedmiotów oraz okno ze szczegółowymi informacjami na temat przedmiotu.
 */
const Subjects = () => {

   const [ state, setState ] = useState<number>(0);
   const [ input, setInput ] = useState<string>('');
   const { dataFetchFromServer } = useContext<any>(MainStoreContext);

   // eslint-disable-next-line array-callback-return
   const filteredArray = dataFetchFromServer.subjectsData.filter((subject: SubjectsProvider) => {
      if(input === '') {
         return subject;
      } else if(subject.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
         return subject;
      }
   });

   return (
      <Fragment>
         <section>
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