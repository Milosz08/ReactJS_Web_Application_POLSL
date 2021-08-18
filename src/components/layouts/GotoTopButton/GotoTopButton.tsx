/**
 * @file GotoTopButton.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/18/2021
 */

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

const { gotoTopWrapper, showGotoButton } = require('./GotoTopButton.module.scss');

/**
 * @details Component that adds a button (in the fixed position) that allows you to go to the top of the page after
 *          clicking. The button is visible only when the scroll position (from the top of the page) exceeds the
 *          value of 200 units (px).
 */
const GotoTopButton = () => {

   const [ offset, setOffset ] = useState<number>(window.pageYOffset);
   const [ showGoto, setShowGoto ] = useState<boolean>(false);

   useEffect(() => {
      const handleOnScroll = () => {
         if(offset > 200) {
            setShowGoto(true);
         } else {
            setShowGoto(false);
         }
         setOffset(window.pageYOffset);
      }
      if(offset === 0) {
         setShowGoto(false);
      }
      window.addEventListener('scroll', handleOnScroll);
      return () => window.removeEventListener('scroll', handleOnScroll);
   }, [offset]);


   const handleClickGotoTop = () => document.body.scrollIntoView({ behavior: 'smooth' });
   const toggleClass = showGoto ? showGotoButton : '';

   return (
      <button
         className = {classnames(gotoTopWrapper, toggleClass)}
         onClick = {handleClickGotoTop}
      />
   );
}

export default GotoTopButton;