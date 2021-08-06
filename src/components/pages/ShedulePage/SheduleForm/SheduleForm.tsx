import React, { useContext, useEffect } from 'react';

import { SheduleContext } from '../../../../contextStore/SheduleProvider';
import { CookiesObjectsContext } from '../../../../contextStore/CookiesObjectsProvider';

import SheduleNormalGroupInputs from './SheduleNormalGroupInputs';
import SheduleEngInputs from './SheduleEngInputs';

import COOKIES_OBJECT from '../../../../constants/allCookies';
import GROUPS_STATIC from '../../../../constants/allGroups';
import cookieExpires from '../../../../constants/cookieExpires';
import UniversalHeader from "../../../layouts/UniversalHeader/UniversalHeader";

const { encrypt, decrypt } = require('react-crypt-gsm');

const { sheduleBlocks } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
   sheduleForm, backgroundImage, formContentWrapper, sheduleSubmit, saveSheduleChoices, saveChoice, resetChoice,
   gotoShedule
} = require('./SheduleForm.module.scss');

interface PropsProvider {
   executeScroll: () => void;
}

/**
 * Komponent generujący pole wyboru przez użytkownika (wybór grupy normalnej, wybór grupy z języka angielskiego) oraz
 * umożliwia zapisanie tego wyboru w dwóch plikach Cookie. Komponent renderuje dodatkowo dwa komponenty, odpowiednio
 * wybór grupy normalnej i wybór grupy z angielskiego.
 *
 * @param executeScroll { () => void } - funkcja przekazywana w propsach, przy każdym zapisaniu stanu w pliku Cookie
 *                                       przenosi na szczyt strony (pozycja 0,0) - reset animacji.
 */
const SheduleForm: React.FC<PropsProvider> = ({ executeScroll }) => {

   const { groupSelection, engGroupSelection } = COOKIES_OBJECT;
   const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

   const { groupSelected, setGroupSelected, engSelected, setEngSelected } = useContext<any>(SheduleContext);
   const { cookie, setCookie, removeCookie } = useContext<any>(CookiesObjectsContext);

   const createRememberCookie = (dataEncrypt: string, cookieName: string): void => {
      const encryptData = encrypt(dataEncrypt);
      const expCookie = cookieExpires(365);
      setCookie(cookieName, encryptData, { path: '/', expires: expCookie, sameSite: 'strict' });
   }

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      createRememberCookie(groupSelected, groupSelection);
      createRememberCookie(engSelected, engGroupSelection);
      window.scrollTo(0, 0);
   }

   const cookieDecryptData = ({ content, tag }: any) => decrypt({ content, tag: new Uint8Array(tag.data) });

   useEffect(() => {
      const setDecryptedCookieValue = (): void => {
         if(cookie.__groupSelection !== undefined || cookie.__engGroupSelection !== undefined) {
            const decryptingCookieGroups = cookieDecryptData(cookie.__groupSelection);
            setGroupSelected(decryptingCookieGroups);

            const decryptingCookieEng = cookieDecryptData(cookie.__engGroupSelection);
            setEngSelected(decryptingCookieEng);
         }
      }
      setDecryptedCookieValue();
   }, [setGroupSelected, setEngSelected, cookie]);

   const handleResetValues = () => {
      setGroupSelected(NORMAL_GROUPS[0].text);
      setEngSelected(ENG_GROUPS[0]);
      removeCookie(groupSelection);
      removeCookie(engGroupSelection);
   }

   return (
      <section className = {sheduleBlocks}>
         <UniversalHeader
            iconP = {['fas', 'clipboard-list']}
            content = 'Panel Zarządzania'
            ifCloseButtonVisible = {false}
         />
         <div className = {formContentWrapper}>
            <img
               src = {process.env.PUBLIC_URL + '/images/sheduleBgc.png'}
               alt = 'background additional'
               className = {backgroundImage}
            />
            <form className = {sheduleForm} onSubmit = {handleFormSubmit}>
               <SheduleNormalGroupInputs/>
               <SheduleEngInputs/>
               <div className = {sheduleSubmit}>
                  <button className = {saveChoice}>
                     Zapisz mój wybór
                  </button>
                  <button
                     className = {resetChoice}
                     disabled = {groupSelected === NORMAL_GROUPS[0].text && engSelected === ENG_GROUPS[0]}
                     onClick = {handleResetValues}
                     type = 'button'
                  >
                     Przywróć domyślnie
                  </button>
                  <button
                     className = {gotoShedule}
                     onClick = {executeScroll}
                     type = 'button'
                  >
                     Przejdź do Planu
                  </button>
               </div>
            </form>
         </div>
         <div className = {saveSheduleChoices}>
            Po wybraniu właściwych opcji, poniższy plan wygeneruje się automatycznie. Jeśli natomiast chcesz
            zapisać swój wybór nawet po zamknięciu przeglądarki, kliknij w niebieski przycisk po prawej stronie.
            Aby zapisywanie wyboru zadziałało, twoja przeglądarka musi mieć włączoną obsługę plików Cookies.
         </div>
      </section>
   );
}

export default SheduleForm;