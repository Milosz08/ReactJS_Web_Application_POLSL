import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { showProtectedField, visibleIcon } = require('./../HomePanel.module.scss');

interface PropsProvider {
   handleVisible: () => void;
   ifVisible: boolean;
}

/**
 * Komponent generujący przycisk widoczność wrażliwych danych w polach wprowadzania.
 *
 * @param handleVisible { () => boolean } - funkcja zmieniająca stan (widoczny/niewidoczny).
 * @param ifVisible { boolean } - funkcja zmieniająca stan (widoczny/niewidoczny).
 */
const ShowHideAuthVisible: React.FC<PropsProvider> = ({ handleVisible, ifVisible }) => {
   return (
      <button
         type = 'button'
         onClick = {handleVisible}
         className = {showProtectedField}
      >
         <FontAwesomeIcon
            icon = {['fas', `${ifVisible ? 'eye-slash' : 'eye'}`]}
            className = {visibleIcon}
         />
      </button>
   );
}

export default ShowHideAuthVisible;