/**
 * @file Navigation.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^1.1.6"
 *                ReactCSSmodules: "^0.1.15"
 *
 * @date final version: 08/24/2021
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const {
   universalHeader, universalHeaderIcon, universalHeaderButton, additionalTitleHeader
} = require('./UniversalHeader.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   iconP: IconProp;
   content: string;
   ifCloseButtonVisible: boolean;
   addHeaderDayIndicator?: string;
   setCloseButton?: () => void;
}

/**
 * @details Component that implements the main header in sections. Depending on the given props, the header
 *          is generated with a close button (for modal windows).
 *
 * @param iconP { IconProp } - an array with two string parameters describing the icon.
 * @param content { string } - the text content of the header.
 * @param ifCloseButtonVisible { boolean } - a boolean value, indicating whether the header should have a close button.
 * @param setCloseButton { () => void? } - function transferred to the operation of the modal closing button.
 * @param addHeaderDayIndicator { string? } - for the modal adding / modifying subjects in the timetable.
 */
const UniversalHeader: React.FC<PropsProvider> = ({
   iconP, content, ifCloseButtonVisible, setCloseButton, addHeaderDayIndicator
}): JSX.Element => {
   return (
      <header className = {universalHeader}>
         <h3>
            <FontAwesomeIcon
               icon = {iconP}
               className = {universalHeaderIcon}
            />
            <span>
               {content}
               {addHeaderDayIndicator && <span className = {additionalTitleHeader}>{addHeaderDayIndicator}</span>}
            </span>
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