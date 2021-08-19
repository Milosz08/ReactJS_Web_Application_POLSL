/**
 * @file ShowHideAuthVisible.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { showProtectedField, visibleIcon } = require('./../HomePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   handleVisible: () => void;
   ifVisible: boolean;
}

/**
 * @details Component that generates the button visibility of sensitive data in input fields.
 *
 * @param handleVisible { () => boolean } - state changing function (visible/invisible).
 * @param ifVisible { boolean } - actual state (visible/invisible).
 */
const ShowHideAuthVisible: React.FC<PropsProvider> = ({ handleVisible, ifVisible }): JSX.Element => {
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