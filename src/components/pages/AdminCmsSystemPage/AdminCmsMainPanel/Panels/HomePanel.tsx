import React, { useContext } from 'react';
import classnames from "classnames";

import { CookiesObjectsContext } from '../../../../../contextStore/CookiesObjectsProvider';
import { MainStoreContext } from '../../../../../contextStore/MainStoreContext';

import ChangeCredentials from './AdditionalComponents/ChangeCredentials';
import DataLastUpdate from '../../../../layouts/DataLastUpdate/DataLastUpdate';

const { panelContainer, panelActive } = require('./Panels.module.scss');
const { changeCredentials, disable, disabledInfo, mainInfoContainer, separator } = require('./HomePanel.module.scss');

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
   const { calendarRecords, sheduleSubjects, subjectsData } = dataFetchFromServer;

   const setDisabledChanges = parseInt(cookie.__credentialsLevel) !== 2 ? disable : '';
   const selectRangOfAdmin = parseInt(cookie.__credentialsLevel) === 2 ? 'główny administrator' : 'moderator';

   const toggleClass = activeNavElm === 0 ? panelActive : '';

   return (
      <div className = {classnames(panelContainer, toggleClass)}>
         <div className = {mainInfoContainer}>
            <h4>
               Jesteś zalogowany jako <strong>{selectRangOfAdmin} systemu </strong>
               ({cookie.__credentialsLevel} stopień autoryzacji).
            </h4>
            <span className = {separator}/>
            <p>
               Ostatnia modyfikacja planu zajęć:{' '}
               <DataLastUpdate
                  dataID = {process.env.REACT_APP_SUBJECTS_ID}
                  content = 'przedmiotów'
                  withoutText = {true}
               />.
               Ilość przedmiotów planu zajęć w bazie danych: <strong>{sheduleSubjects.length}</strong>.
            </p>
            <p>
               Ostatnia modyfikacja wpisów w kalendarzu:{' '}
               <DataLastUpdate
                  dataID = {process.env.REACT_APP_CALENDAR_ID}
                  content = 'przedmiotów'
                  withoutText = {true}
               />.
               Ilość wpisów kalendarza w bazie danych: <strong>{calendarRecords.length}</strong>.
            </p>
            <p>
               Ostatnia modyfikacja przedmiotów:{' '}
               <DataLastUpdate
                  dataID = {process.env.REACT_APP_SUBJECTS_ID}
                  content = 'przedmiotów'
                  withoutText = {true}
               />.
               Ilość przedmiotów w bazie danych: <strong>{subjectsData.length}</strong>.
            </p>
         </div>
         <div className = {`${changeCredentials} ${setDisabledChanges}`}>
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