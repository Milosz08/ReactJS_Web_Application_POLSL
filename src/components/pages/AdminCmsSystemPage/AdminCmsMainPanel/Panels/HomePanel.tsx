import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import { CookiesObjectsContext } from '../../../../../contextStore/CookiesObjectsProvider';
import { MainStoreContext } from '../../../../../contextStore/MainStoreContext';

import ChangeCredentials from './AdditionalComponents/ChangeCredentials';
import GenerateModifyElement from "./AdditionalComponents/GenerateModifyElement";

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { changeCredentials, disable, disabledInfo, mainInfoContainer } = require('./HomePanel.module.scss');

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący stronę startowa panelu administratora (główne informacje o zmianach w bazie danych - daty z
 * godzinami, możliwość zmiany autentykacji kont użytkownika/administratora - tylko dla administratorów z rangą 2 -
 * główny administrator systemu).
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const HomePanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const { cookie } = useContext<any>(CookiesObjectsContext);
   const { dataFetchFromServer } = useContext(MainStoreContext);
   const { calendarRecords, scheduleSubjects, subjectsData } = dataFetchFromServer;

   const setDisabledChanges = parseInt(cookie.__credentialsLevel) !== 2 ? disable : '';
   const toggleClass = activeNavElm === 0 ? panelActive : '';

   const DATE_ELEMENTS_CMS = [
      {
         id: process.env.REACT_APP_SCHEDULE_ID,
         dateText: 'planu zajęć',
         countText: 'przedmiotów planu zajęć',
         dataLength: scheduleSubjects.length
      },
      {
         id: process.env.REACT_APP_CALENDAR_ID,
         dateText: 'wpisów w kalendarzu',
         countText: 'wpisów kalendarza',
         dataLength: calendarRecords.length
      },
      {
         id: process.env.REACT_APP_SUBJECTS_ID,
         dateText: 'przedmiotów',
         countText: 'przedmiotów',
         dataLength: subjectsData.length
      }
   ];

   const generateDataElements = DATE_ELEMENTS_CMS.map((element: any) => (
      <GenerateModifyElement
         key = {uuidv4()}
         dataID = {element.id}
         dateText = {element.dateText}
         countText = {element.countText}
         arrayLength = {element.dataLength}
      />
   ));

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <div className = {mainInfoContainer}>
            {generateDataElements}
         </div>
         <div className = {classnames(changeCredentials, setDisabledChanges)}>
            <ChangeCredentials
               ifUser = {true}
               disableButton = {parseInt(cookie.__credentialsLevel) !== 2}
            />
            <ChangeCredentials
               ifUser = {false}
               disableButton = {parseInt(cookie.__credentialsLevel) !== 2}
            />
            {parseInt(cookie.__credentialsLevel) !== 2 && <p className = {disabledInfo}>
               Nie masz wystarczających uprawnień, aby wprowadzać zmian w tej sekcji. Aby wprowadzać zmiany w
               tej sekcji musisz być zalogowany na konto głównego administratora systemu.
            </p>}
         </div>
      </div>
   );
}

export default HomePanel;