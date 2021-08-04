import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const { universalHeader, universalHeaderIcon, universalHeaderButton } = require('./UniversalHeader.module.scss');

interface UniversalHeaderProps {
   iconP : IconProp;
   ifCloseButtonVisible : boolean;
   setCloseButton : () => void;
}

/**
 * Komponent implementujący główny header w sekcjach. W zależności od podanych propsów, header generuje się z
 * przyciskiem zamknięcia (dla okien typu modal).
 *
 * @param iconP - tablica z dwoma parametrami typu string opisującymi ikonę
 * @param ifCloseButtonVisible - wartość boolean, wskazująca czy header powinien posiadać przycisk zamknięcia
 * @param setCloseButton - funkcja przekazywana do obsługi przycisku zamykania modala
 */
export default function UniversalHeader({ iconP, ifCloseButtonVisible, setCloseButton } : UniversalHeaderProps) {
   return (
      <header className = {universalHeader}>
         <h3>
            <FontAwesomeIcon
               icon = {iconP}
               className = {universalHeaderIcon}
            />
            Pliki Cookies
            <aside/>
            {ifCloseButtonVisible && <button
               className = {universalHeaderButton}
               onClick = {setCloseButton}
            >
               <span/>
            </button>}
         </h3>
      </header>
   );
}