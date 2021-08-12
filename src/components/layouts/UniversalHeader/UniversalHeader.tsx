import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const {
   universalHeader, universalHeaderIcon, universalHeaderButton, additionalTitleHeader
} = require('./UniversalHeader.module.scss');

interface PropsProvider {
   iconP : IconProp;
   content: string;
   ifCloseButtonVisible : boolean;
   addHeaderDayIndicator?: string;
   setCloseButton? : () => void;
}

/**
 * Komponent implementujący główny header w sekcjach. W zależności od podanych propsów, header generuje się z
 * przyciskiem zamknięcia (dla okien typu modal).
 *
 * @param iconP - tablica z dwoma parametrami typu string opisującymi ikonę.
 * @param content - zawartość tekstowa nagłówka.
 * @param ifCloseButtonVisible - wartość boolean, wskazująca czy header powinien posiadać przycisk zamknięcia.
 * @param setCloseButton - funkcja przekazywana do obsługi przycisku zamykania modala.
 * @param addHeaderDayIndicator - dla modalu dodającym/modyfikującym przedmioty w planie zajęć.
 */
const UniversalHeader: React.FC<PropsProvider> = ({
   iconP, content, ifCloseButtonVisible, setCloseButton, addHeaderDayIndicator
}) => {
   return (
      <header className = {universalHeader}>
         <h3>
            <FontAwesomeIcon
               icon = {iconP}
               className = {universalHeaderIcon}
            />
            {content}
            {addHeaderDayIndicator && <span className = {additionalTitleHeader}>{addHeaderDayIndicator}</span>}
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

export default UniversalHeader;